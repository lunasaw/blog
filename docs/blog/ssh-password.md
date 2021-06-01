---
title: ssh 配置教程
date: 2020-05-05
banner_img: /img/ssh.jpg
index_img: /img/ssh.png
tags: 
 - ssh
categories:
 - basic-component
 - ssh
---

# 1、环境说明

环境就不进行说明了，比较三次配置，一个配过九台，每每情况各有不同。只能告知各位读者，博主这里使用的是red hat红帽，估计centOS也差不太多，不过有差异也无妨，学会博主方法，相信你就不会蒙蔽了，知道怎么往对的方向走了

# 2、场景说明

要求node1免密登录到node2，这里任选了一个用户，也即是

```java
[hadoop@node1 .ssh]$ ssh node2
```

# 3、ssh登录原理过程

![/blog/img/ssh/ssh-2.png](/blog/img/ssh/ssh-2.png)

这里看不懂也没关系，楼主详解一番：

node1发送一个请求，问：node2，你在不在？我想连接你

node2查找本地是否有node1的公钥，情况一：没有，情况二：有

情况一：

node2回复说：我在！你的公钥告诉我一下。

node1再次发送过去，自己的公钥，

node2在本地进行计算，存储，得到的一串通过公钥得到的不知道什么钥，返回给node1，说：你看看对不对

node1告知node2：对！咱们已经建立连接了

node2警惕的回复node1：你知道我登录密码多少吗？

用户输入密码.....

node1把密码封装了发过去：你看是这个不？

node2回复：对，咱们已经建立连接！

情况二：

node2一看本地有node1的公钥，心想原来认识的，然后通过公钥计算出一个不知道什么钥匙，回复：你看看是这个钥匙吗？

node1告知node2：对！咱们已经建立连接了

node2回复node1：连接建立成功！

具体几次握手，博主不知道，大致就是这么个过程

ssh配置中，会用到下面几个文件：

![/blog/img/ssh/ssh-1.png](/blog/img/ssh/ssh-1.png)

恩~毫无PS痕迹。。。

1、需要在node1上生成公钥以及私钥，而id_rsa就是私钥，id_rsa.pub文件就是公钥文件。私钥我们这里就不用了，就用公钥，用完了为了保证安全性，你可以选择删掉，也可以不删，根据你的喜好决定，也就是pub文件

2、authorized文件，是为了方便node2的，不用询问node1的公钥本地文件，这个单词读者们需要记住，要建立这个文件！

3、known_hosts，表名node2是认识的主机，这个不用配置，读者可以不用管，可以作为了解原理。比如，一台新系统，.ssh目录下你会发现没有这个文件，但在你第一次ssh以后，这个文件就会生成。

简单说明：

​       上面做了原理说明，简单来说：就是node1想要连接node2免密登录node2，需要把node1的id_rsa.pub文件内容写进node2的authorized_keys里面。就大功告成了

# 4、最简单配置

## 4.1、生成公钥以及密钥：

在node1上：

```java
[hadoop@node1 ~]$ ssh-keygen -t rsa
```

一路回车。

若是不想回车，可在上面代码末尾加上，-P ""

## 4.2、处理

方法一：

## 将node1的公钥拷贝到node2

node1上(小心别把node2的id_rsa.pub覆盖掉)

```java
[hadoop@node1 .ssh]$ scp -p id_rsa.pub hadoop@node2:~/.ssh/id_rsa.pub1
```

## 然后，node2将公钥加入自身认证

在node2上：

```java
[hadoop@node1.ssh]$ cat id_rsa.pub1 > authorized_key
```

验证查看文件authorized_key中是否有id_rsa.pub1文件的内容

方法二：

## 直接把自己密钥拷贝到需要免密的机器上：

```typescript
ssh-copy-id -i ~/.ssh/id_rsa.pub 用户名@ip
```

 将密钥文件直接拷贝到指定用户名、ip。输入密码后，下次你当前用户执行ssh到刚刚指定的用户名ip就不用再输入密码了。

方法二较方法一方便很多

## 4.4、验证：node1连接node2

在node1上：

```java
[hadoop@node1 .ssh]$ ssh hadoop@node2
```

楼主这里没有截图，不用输入密码发现主机名变了即为成功

# 5、调试及常规报错解决

## 5.1、说明

   系统日志：/var/log/secure，是个不知道干什么用的日志。ssh连接失败的报错，在这里记录

## 5.2、报错

![/blog/img/ssh/ssh-3.png](/blog/img/ssh/ssh-3.png)

解决：相关目录权限不对，一下列出相关权限。读者根据具体去修改

​    1、755         ~

​    2、700         ~/.ssh

​    3、644         ~/.ssh/authorized_keys(博主实测，600也可，具体的读者试试也就知道了，也不麻烦)

配置文件选项未开（无图）

这里楼主没有碰到过，所以没有图，各位读者碰到修改了就好

解决： vi   /etc/ssh/sshd_config

![/blog/img/ssh/ssh-4.png](/blog/img/ssh/ssh-4.png)

这三项需要注释掉，按博主图片中这样就好。