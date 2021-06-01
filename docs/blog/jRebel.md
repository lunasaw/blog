---
title: jRebel
date: 2021-05-18 11:30:42
banner_img: /img/jrebel.jpg
index_img: /img/jrebel.png
tags: 
 - idea
categories:
 - basic-component
 - idea
---

# JRebel激活方案

## 背景说明

`Jrebel`可快速实现热部署，节省了大量重启时间，提高了个人开发效率。

## 解决方案

### 安装Jrebel

通过`Idea`的偏好设置找到插件框，输入`Jrebel and XRebel for IntelliJ`安装插件，通过偏好设置找到`JRebel & XRebel`然后选择激活插件，打开`jrebel`激活面板，选择Team URL(connect to online licensing service)

### 方案一

激活网站：[http://jrebel.cicoding.cn/](https://links.jianshu.com/go?to=http%3A%2F%2Fjrebel.cicoding.cn%2F)，通过浏览器打开得到如下内容:



```swift
Hello,This is a Jrebel & JetBrains License Server!
```

打开浏览器访问网址：[http://jrebel.cicoding.cn/guid](https://links.jianshu.com/go?to=http%3A%2F%2Fjrebel.cicoding.cn%2Fguid)得到如下内容



```undefined
GUID : 9CA7F155-A655-7233-02FE-6406A133313D
```

拷贝内容：9CA7F155-A655-7233-02FE-6406A133313D

此时生成激活URL,格式如下：[http://jrebel.cicoding.cn/GUID](https://links.jianshu.com/go?to=http%3A%2F%2Fjrebel.cicoding.cn%2FGUID)

> [http://jrebel.cicoding.cn/4B068EB5-0941-4645-1E98-FC077D530A61](https://links.jianshu.com/go?to=http%3A%2F%2Fjrebel.cicoding.cn%2F4B068EB5-0941-4645-1E98-FC077D530A61)

在第一行输入上述地址，第二行输入一个符合邮箱格式的邮箱地址（随便输入一个就可以，不需要是真实邮箱），勾选`I agree with the terms & conditions of the License Agreement`即可完成激活，激活完成后选择`Work offline`。

> 绿色的Valid表示是有效的
>
> Work offline是为了防止授权过期

对Idea的Jrebel插件设置生效时间（Time Saved Statistics）通过鼠标勾选1分钟

通过偏好设置找到`构建、执行、部署`=>`编译器` 勾选自动构建项目[Build project automatically]

### 方案二

GUID生成：[https://www.guidgen.com/](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.guidgen.com%2F)

激活URL :[https://jrebel.qekang.com/GUID](https://links.jianshu.com/go?to=https%3A%2F%2Fjrebel.qekang.com%2FGUID)

## 方案验证

工程启动有如下四个图标：

- 绿色三角形按钮：IDEA自带的启动按钮；
- 绿色虫子按钮：IDEA自带的 Debug 启动按钮；
- 火箭带字体JR按钮：热部署JRebel 正常启动；
- 虫子带字体JR按钮:热部署JRebel Debug启动。

> **要想使用热部署插件 JRebel ，必须要使用后两个启动按钮，切记！**

Jrebel有一个Pannel面板，勾选对应需要热更新的模块，如果源码修改后没有生效，则可以点击类似锤子的构建按钮就行构建，然后就会自动热更新了,默认情况下，JRebel 热部署插件在你修改完已经编译好的 Java 文件失去焦点的时候，自动会将修改后 Java 文件编译，并替换掉旧的 Class 文件,**一般情况下，在使用热部署插件 JRebel 启动项目时，修改某个Java文件，手动的对项目进行热部署操作 Build -> Build Project**

> Mac:Command+F9
>
> Windows:Ctrl+F9



作者：明训
链接：https://www.jianshu.com/p/5666a8be025f
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
