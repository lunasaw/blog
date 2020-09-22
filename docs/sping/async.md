---
title: Springboot的异步方法async调用与线程池配置
date: 2020-06-03
banner_img: /img/async.jpg
tags: 
 - async
categories:
 - spring
---

## Springboot的异步方法调用与线程池配置

### 简单使用

1. springboot 自带了scheduling 包里已经设置了异步方法,我们只需要在方法或者类上加入@Async 注解即可

```java
package com.xkcoding.async.task;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


/**
 * 将一个类声明为异步类，那么这个类对外暴露的方法全部成为异步方法。
 * 与异步方法的区别是这里的注解是加到类上，异步方法的注解是加到方法上。仅此而已
 * @DESC 
 * @author guchuang
 *
 */
@Async
@Service
@Slf4j
public class AsyncClass {
    public AsyncClass() {
        log.info("-------------------------init AsyncClass--------------------");
    }
    volatile int index = 0;
    public void foo() {
        log.info("asyncclass foo, index:" + index);
    }
    public void foo(int i) {
        this.index = i;
        log.info("asyncclass foo, index:" + i);
    }
    public void bar(int i) {
        this.index = i;
        log.info("asyncclass bar, index:" + i);
    }
}

```

2. yml配置

```yml
spring:
  task:
    execution:
      pool:
        # 最大线程数
        max-size: 16
        # 核心线程数
        core-size: 16
        # 存活时间
        keep-alive: 10s
        # 队列大小
        queue-capacity: 100
        # 是否允许核心线程超时
        allow-core-thread-timeout: true
      # 线程名称前缀
      thread-name-prefix: async-task-
```

3. 然后直接调用即可产生异步效果

```java
 @Test
    public void test() throws InterruptedException {
        asyncClass.foo();
        asyncClass.foo(10);
        Thread.sleep(100);
        asyncClass.foo();
    }
```

### ThreadFactory自定义配置

1. 首先需创建一个类继承ThreadFactory,书写构造器
2. 覆写他newThread 方法

```java
public class MyThreadFactory implements ThreadFactory {

    private static final AtomicInteger poolNumber   = new AtomicInteger(1);
    private final ThreadGroup          group;
    private final AtomicInteger        threadNumber = new AtomicInteger(1);
    private final String               namePrefix;

    public MyThreadFactory(String name) {
        SecurityManager s = System.getSecurityManager();
        group = (s != null) ? s.getThreadGroup() : Thread.currentThread().getThreadGroup();
        namePrefix = name + "-pool-" +
            poolNumber.getAndIncrement() +
            "-thread-";
    }

    /**
     * 覆写了newThread方法
     * @param r
     * @return
     */
    @Override
    public Thread newThread(Runnable r) {
        Thread t = new Thread(group, r,
            namePrefix + threadNumber.getAndIncrement(),
            0);
        if (t.isDaemon()) {
            t.setDaemon(false);
        }
        if (t.getPriority() != Thread.NORM_PRIORITY) {
            t.setPriority(Thread.NORM_PRIORITY);
        }
        return t;
    }
}
```

### 线程池异步配置

1. 添加注解@EnableAsync和@Configuration
2. 实现AsyncConfigurer接口,如果不覆写AsyncConfigurer的话，这个方法暴露bean会被当做@Async的默认线程池。
3. ExecutorService配置

```java
private static ExecutorService threadPool               = new ThreadPoolExecutor(5, 5,
        60L, TimeUnit.MILLISECONDS,
        new LinkedBlockingQueue<>(3), new MyThreadFactory("common1"));
```

- 定义默认调用线程执行器和异常处理机制

```java
/**
     * 这个实例声明的TaskExecutor会成为@Async方法运行的默认线程执行器
     * 
     * @Bean 使这个实例完全被spring接管
     */
    @Bean
    @Override
    public TaskExecutor getAsyncExecutor() {
        return new ConcurrentTaskExecutor(Executors.newFixedThreadPool(5, new MyThreadFactory("async")));
    }

    /**
     * 定义@Async方法默认的异常处理机制（只对void型异步返回方法有效，Future返回值类型的异常会抛给调用者）
     */
    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (e, method, objects) -> log.error("Method:" + method + ", exception:" + e.getMessage());
    }
```

- 自定义线程执行器配置

```java
/**
     * 如果不覆写AsyncConfigurer的话，这个方法暴露bean会被当做@Async的默认线程池。
     * 注意必须是这个方法名（也就是bean name， 或者显示指定bean name @Qualifier("taskExecutor")），返回类型可以是Executor或者TaskExecutor
     * 如果没有配置的Executor，则默认使用SimpleAsyncTaskExecutor
     * 备注： 这种方式声明的bean，方法名就是bean name
     * 
     * @return
     */
    @Bean
    public Executor taskExecutor() {
        return new ConcurrentTaskExecutor(Executors.newFixedThreadPool(5, new MyThreadFactory("async0")));
    }

    /**
     * 定义其它的TaskExecutor，声明@Async方法的时候可以指定TaskExecutor，达到切换底层的目的
     * 
     * @return
     */
    @Bean
    public TaskExecutor async1() {
        // 线程数,线程名
        return new ConcurrentTaskExecutor(Executors.newFixedThreadPool(2, new MyThreadFactory("async1")));
    }

    /**
     * 没有设置拒绝策略
     * 
     * @return
     */
    @Bean
    @Qualifier("async2")
    public TaskExecutor myAsyncExecutor2() {
        return new ConcurrentTaskExecutor(threadPool);
    }
```

### 异常配置

- 线程满载后处理类

```java
package com.xkcoding.async.task;

import com.xkcoding.async.MyLog;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * 线程池满之后的处理策略类
 * @DESC 
 * @author guchuang
 *
 */
@Slf4j
public class RejectedPolicy implements RejectedExecutionHandler {
    public RejectedPolicy() { }

    /**
     * 向线程池中添加线程被拒绝时会调用这个方法。一般拒绝是因为线程池满了
     *
     * @param r 被拒绝的任务
     * @param e 拒绝这个任务的线程池
     */
    @Override
    public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
        log.info("one thread is rejected, i will deal it");
        if (!e.isShutdown()) {
            r.run();
        }
    }
}

```

### 测试

1. 获取返回值

```java
@Test
    public void testFuture() throws InterruptedException, ExecutionException {
        log.info("\n-----------------start-----------------------");
        Future<String> result1 = asyncMethod.futureTask1();
        CompletableFuture<String> result2 = asyncMethod.futureTask2();
        // 获取返回值
        log.info("result1:" + result1.get());
        log.info("result2:" + result2.get());
    }
```

2. 无返回值方法可直接抛出异常,有返回值方法方法需要通过get方法获取异常

```java
  @Test
    public void testE() {
        try {
            Future<String> result = asyncMethod.futureE();
            //这里调用get才会获得异常
            log.info(result.get());
        } catch(Exception e) {
            //e.printStackTrace();
            log.info("this is excepted Exception:" + e.getMessage());
        }
        // 直接抛出异常
        asyncMethod.fooE();
        log.info("end call e");
        //log.sleep(1000);
    }
```

3. 当超过线程词最大容量的时候，会抛出TaskRejectedException

```java
 @Test
    public void testRejectWithDeal() throws InterruptedException {
        log.info("\n-----------------start testRejectWithDeal-----------------------");
        log.info("start add task");
        try {
            for (int i = 0; i < 10; i++) {
                asyncMethod.asyncSleep3(i, 1);
            }
        } catch(RejectedExecutionException e) {
            log.info("excepted exception:" + e.getMessage());
        }
        log.info("finished add task");
        Thread.sleep(100 * 1000);
    }
```