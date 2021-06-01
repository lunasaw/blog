---
title: mysql 免安装配置学习
date: 2020-07-27
banner_img: /img/mysql.jpg
index_img: /img/mysql.png
tags: 
 - mysql-install
categories:
 - basic-component
 - mysql
---

## [MySQL5.7绿色版（免装版）的初始化和修改密码](https://www.cnblogs.com/jyiqing/p/6924062.html)



## 1.下载MySQL5.7.18绿色版

### 1.1下载链接

以下是MySQL5.7.18绿色版的链接（来源oracle官网），打开链接直接下载

[ https://dev.mysql.com/gt/Downloads/MySQL-5.7/mysql-5.7.18-winx64.zip](https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.18-winx64.zip )

 

![img](https://i.loli.net/2021/04/18/Fslm6cZMqWU5JCz.png)



### 1.2解压

解压到文件夹

 

![img](https://i.loli.net/2021/04/18/hqpuc7SHXJ8LQgP.png)

 



## 2.新建或清空data文件夹

2.1解压以后，在目录下创建一个data文件夹

![img](https://i.loli.net/2021/04/18/GCqjWEg8un7N46r.png)

 

2.2如果原来已经有一个data文件夹，就把里面的数据全部删掉。

![img](https://i.loli.net/2021/04/18/YZfb3eRmorDVaJ8.png)



##  3.安装服务



### 3.1打开cmd（管理员）

右键开始菜单→选择  命令提示符（管理员）  

![img](https://i.loli.net/2021/04/18/VRUrtOW9iNyLcKl.png)

3.2在cmd中打开mysql的bin文件夹

![img](https://i.loli.net/2021/04/18/LCwnjzseMSNaPOJ.png)

 

### 3.3安装服务 

3.3.1运行命令mysqld –install安装服务，如下图：

![img](https://i.loli.net/2021/04/18/9n3YDyxGzNiP25Q.png)

 

 

3.3.2（可忽略）如果不需要mysql里，只需要运行mysqld –remove即可移除，如下图

![img](https://i.loli.net/2021/04/18/ZO9XSDgvMQluIVa.png)

 

## 4.初始化数据库

4.1运行命令：mysqld --initialize-insecure --user=mysql --explicit_defaults_for_timestamp。

运行前，先确保data目录下没有任何文件（如果有文件，会初始化失败）。

如图：

![img](https://i.loli.net/2021/04/18/wWMe2ogFzNkxLq9.png)

## 5启动服务

5.1运行net start mysql 启动服务，如下图:

![img](https://i.loli.net/2021/04/18/NQcxrwq8CvEWkAj.png)

5.2运行net stop mysql 启动服务，如下图:

![img](https://i.loli.net/2021/04/18/qv6uYVKd5RgsUyF.png)



## 6.客户端测试

6.1运行：mysql –uroot –p

如下图：

![img](https://i.loli.net/2021/04/18/TVWS7py5utzA8fE.png)

 

 这里不需要密码，直接按回车键

![img](https://i.loli.net/2021/04/18/ZVoBid1muUFENrt.png)

看到 mysql> 就证明是成功进入mysql的了

## 7.配置编码为UTF-8

 

7.1创建.txt文件，改名为my.ini

![img](https://i.loli.net/2021/04/18/k9GPZ2D7nFf3pMA.png)

将以下代码添加到my.ini

```
[mysqld]
character-set-server=utf8
[mysql]
default-character-set=utf8
```

 

 如图：

![img](https://i.loli.net/2021/04/18/Sc3UfXNeYqiw2Pd.png)

 

7.2在mysql中查看编码

7.2.1重启mysql，命令：mysqld restart

7.2.2查看编码命令：`show variables ``like '``character``%';（修改前）`

![img](https://i.loli.net/2021/04/18/2tIM8EgOsAauTYG.png)

 7.2.3查看编码命令：`show variables ``like '``character``%';（修改后）`

 ![img](https://i.loli.net/2021/04/18/BxcSJWG346qTHme.png)



##  8.修改密码

在mysql 中逐步输入以下的代码：



```
use mysql;

//密码为123456
update user set authentication_string=PASSWORD("123456") where user="root";


//更新权限
flush privileges; 

//退出mysql
quit;
```



 如图：

 a.



![img](https://i.loli.net/2021/04/18/cQzYPhGJK324mVd.png)

 

 b.

 

![img](https://i.loli.net/2021/04/18/Qxkv5G4cCVbpjXf.png)

 

c.

![img](https://i.loli.net/2021/04/18/C8KUryuVfz4dOkW.png)

 

 

 d.

![img](https://i.loli.net/2021/04/18/nGYSEdOCfsq6AKt.png)

 



##  9.重新打开mysql

使用刚刚设置的密码123456登录

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531194808383-101044283.png)

 

 登录成功！！！