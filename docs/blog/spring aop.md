---
title: Spring Aop切面编程
date: 2020-06-01
tags: 
 - aop
banner_img: /img/spring.jpg
index_img: /img/spring.png
categories:
 - java
 - spring
---

### spring的aop与springboot整合   [动态代理](https://juejin.im/post/5ad3e6b36fb9a028ba1fee6a)

### 引入依赖

```xml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-aop</artifactId>
		</dependency>
```

### 设置切点

- 在类上注解@Aspect

```java
/**
	 * 切入点
	 */
	@Pointcut("execution(public * com.xkcoding.log.aop.controller.*Controller.*(..))")
	public void log() {

	}
```

### 通知方法

1. 前置通知

```java
/**
	 * 前置操作
	 *
	 * @param point 切入点
	 */
	@Before("log()")
	public void beforeLog(JoinPoint point) {
        /**
         *  String toString();         //连接点所在位置的相关信息
         *    String toShortString();     //连接点所在位置的简短相关信息
         *    String toLongString();     //连接点所在位置的全部相关信息
         *    Object getThis();         //返回AOP代理对象，也就是com.sun.proxy.$Proxy18
         *    Object getTarget();       //返回目标对象，一般我们都需要它或者（也就是定义方法的接口或类，为什么会是接口呢？这主要是在目标对象本身是动态代理的情况下，例如Mapper。所以返回的是定义方法的对象如aoptest.daoimpl.GoodDaoImpl或com.b.base.BaseMapper<T, E, PK>）
         *    Object[] getArgs();       //返回被通知方法参数列表
         *    Signature getSignature();  //返回当前连接点签名  其getName()方法返回方法的FQN，如void aoptest.dao.GoodDao.delete()或com.b.base.BaseMapper.insert(T)(需要注意的是，很多时候我们定义了子类继承父类的时候，我们希望拿到基于子类的FQN，这直接可拿不到，要依赖于AopUtils.getTargetClass(point.getTarget())获取原始代理对象，下面会详细讲解)
         *    SourceLocation getSourceLocation();//返回连接点方法所在类文件中的位置
         *    String getKind();        //连接点类型
         *    StaticPart getStaticPart(); //返回连接点静态部分
         */
        JoinPoint.StaticPart staticPart = point.getStaticPart();
        /**
         *  Signature getSignature();    //返回当前连接点签名
         *    String getKind();          //连接点类型
         *    int getId();               //唯一标识
         *    String toString();         //连接点所在位置的相关信息
         *    String toShortString();     //连接点所在位置的简短相关信息
         *    String toLongString();     //连接点所在位置的全部相关信息
         */

        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

		HttpServletRequest request = Objects.requireNonNull(attributes).getRequest();

		log.info("【请求 URL】：{}", request.getRequestURL());
		log.info("【请求 IP】：{}", request.getRemoteAddr());
		log.info("【请求类名】：{}，【请求方法名】：{}", point.getSignature().getDeclaringTypeName(), point.getSignature().getName());

		Map<String, String[]> parameterMap = request.getParameterMap();
		log.info("【请求参数】：{}，", JSONUtil.toJsonStr(parameterMap));
		Long start = System.currentTimeMillis();
		request.setAttribute(START_TIME, start);
	}
```

2. 环绕通知

```java
/**
	 * 环绕操作
	 *
	 * @param point 切入点
	 * @return 原方法返回值
	 * @throws Throwable 异常信息
	 */
	@Around("log()")
	public Object aroundLog(ProceedingJoinPoint point) throws Throwable {
        String s = point.toLongString();
        log.info("【参数值】：{}", JSONUtil.toJsonStr(s));
		Object result = point.proceed();
		log.info("【返回值】：{}", JSONUtil.toJsonStr(result));
		return result;
	}
```

```tex
    /**
     * 环绕通知 ProceedingJoinPoint 执行proceed方法的作用是让目标方法执行，这也是环绕通知和前置、后置通知方法的一个最大区别。
     *  Proceedingjoinpoint 继承了 JoinPoint 。是在JoinPoint的基础上暴露出 proceed 这个方法。proceed很重要，这个是aop代理链执行的方法。
     */
```
3. 后置通知

```java
/**
	 * 后置操作
	 */
	@AfterReturning("log()")
	public void afterReturning() {
		ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = Objects.requireNonNull(attributes).getRequest();
        HttpServletResponse response = Objects.requireNonNull(attributes).getResponse();
        Long start = (Long) request.getAttribute(START_TIME);
		Long end = System.currentTimeMillis();
		log.info("【请求耗时】：{}毫秒", end - start);

		String header = request.getHeader("User-Agent");
		UserAgent userAgent = UserAgent.parseUserAgentString(header);
		log.info("【浏览器类型】：{}，【操作系统】：{}，【原始User-Agent】：{}", userAgent.getBrowser().toString(), userAgent.getOperatingSystem().toString(), header);
	}
```

### HttpServletRequest

```java
//返回客户端在此次请求中发送的所有Cookie对象。
    public abstract Cookie[] getCookies();

    //返回名字为name的请求报头的值。如果请求中没有包含指定名字的报头，这个方法返回null。
    public abstract String getHeader(String paramString);

    //返回名字为name的请求报头所有的值的枚举集合。
    public abstract Enumeration<String> getHeaders(String paramString);

    //返回此次请求中包含的所有报头名字的枚举集合。
    public abstract Enumeration<String> getHeaderNames();

    //返回此次请求所使用的HTTP方法的名字，例如，GET、POST或PUT。
    public abstract String getMethod();
    
    //返回与客户端发送的请求URL相联系的额外的路径信息。额外的路径信息是跟在Servlet的路径之后、查询字符串之前的路径，并以斜杠（/）字符开始。
    //例如，假定在web.xml文件中MyServlet类映射的URL是：/myservlet/*，用户请求的URL是：http://localhost:8080/ ch02/myservlet/test，
    //当我们在HttpServletRequest对象上调用getPathInfo()时，该方法将返回/test。如果没有额外的路径信息，getPathInfo()方法将返回null。
    public abstract String getPathInfo();

    //将额外的路径信息转换为真实的路径。例如，在上面的例子中假定ch02 Web应用程序位于D:\OpenSource\apache-tomcat-6.0.16\webapps\ch02目录，
    //当用户请求http://localhost: 8080/ch02/myservlet/test时，在请求对象上调用getPathTranslated()方法将返回
    //D:\OpenSource\apache-tomcat-6.0.16\webapps\ch02\test。
    public abstract String getPathTranslated();

    //返回请求URI中表示请求上下文的部分，上下文路径是请求URI的开始部分。上下文路径总是以斜杠（/）开头，但结束没有斜杠（/）。在默认（根）上下文中，这个方法返回空字符串""。
    //例如，请求URI为“/sample/test”，调用该方法返回路径为“/sample”。
    //示例： http://192.168.10.145:8888/ServletDemo/hello——>ServletDemo
    public abstract String getContextPath();

    //返回请求URL中在路径后的查询字符串。如果在URL中没有查询字符串，该方法返回null。例如，有如下的请求URL：
    //http://localhost:8080/ch02/logon.jsp?action=logon调用getQueryString()方法将返回action=logon。
    public abstract String getQueryString();

    //返回请求URL中从主机名到查询字符串之间的部分。例如：
    //POST:     /some/path.html HTTP/1.1   /some/path.html
    //GET:     http://foo.bar/a.html HTTP/1.0  /a.html
    //HEAD:     /xyz?a=b HTTP/1.1    /xyz
    //示例： http://192.168.10.145:8888/ServletDemo/hello——>ServletDemo/hello
    public abstract String getRequestURI();

    //重新构造客户端用于发起请求的URL。返回的URL包括了协议、服务器的名字、端口号和服务器的路径，但是不包括查询字符串参数。
    //要注意的是，如果请求使用RequestDispatcher.forward(ServletRequest, ServletResponse)方法被转发到另一个Servlet中，
    //那么你在这个Servlet中调用getRequestURL()，得到的将是获取RequestDispatcher对象时使用的URL，而不是原始的请求URL。
    //示例： http://192.168.10.145:8888/ServletDemo/hello——>http://192.168.10.145:8888/ServletDemo/hello
    public abstract StringBuffer getRequestURL();

    //返回请求URI中调用Servlet的部分。这部分的路径以斜杠（/）开始，包括了Servlet的名字或者路径，但是不包括额外的路径信息和查询字符串。
    //例如，假定在web.xml文件中MyServlet类映射的URL是：/myservlet/*，用户请求的URL是：http://localhost:8080/ ch02/myservlet/test，
    //当我们在HttpServletRequest对象上调用getServletPath ()时，该方法将返回/myservlet。如果用于处理请求的Servlet与URL样式“/*”相匹配，那么这个方法将返回空字符串（""）。
    //示例： http://192.168.10.145:8888/ServletDemo/hello——>hello
    public abstract String getServletPath();

    //返回和此次请求相关联的Session，如果没有给客户端分配Session，而create参数为true，
    //则创建一个新的Session。如果create参数为false，而此次请求没有一个有效的HttpSession，则返回null。
    public abstract HttpSession getSession(boolean create);

    //返回和此次请求相关联的Session，如果没有给客户端分配Session，则创建一个新的Session。
    public abstract HttpSession getSession();
```

### HttpServletResponse

```java
//增加一个Cookie到响应中。这个方法可以被多次调用，用于设置多个Cookie。
public abstract void addCookie(Cookie paramCookie);
//判断以name为名字的响应报头是否已经设置。
public abstract boolean containsHeader(String name);

//使用Session ID对指定的url进行编码。如果该url不需要编码，则返回未改变的url。
public abstract String encodeURL(String paramString);

//使用Session ID对用于重定向的url进行编码，以便用于sendRedirect()方法中。如果该url不需要编码，则返回未改变的url。
public abstract String encodeRedirectURL(String paramString);

//使用指定的状态代码发送一个错误响应到客户端。服务器默认会创建一个包含了指定消息的服务器端错误页面作为响应，
//设置内容类型为“text/html”。如果Web应用程序已经声明了对应于指定状态代码的错误页面，则服务器会将这个页面发送给客户端，而不理会参数msg指定的错误消息。
//如果响应已经被提交，这个方法将抛出IllegalStateException异常。
public abstract void sendError(int paramInt, String msg) throws IOException;

//使用参数sc表示的状态代码发送一个错误响应到客户端，同时清除缓存。如果响应已经被提交，这个方法将抛出IllegalStateException异常。
public abstract void sendError(int sc) throws IOException;

//发送一个临时的重定向响应到客户端，让客户端访问新的URL。如果指定的位置是相对URL，Servlet容器在发送响应到客户端之前，必须将相对URL转换为绝对URL。
//如果响应已经被提交，这个方法将抛出IllegalStateException异常。
public abstract void sendRedirect(String paramString) throws IOException;

//用给出的name和value，设置一个响应报头。如果这个报头已经被设置，新的值将覆盖先前的值。
public abstract void setHeader(String paramString1, String paramString2);

//用给出的name和value，增加一个响应报头到响应中。
public abstract void addHeader(String name, String value);

//为响应设置状态代码。
public abstract void setStatus(int paramInt);
```