---
title: springhttps
date: 2020-05-30
banner_img: /img/spring.jpg
tags: 
 - https
categories:
 - spring
---

###  springHttps 的转发,自动将http浏览器默认80端口转发至https 443或自定义端口

#### 1. 获取证书

- 首先在需要生成证书页面进入控制台命令,输入

- #### keytool命令，keytool -genkey -alias ccc -keyalg RSA -validity 36500 -keystore server.keystore

  ![](/img/keystore1.jpg)

- 然后输入密钥 ps: 一定要记住

  ![](/img/keystore2.jpg)

- 随意输入相应信息,最后会在相应目录生成 server.keystore 文件

  ![](/img/keystore3.jpg)

#### 2. spring配置

- 新建spring配置文件注解@Configuration

```java
/**
     * 配置 http(80) -> 强制跳转到 https(443)
     */
    @Bean
    public Connector connector() {
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setScheme("http");
        connector.setPort(80);
        connector.setSecure(false);
        connector.setRedirectPort(443);
        return connector;
    }

    @Bean
    public TomcatServletWebServerFactory tomcatServletWebServerFactory(Connector connector) {
        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
            @Override
            protected void postProcessContext(Context context) {
                SecurityConstraint securityConstraint = new SecurityConstraint();
                securityConstraint.setUserConstraint("CONFIDENTIAL");
                SecurityCollection collection = new SecurityCollection();
                collection.addPattern("/*");
                securityConstraint.addCollection(collection);
                context.addConstraint(securityConstraint);
            }
        };
        tomcat.addAdditionalTomcatConnectors(connector);
        return tomcat;
    }
```

- 将server.keystore放至resource目录下
- 编写配置文件

```yml
server:
  ssl:
    # 证书路径
    key-store: classpath:server.keystore
    key-alias: tomcat
    enabled: true
    key-store-type: JKS
    #与申请时输入一致
    key-store-password: 123456
    # 浏览器默认端口 和 80 类似
  port: 443

```

### 启动项目,访问80就会自动跳转433端口了 ,若提示443端口被占用可修改相应端口号 