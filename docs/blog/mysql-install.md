---
title: mysql 免安装配置学习
date: 2020-07-27
banner_img: /blog/img/Pikachu.jpg
tags: 
 - mysql-install
categories:
 - 日志
---

## [MySQL5.7绿色版（免装版）的初始化和修改密码](https://www.cnblogs.com/jyiqing/p/6924062.html)



## 1.下载MySQL5.7.18绿色版

### 1.1下载链接

以下是MySQL5.7.18绿色版的链接（来源oracle官网），打开链接直接下载

[ https://dev.mysql.com/gt/Downloads/MySQL-5.7/mysql-5.7.18-winx64.zip](https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.18-winx64.zip )

 

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531143529352-602278557.png)



### 1.2解压

解压到文件夹

 

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531144247352-1580893970.png)

 



## 2.新建或清空data文件夹

2.1解压以后，在目录下创建一个data文件夹

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531144826149-841051205.png)

 

2.2如果原来已经有一个data文件夹，就把里面的数据全部删掉。

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531145236946-1572810043.png)



##  3.安装服务



### 3.1打开cmd（管理员）

右键开始菜单→选择  命令提示符（管理员）  

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531145850039-1319323901.png)

3.2在cmd中打开mysql的bin文件夹

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531150209180-1118035298.png)

 

### 3.3安装服务 

3.3.1运行命令mysqld –install安装服务，如下图：

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531150533821-1911670674.png)

 

 

3.3.2（可忽略）如果不需要mysql里，只需要运行mysqld –remove即可移除，如下图

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531150657743-1551155360.png)

 

## 4.初始化数据库

4.1运行命令：mysqld --initialize-insecure --user=mysql --explicit_defaults_for_timestamp。

运行前，先确保data目录下没有任何文件（如果有文件，会初始化失败）。

如图：

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531152920946-912565873.png)

## 5启动服务

5.1运行net start mysql 启动服务，如下图:

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531152123868-1945981492.png)

5.2运行net stop mysql 启动服务，如下图:

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531152232321-1808686512.png)



## 6.客户端测试

6.1运行：mysql –uroot –p

如下图：

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531153348243-2114953114.png)

 

 这里不需要密码，直接按回车键

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531153504321-346439667.png)

看到 mysql> 就证明是成功进入mysql的了

## 7.配置编码为UTF-8

 

7.1创建.txt文件，改名为my.ini

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531153816274-47071108.png)

将以下代码添加到my.ini

```
[mysqld]
character-set-server=utf8
[mysql]
default-character-set=utf8
```

 

 如图：

![img](https://images2015.cnblogs.com/blog/1082630/201706/1082630-20170602093831883-1704012524.png)

 

7.2在mysql中查看编码

7.2.1重启mysql，命令：mysqld restart

7.2.2查看编码命令：`show variables ``like '``character``%';（修改前）`

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531193918618-75843652.png)

 7.2.3查看编码命令：`show variables ``like '``character``%';（修改后）`

 ![img](https://images2015.cnblogs.com/blog/1082630/201706/1082630-20170602094015118-857002467.png)



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



![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531194355243-1786061531.png)

 

 b.

 

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531194415164-1674331383.png)

 

c.

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531194513868-541684904.png)

 

 

 d.

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531194603368-61233480.png)

 



##  9.重新打开mysql

使用刚刚设置的密码123456登录

![img](https://images2015.cnblogs.com/blog/1082630/201705/1082630-20170531194808383-101044283.png)

 

 登录成功！！！