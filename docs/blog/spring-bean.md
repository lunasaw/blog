---
title: spring-bean
date: 2021-05-11 23:22:42
banner_img: /img/spring.jpg
index_img: /img/spring.png
tags: 
 - security
categories:
 - java
 - spring
---

# [Spring基于XML方式的使用]()



**目录**

- 一、IoC配置
  - [1、bean标签介绍]()
  - [2、bean的实例化]()
- 二、DI配置
  - [1、依赖注入的方式]()
  - [2、不同属性依赖注入]()

 

------

[回到顶部](https://www.cnblogs.com/liuyi6/p/10217096.html#_labelTop)

## 一、IoC配置

IoC的配置是通过Spring的xml文件的**bean标签**进行的。



### 1、bean标签介绍

bean标签一般是在xml文件进行配置的，xml文件一般样式如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
        
</beans>
```

可在其中进行bean标签的配置。

#### 1.1、bean标签的作用

bean标签用于配置被spring容器管理的bean的信息

**注意**：bean标签配置的bean的创建默认是调用无参数的构造方法，若没有无参构造方法则不能创建成功。

#### 1.2、bean标签属性

- id：给对象在**容器中**提供一个唯一标识。用于获取对象。
- class：指定类的全限定名。用于反射创建对象。默认情况下**调用无参构造函数**。
- scope：指定对象的作用范围。
  - singleton：**默认值**，单例的（在整个容器中只有一个对象）.
  - prototype：多例的
  - request：将Spring 创建的 Bean 对象存入到 request 域中.
  - session：将Spring 创建的 Bean 对象存入到 session 域中.
  - global session：WEB 项目中,应用在 Portlet 环境.如果没有 Portlet 环境那么globalSession 相当于 session。
- **init-method**：指定类中的初始化方法名称。
- **destroy-method**：指定类中销毁方法名称。比如DataSource的配置中一般需要指定destroy-method=“close”。
- **lazy-init**：ApplicationContext实现的默认行为就是在启动时将所有 singleton bean进行实例化。lazy-init可以延迟初始化，设置`lazy-init="true"`使得Ioc容器在第一次需要bean的时候进行实例化。

示例xml代码如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <bean id="wanger" class="com.luis.dto.Person"></bean>
    
    <bean id="zhangsan" class="com.luis.dto.Person" init-method="init" destroy-method="over"></bean>
    
    <bean id="lisi" class="com.luis.dto.Person" scope="prototype"></bean>
    
    <bean id="lazy" class="com.luis.dto.Person" lazy-init="true"/></beans>
    
    <bean name="address" class="com.luis.dto.Address"></bean>
</beans>
```

**注意：id和name的区别**

Bean标签提供了两种标识Bean的Attribute：id和name

- id用来标识bean，是唯一的，且只有一个，只允许以字母开头，其后只能为字母或数字或”-“。
- name定义的是bean的alias，可以有多个，并可能与其他的bean重名，name允许特殊字符。
- 当多个重名的name同时存在时，先产生的bean会被后产生的bean覆盖
- 当id和name的值相同，通过值获取bean得到的是name对应的bean。

示例代码如下：

```xml
 <bean id="person" class="com.luis.dto.Student"></bean>
 <bean name="person" class="com.luis.dto.Teacher"></bean>
<!-- factory.getBean(“person”)返回的是Teacher对象-->
```

若置bean的时候并没有声明ID属性，则采用全类限定名作为bean的id，此时称为**匿名bean**

```xml
<bean class="com.learnSpring.hellWorld"/>
<bean class="com.learnSpring.hellWorld"/>
<bean class="com.learnSpring.hellWorld"/>
```

如果存在多个class属性都是一样的匿名的Bean，则根据Spring读取配置文件的顺序生成id。

```xml
"com.learnSpring.hellWorld"
"com.learnSpring.hellWorld#0"
"com.learnSpring.hellWorld#1"
```

#### 1.3、bena标签作用范围

我们可在xml文件中通过bean标签的scope属性指定作用域，其取值区别如下表：

|     作用域     | 描述                                                         |
| :------------: | :----------------------------------------------------------- |
|   singleton    | 单例模式，singleton是默认的作用域，当定义Bean时没有指定scope配置项，Bean的作用域被默认为singleton。singleton属于单例模式，在整个系统上下文环境中，仅有一个Bean实例。 |
|   prototype    | 原型模式，当一个Bean的作用域被定义prototype时，程序每次从IOC容器获取的Bean都是一个新的实例。 |
|    request     | http请求，bean作用于HTTP request生命周期，每个request有通过bean创建的实例。 |
|    session     | 会话，bean作用于session生命周期。                            |
| global-session | 全局会话，bean作用于全局的session生命周期。                  |

参考了：https://www.cnblogs.com/best/p/5727935.html

这里主要对单例对象与多例对象进行说明：

- 单例对象：`scope="singleton"`
  - 一个应用只用一个实例对象
  - 生命周期与容器相关，当容器创建时对象产生，当对象销毁时对象销毁。
- 多例对象：`scope="prototype"`
  - 每次访问对象时，都会重新创建对象实例。
  - 生命周期与使用有关，当需要使用时创建对象，当对象长时间不使用，则被垃圾回收机制进行回收。



### 2、bean的实例化

bean有三种实例化方式：无参构造、静态工厂、实例工厂

#### 2.1、无参构造

默认情况下会根据无参构造方法进行对象的实例化。

若没有无参构造方法则会创建失败。

```xml
<bean id="wanger" class="com.luis.dto.Person"></bean>
```

#### 2.2、静态工厂

使用静态工厂创建实例，其中:

- id 属性：指定 bean 的 id，用于从容器中获取
- class 属性：指定静态工厂的全限定类名
- factory-method 属性：指定生产对象的静态方法

```xml
<bean id="person" class="com.luis.factory.StaticFactory" factory-method="createPerson"/>
```

#### 2.3、实例工厂

将工厂的创建交给Spring进行，使用工厂bean调用方法创建实例化对象。其中：

- factory-bean 属性：用于指定实例工厂 bean 的 id。
- factory-method 属性：用于指定实例工厂中创建对象的方法。

```xml
<bean id="instancFactory" class="com.luis.factory.PersonFactory"/>
<bean id="person" factory-bean="instancFactory" factory-method="createPerson"/>
```

[回到顶部](https://www.cnblogs.com/liuyi6/p/10217096.html#_labelTop)

## 二、DI配置

依赖注入(Dependency Injection)是 spring 框架核心 IoC 的具体实现。依赖指的是bean的属性，包括：简单类型（8种基本类型和String类型）的属性、POJO类型的属性、集合数组类型的属性。我们通过控制反转将实例化对象的交给IoC进行，但创建的对象没有依赖，因而需要Spring维护依赖关系，即依赖注入。



### 1、依赖注入的方式

#### 1.1、构造方法注入

使用类中的构造函数，给成员变量赋值，，通过在xml文件中的bean进行配置的方式给对象赋值。

构造方法注入涉及的标签：

- constructor-arg
- index:指定参数在构造函数参数列表的索引位置
- name:指定参数在构造函数中的名称
- value:它能赋的值是基本数据类型和 String 类型
- ref:它能赋的值是其他 bean 类型，且必须是在配置文件中配置过的 bean

Spring配置文件xml中的配置如下：

- 使用参数名称指定参数

```xml
<bean id="zhangsan" class="com.luis.dto.Person">
    <constructor-arg name = "name" value ="张三"></constructor-arg>
    <constructor-arg name = "age" value ="22"></constructor-arg>
</bean>
```

- 通过索引指定参数

```xml
<bean id="zhangsan" class="com.luis.dto.Person">
    <constructor-arg index = "0" value ="张三"></constructor-arg>
    <constructor-arg index = "1" value ="22"></constructor-arg>
</bean>
```

#### 1.2、set方法注入

**set方法注入**又分为**手动装配方式注入**和**自动装配方式注入**。

- 手动装配

通过bean标签的子标签property来完成，且需要在在类中指定setter方法。

- 自动装配(注解方式进行)，会在Spring的注解使用进行说明

  - @Autowired

    ：

    - 作用一：**查找实例**，从spring容器中根据Bean的类型（byType）获取实例。
    - 作用二：**赋值**，将找到的实例，装配给另一个实例的属性值。
    - **注意事项**：一个Java类型在同一个spring容器中，只能有一个实例

  - **@Resource**：

  - 作用一：**查找实例**，从spring容器中根据Bean的名称（byName）获取实例。

  - 作用二：**赋值**，将找到的实例，装配给另一个实例的属性值。

xml方式的示例代码如下：

```java
public class Address {

	private String country;
	private String city;

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	@Override
	public String toString() {
		return "Address [country=" + country + ", city=" + city + "]";
	}

}
```

Spring配置文件xml-ioc-01.xml中的配置如下：

```xml
<bean name="address" class="com.luis.dto.Address">
    <property  name = "country" value ="中国"></property>
    <property  name = "city" value ="西安"></property>
</bean>
```

可以简写为：

```xml
<bean id="address" class="com.luis.dto.Address" p:country="中国" p:city="西安"></bean>
```

#### 1.3、p空间名称注入

p名称注入是set方法的一种简写方式，首先需引入p命名空间：

```xml
 xmlns:p="http://www.springframework.org/schema/p"
```

p名称空间的语法：`p:属性名 = ""` 和 `p:属性名-ref = ""`

上面的set注入可以简写为：

```xml
<bean id="address" class="com.luis.dto.Address" p:country="中国" p:city="西安"></bean>
```

若对象中有引用对象，则：

```xml
<bean name="address" class="com.luis.dto.Address"></bean>
<bean id="person" class="com.luis.dto.Person" p:pname="田七" p:age="22" p:address-ref="address"/>
```



### 2、不同属性依赖注入

#### 2.1、简单类型

```xml
<!-- 构造方法注入 -->
<bean id="lisi" class="com.luis.dto.Person">
      <constructor-arg name = "name" value ="李四"></constructor-arg>
      <constructor-arg name = "age" value ="22"></constructor-arg>
</bean>

<!-- 构造方法注入 -->
<bean id="wangwu" class="com.luis.dto.Person">
    <constructor-arg index = "0" value ="王五"></constructor-arg>
    <constructor-arg index = "1" value ="22"></constructor-arg>
</bean>

<!-- set方法注入 -->
<bean name="address" class="com.luis.dto.Address">
    <property  name = "country" value ="中国"></property>
    <property  name = "city" value ="西安"></property>
</bean>

<!-- p空间名称注入 -->
<bean id="address" class="com.luis.dto.Address" p:country="中国" p:city="西安"></bean>
```

#### 2.2、引用类型

```xml
<bean id="address" class="com.luis.dto.Address">
    <property  name = "country" value ="中国"></property>
    <property  name = "city" value ="西安"></property>
</bean>

<!-- 构造方法注入 -->
<bean id="zhaoliu" class="com.luis.dto.Person">
    <constructor-arg index = "0" value ="赵六"></constructor-arg>
    <constructor-arg index = "1" value ="22"></constructor-arg>
    <constructor-arg index = "2" ref ="address"></constructor-arg>
</bean>

<!-- set方法注入 -->
<bean id="tianqi" class="com.luis.dto.Person">
    <property  name = "name" value ="田七"></property>
    <property  name = "age" value ="22"></property>
    <property  name = "address" ref ="address"></property>
</bean>

<!-- p空间名称注入 -->
<bean id="person" class="com.luis.dto.Person" p:pname="田七" p:age="22" p:address-ref="address"/>
```

#### 2.3、集合类型

不同的集合类型，注入方式也有所区别：

**1、数组或List集合**

```xml
<bean id="person" class="com.luis.dto.Person">
    <property name="arrs">
        <list>
            <!-- 如果集合内是简单类型，使用value子标签，如果是POJO类型，则使用bean标签 -->
            <value>张三</value>
            <value>李四</value>
            <!-- <bean></bean> -->
        </list>
    </property>
</bean>
```

**2、Set集合**

```xml
<property name="sets">
    <set>
        <!-- 如果集合内是简单类型，使用value子标签，如果是POJO类型，则使用bean标签 -->
        <value>张三</value>
        <value>李四</value>
    </set>
</property>
```

**3、Map集合**

```xml
<property name="map">
    <map>
        <entry key="张三" value="38"/>
        <entry key="李四" value="38"/>
        <entry key="王五" value="29"/>
    </map>
</property>
```

**4、Properties集合**

```xml
<property name="pro">
    <props>
        <prop key="uname">root</prop>
        <prop key="pass">123</prop>
    </props>
</property>
```