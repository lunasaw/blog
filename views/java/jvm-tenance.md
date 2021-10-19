---
title: jvm_tuning
date: 2021-8-26 15:45:12
tags:banner_img: /img/java.jpg
index_img: /img/java.png
sidebar: 'auto'
isShowComments: true
tags: 
 - jvm
categories:
 - java

---

## 内存区域划分

限定商用虚拟机基本都采用分代收集算法进行垃圾回收。根据对象的生命周期的不同将内存划分为几块，然后根据各块的特点采用最适当的收集算法。大批对象死去、少量对象存活的，使用复制算法，复制成本低；对象存活率高、没有额外空间进行分配担保的，采用标记-清除算法或者标记-整理算法。

![img](https://images2017.cnblogs.com/blog/285952/201801/285952-20180131105449984-2130189134.png)

从上面的图可以看出， JVM区域总体分两类，heap区和非heap区。 

1.heap区又分为： 

- Eden Space（伊甸园）、 
- Survivor Space(幸存者区)、 
- Old Gen（老年代）。
2.非heap区又分： 

- Code Cache(代码缓存区)； 
- Perm Gen（永久代）； 
- Jvm Stack(java虚拟机栈)； 
- Local Method Statck(本地方法栈)；
关于java堆，新生代，老年代，Eden空间，From Survivor空间，To Survivor空间
java进程运行过程中创建的对象存放在堆中，堆被划分成两个不同的区域：新生代 ( Young )、老年代 ( Old )。新生代 ( Young ) 又被划分为三个区域：Eden、From Survivor、To Survivor。
堆的内存模型大致为：

默认的，新生代 ( Young ) 与老年代 ( Old ) 的比例的值为 1:2 ( 该值可以通过参数 –XX:NewRatio 来指定 )，即：新生代 ( Young ) = 1/3 的堆空间大小。
老年代 ( Old ) = 2/3 的堆空间大小。其中，新生代 ( Young ) 被细分为 Eden 和 两个 Survivor 区域，这两个 Survivor 区域分别被命名为 from 和 to，以示区分。
默认的，Edem : from : to = 8 : 1 : 1 ( 可以通过参数 –XX:SurvivorRatio 来设定 )，即： Eden = 8/10 的新生代空间大小，from = to = 1/10 的新生代空间大小。
JVM 每次只会使用 Eden 和其中的一块 Survivor 区域来为对象服务，所以无论什么时候，总是有一块 Survivor 区域是空闲着的。
因此，新生代实际可用的内存空间为 9/10 ( 即90% )的新生代空间。

新生代是 GC 收集垃圾的频繁区域。
当对象在 Eden ( 包括一个 Survivor 区域，这里假设是 from 区域 ) 出生后，在经过一次 Minor GC 后，如果对象还存活，并且能够被另外一块 Survivor 区域所容纳
( 上面已经假设为 from 区域，这里应为 to 区域，即 to 区域有足够的内存空间来存储 Eden 和 from 区域中存活的对象 )，则使用复制算法将这些仍然还存活的对象复制到另外一块 Survivor 区域 ( 即 to 区域 ) 中，然后清理所使用过的 Eden 以及 Survivor 区域 ( 即 from 区域 )，并且将这些对象的年龄设置为1，以后对象在 Survivor 区每熬过一次 Minor GC，就将对象的年龄 + 1，当对象的年龄达到某个值时 ( 默认是 15 岁，可以通过参数 -XX:MaxTenuringThreshold 来设定 )，这些对象就会成为老年代。
但这也不是一定的，对于一些较大的对象 ( 即需要分配一块较大的连续内存空间 ) 则是直接进入到老年代。

From Survivor区域与To Survivor区域是交替切换空间，在同一时间内两者中只有一个不为空
2.内存区域介绍

### 1.年轻代：

HotSpot JVM把年轻代分为了三部分：1个Eden区和2个Survivor区（分别叫from和to）。默认比例为8：1,为啥默认会是这个比例，接下来我们会聊到。一般情况下，新创建的对象都会被分配到Eden区(一些大对象特殊处理),这些对象经过第一次Minor GC后，如果仍然存活，将会被移到Survivor区。对象在Survivor区中每熬过一次Minor GC，年龄就会增加1岁，当它的年龄增加到一定程度时，就会被移动到年老代中。

因为年轻代中的对象基本都是朝生夕死的(80%以上)，所以在年轻代的垃圾回收算法使用的是复制算法，复制算法的基本思想就是将内存分为两块，每次只用其中一块，当这一块内存用完，就将还活着的对象复制到另外一块上面。复制算法不会产生内存碎片。

在GC开始的时候，对象只会存在于Eden区和名为“From”的Survivor区，Survivor区“To”是空的。紧接着进行GC，Eden区中所有存活的对象都会被复制到“To”，而在“From”区中，仍存活的对象会根据他们的年龄值来决定去向。年龄达到一定值(年龄阈值，可以通过-XX:MaxTenuringThreshold来设置)的对象会被移动到年老代中，没有达到阈值的对象会被复制到“To”区域。经过这次GC后，Eden区和From区已经被清空。这个时候，“From”和“To”会交换他们的角色，也就是新的“To”就是上次GC前的“From”，新的“From”就是上次GC前的“To”。不管怎样，都会保证名为To的Survivor区域是空的。Minor GC会一直重复这样的过程，直到“To”区被填满，“To”区被填满之后，会将所有对象移动到年老代中。

![img](https://images2017.cnblogs.com/blog/285952/201801/285952-20180131143358062-1502789309.png)

有关年轻代的JVM参数

1)-XX:NewSize和-XX:MaxNewSize

用于设置年轻代的大小，建议设为整个堆大小的1/3或者1/4,两个值设为一样大。

2)-XX:SurvivorRatio

用于设置Eden和其中一个Survivor的比值，这个值也比较重要。

3)-XX:+PrintTenuringDistribution

这个参数用于显示每次Minor GC时Survivor区中各个年龄段的对象的大小。

4).-XX:InitialTenuringThreshol和-XX:MaxTenuringThreshold

用于设置晋升到老年代的对象年龄的最小值和最大值，每个对象在坚持过一次Minor GC之后，年龄就加1。

 

 

### 2.old老年代

老年代，用于存放新生代中经过多次垃圾回收仍然存活的对象，也有可能是新生代分配不了内存的大对象会直接进入老年代。经过多次垃圾回收都没有被回收的对象，这些对象的年代已经足够old了，就会放入到老年代。

当老年代被放满的之后，虚拟机会进行垃圾回收，称之为Major GC。由于Major GC除并发GC外均需对整个堆进行扫描和回收，因此又称为Full GC。

heap区即堆内存，整个堆大小=年轻代大小 + 老年代大小。堆内存默认为物理内存的1/64(<1GB)；默认空余堆内存小于40%时，JVM就会增大堆直到-Xmx的最大限制，可以通过MinHeapFreeRatio参数进行调整；默认空余堆内存大于70%时，JVM会减少堆直到-Xms的最小限制，可以通过MaxHeapFreeRatio参数进行调整。

### 3.Code Cache代码缓存区

 

它主要用于存放JIT所编译的热点代码。CodeCache代码缓冲区的大小在client模式下默认最大是32m，在server模式下默认是48m，这个值也是可以设置的，它所对应的JVM参数为ReservedCodeCacheSize 和 InitialCodeCacheSize，可以通过如下的方式来为Java程序设置。

`-XX:ReservedCodeCacheSize=128m`

CodeCache缓存区是可能被充满的，当CodeCache满时，后台会收到CodeCache is full的警告信息，如下所示： 
“CompilerThread0” java.lang.OutOfMemoryError: requested 2854248 bytes for Chunk::new. Out of swap space?

 

### 4.Perm Gen(永久代) (JDK1.8之后被元空间替代)

Perm Gen全称是Permanent Generation space，称之为永久代，其实指的就是这个方法区。不过方法区和“PermGen space”又有着本质的区别。前者是 JVM 的规范，而后者则是 JVM 规范的一种实现，并且只有 HotSpot 才有 “PermGen space”，而对于其他类型的虚拟机，如 JRockit（Oracle）、J9（IBM） 并没有“PermGen space”。

由于方法区主要存储类的相关信息，Class在被Load进入这个区域后，如果应用程序LOAD很多Class的话，就很可能会出现PermGen space错误，比如对于动态生成类的情况比较容易出现永久代的内存溢出。它的默认大小为物理内存的1/64。

## JVM分析

#### jmap -heap 1234 查看进程号为1234的Java程序的整个jvm内存状态

#### jmap -histo 1234 查找进程号为1234的java程序的jvm堆中对象详细占用情况

#### jmap -dump:format=b,file=/my.dump 1234  导出1234进程的java程序的整个JVM信息

#### jhat -J-Xmx1024M /my.dump, 启动web服务查看jmap导出的java程序的jvm信息。 

#### jstack 1234 查看1234进程的所有堆栈信息。

#### 以上命令的功能都可以从jVisualVM程序获取，双击运行即可。

## jmap是java自带的工具 

查看整个JVM内存状态

jmap -heap [pid]

要注意的是在使用CMS GC 情况下，jmap -heap的执行有可能会导致JAVA 进程挂起

查看JVM堆中对象详细占用情况

jmap -histo [pid]

导出整个JVM 中内存信息

jmap -dump:format=b,file=文件名 [pid]

jhat是sun 1.6及以上版本中自带的一个用于分析JVM 堆DUMP 文件的工具，基于此工具可分析JVM HEAP 中对象的内存占用情况

jhat -J-Xmx1024M [file]  （此处的file指的是jmap -dump导出的内存数据文件）

执行后等待console 中输入start HTTP server on port 7000 即可使用浏览器访问 IP：7000

eclipse Memory Analyzer

Eclipse 提供的一个用于分析JVM 堆Dump文件的插件。借助这个插件可查看对象的内存占用状况，引用关系，分析内存泄露等。

[http://www.eclipse.org/mat/](https://link.jianshu.com?t=http://www.eclipse.org/mat/)

kill -3 [pid]

在Linux 上找到Java所在的进程号，然后执行以上命令，线程的相关信息就输出到console

## jstack

jstack 是sun JDK 自带的工具，通过该工具可以看到JVM 中线程的运行状况，包括锁等待，线程是否在运行

执行 jstack [pid] ,线程的所有堆栈信息

"http-8080-10" daemon prio=10 tid=x0a949bb60 nid=0x884 waiting for monitor entry [...]

"http-8080-10" 这个线程处于等待状态。 waiting for monitor entry 如果在连续几次输出线程堆栈信息都存在于同一个或多个线程上时，则说明系统中有锁竞争激烈，死锁，或锁饿死的想象。

“http-8080-11” daemon prio=10 tix=xxx nid=xxx in object.wait() [...]

java.lang.Thread.State:waiting (on object monitor)

该表示http-8080-11的线程处于对象的Wait 上，等待其他线程的唤醒，这也是线程池的常见用法。

“Low Memory Detector”daemon prio=10 tix=xx nid=xxx runnable [...] java.lang.Thread.State:runnable

表示“Low Memory Detector” 的线程处于Runable状态，等待获取ＣＰＵ的使用权.

参考：[http://zhumeng8337797.blog.163.com/blog/static/100768914201242410583187/](https://link.jianshu.com?t=http://zhumeng8337797.blog.163.com/blog/static/100768914201242410583187/)

## jvisualvm

**一.Java VisualVM 概述**

对于使用命令行远程监控jvm 太麻烦 。 在jdk1.6 中 Oracle 提供了一个新的可视化的。 JVM 监控工具 Java VisualVM 。jvisualvm.exe 在JDK 的 bin 目录下。

双击启动 Java VisualVM 后可以看到窗口左侧 “应用程序 ”栏中有“ 本地 ”、“远程 ” 、“快照 ”三个项目。

“本地 ”下显示的是在 localhost 运行的 Java 程序的资源占用情况，如果本地有 Java 程序在运行的话启动 Java VisualVM 即可看到相应的程序名，点击程序名打开相应的资源监控菜单，以图形的形式列出程序所占用的 CPU 、 Heap 、 PermGen 、类、线程的 统计信息。

“远程” 项下列出的远程主机上的 Java 程序的资源占用情况，但需要在远程主机上运行 jstatd 守护程序

VisualVM分为 3 类， 本地 它会自动侦测到，并显示出来

双击Local 下的任一节点，看到右边的变化 ，你可以监控 CPU ，内存，类，线程等运行状况，实时监控服务器性能。

右键 VisualVM我们可以看到 Thread Dump, Heap Dump

做 Thread Dump 很快，马上就可以看到结果

Heap Dump要稍花费一些时间（可以看到当前 heap 里对象的数量及占用的比例，做 OOM 很好用）

对其功能不再做描述，可以查阅网上相关质量，我们主要讲的是如何使用 VisualVM 远程监控。

