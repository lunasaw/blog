---
title: SpringBoot + LogBack 配置
date: 2020-05-31
banner_img: /img/spring.jpg
index_img: /img/spring.png
isShowComments: true
tags: 
 - logBack
categories:
 - java
 - spring
---

###   SpringBoot + LogBack 配置

1. 首先可使用Spring 默认依赖,其他maven项目可引入

```xml
<!-- https://mvnrepository.com/artifact/ch.qos.logback/logback-classic -->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.3.0-alpha5</version>
    <scope>test</scope>
</dependency>

```

2. 使用

```java
@SpringBootApplication
public class SpringBootDemoLogbackApplication {

    private static final Logger log = LoggerFactory.getLogger(SpringBootDemoLogbackApplication.class);

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(SpringBootDemoLogbackApplication.class, args);
		int length = context.getBeanDefinitionNames().length;
		log.trace("Spring boot启动初始化了 {} 个 Bean", length);
		log.debug("Spring boot启动初始化了 {} 个 Bean", length);
		log.info("Spring boot启动初始化了 {} 个 Bean", length);
		log.warn("Spring boot启动初始化了 {} 个 Bean", length);
		log.error("Spring boot启动初始化了 {} 个 Bean", length);
		try {
			int i = 0;
			int j = 1 / i;
		} catch (Exception e) {
			log.error("【SpringBootDemoLogbackApplication】启动异常：", e);
		}
	}
}
```

3. 也可使用lombok 配合IDEA插件 使用@Sel4j 注解 无需LoggerFactory创建log

### 配置

- [参照这个文件介绍]((https://juejin.im/post/5b51f85c5188251af91a7525#heading-6))

- 这里贴出自定义完整配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
<!--  "${FILE_LOG_PATTERN:-%d{${LOG_DATEFORMAT_PATTERN:-yyyy-MM-dd HH:mm:ss.SSS}} ${LOG_LEVEL_PATTERN:-%5p} ${PID:- } - - - [%t]  %-40.40logger{39}  %file:%line: %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}"-->
  <property name="FILE_ERROR_PATTERN_LUNA"
            value="${FILE_ERROR_PATTERN_LUNA:-%d{${FILE_ERROR_PATTERN_LUNA:-yyyy-MM-dd HH:mm:ss.SSS}} ${LOG_LEVEL_PATTERN:-%5p} ${PID:- } --- [%t] %file:%line: -  %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}"/>
  <include resource="org/springframework/boot/logging/logback/defaults.xml"/>

  <conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter" />
  <conversionRule conversionWord="wex" converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter" />
  <conversionRule conversionWord="wEx"
                  converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter" />
  <!-- 彩色日志格式 -->
  <property name="CONSOLE_LOG_PATTERN_LUNA"
            value="${CONSOLE_LOG_PATTERN_LUNA:-%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(${LOG_LEVEL_PATTERN:-%5p}) %clr(${PID:- }){magenta} %clr(---){faint} %clr([%t]){faint} %clr(%40.40file:%line:){cyan} %clr( -){faint} %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}">

  </property>
	<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
		<filter class="ch.qos.logback.classic.filter.LevelFilter">
			<level>INFO</level>
		</filter>
		<encoder>
			<pattern>${CONSOLE_LOG_PATTERN_LUNA}</pattern>
			<charset>UTF-8</charset>
		</encoder>
	</appender>

	<appender name="FILE_INFO" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<!--如果只是想要 Info 级别的日志，只是过滤 info 还是会输出 Error 日志，因为 Error 的级别高， 所以我们使用下面的策略，可以避免输出 Error 的日志-->
		<filter class="ch.qos.logback.classic.filter.LevelFilter">
			<!--过滤 Error-->
			<level>ERROR</level>
			<!--匹配到就禁止-->
			<onMatch>DENY</onMatch>
			<!--没有匹配到就允许-->
			<onMismatch>ACCEPT</onMismatch>
		</filter>
		<!--日志名称，如果没有File 属性，那么只会使用FileNamePattern的文件路径规则如果同时有<File>和<FileNamePattern>，那么当天日志是<File>，明天会自动把今天的日志改名为今天的日期。即，<File> 的日志都是当天的。-->
		<!--<File>logs/info.spring-boot-demo-logback.log</File>-->
		<!--滚动策略，按照时间滚动 TimeBasedRollingPolicy-->
		<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
			<!--文件路径,定义了日志的切分方式——把每一天的日志归档到一个文件中,以防止日志填满整个磁盘空间-->
			<FileNamePattern>logs/spring-boot-demo-logback/info.created_on_%d{yyyy-MM-dd}.part_%i.log</FileNamePattern>
			<!--只保留最近90天的日志-->
			<maxHistory>90</maxHistory>
			<!--用来指定日志文件的上限大小，那么到了这个值，就会删除旧的日志-->
			<!--<totalSizeCap>1GB</totalSizeCap>-->
			<timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
				<!-- maxFileSize:这是活动文件的大小，默认值是10MB,本篇设置为1KB，只是为了演示 -->
				<maxFileSize>2MB</maxFileSize>
			</timeBasedFileNamingAndTriggeringPolicy>
		</rollingPolicy>
		<!--<triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">-->
		<!--<maxFileSize>1KB</maxFileSize>-->
		<!--</triggeringPolicy>-->
		<encoder>
			<pattern>${FILE_ERROR_PATTERN_LUNA}</pattern>
			<charset>UTF-8</charset> <!-- 此处设置字符集 -->
		</encoder>
	</appender>

	<appender name="FILE_ERROR" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<!--如果只是想要 Error 级别的日志，那么需要过滤一下，默认是 info 级别的，ThresholdFilter-->
		<filter class="ch.qos.logback.classic.filter.ThresholdFilter">
			<level>Error</level>
		</filter>
		<!--日志名称，如果没有File 属性，那么只会使用FileNamePattern的文件路径规则如果同时有<File>和<FileNamePattern>，那么当天日志是<File>，明天会自动把今天的日志改名为今天的日期。即，<File> 的日志都是当天的。-->
		<!--<File>logs/error.spring-boot-demo-logback.log</File>-->
		<!--滚动策略，按照时间滚动 TimeBasedRollingPolicy-->
		<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
			<!--文件路径,定义了日志的切分方式——把每一天的日志归档到一个文件中,以防止日志填满整个磁盘空间-->
			<FileNamePattern>logs/spring-boot-demo-logback/error.created_on_%d{yyyy-MM-dd}.part_%i.log</FileNamePattern>
			<!--只保留最近90天的日志-->
			<maxHistory>90</maxHistory>
			<timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
				<!-- maxFileSize:这是活动文件的大小，默认值是10MB,本篇设置为1KB，只是为了演示 -->
				<maxFileSize>2MB</maxFileSize>
			</timeBasedFileNamingAndTriggeringPolicy>
		</rollingPolicy>
		<encoder>
			<pattern>${FILE_ERROR_PATTERN_LUNA}</pattern>
			<charset>UTF-8</charset> <!-- 此处设置字符集 -->
		</encoder>
	</appender>

	<root level="info">
		<appender-ref ref="CONSOLE"/>
		<appender-ref ref="FILE_INFO"/>
		<appender-ref ref="FILE_ERROR"/>
	</root>
</configuration>

```

### 注意

logback和logback-spring.xml都可以用来配置logback，但是2者的加载顺序是不一样的。

logback.xml--->application.properties--->logback-spring.xml.

logback.xml加载早于application.properties，所以如果你在logback.xml使用了变量时，而恰好这个变量是写在application.properties时，那么就会获取不到，只要改成logback-spring.xml就可以解决。
------------------------------------------------
