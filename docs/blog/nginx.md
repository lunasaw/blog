---
title: 一个简单的反向代理Nginx
date: 2020-07-27
banner_img: /img/Pikachu.jpg
tags: 
 - nginx
categories:
 - 通讯
---

![nginx](/blog/img/nginx.jpg)

NGINX联合创始人安德鲁·阿列克谢夫（Andrew Alexeev）曾说：NGINX是为对Apache性能不满意的人而构建的。随着Internet需求的变化，Web服务器的工作也在变化。NGINX的构建比以往任何时候都更有效率，更可扩展，更安全，更强大。

本文提供了Nginx的基本概念及知识。以开发者必备的Nginx基础知识为主，罗列了一些Nginx教程，希望对大家有所帮助。

**一.环境**

服务器版本：CentOS 7.2

为了保证学习阶段不遇到奇怪的事情，请保证以下四点：

1. 确认系统网络
2. 确认yum可用
3. 确认关闭iptables
4. 确认停用selinux

```bash
#查看iptables状态
systemctl status firewalld.service
#关闭防火墙（临时关闭）
systemctl stop firewalld.service
#查看SELinux状态 
getenforce#临时关闭SELinux 
setenforce 0
```

安装一些系统基本工具，正常情况系统都会自带

```
yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake
yum -y install wget httpd-tools vim
```

**二.基本概念**

**2.1Nginx是什么？**

`Nginx`是一个高性能的`http`和反向代理服务器，其特点是占用内存小，并发能力强。`Nginx`专为性能优化而开发，性能是其最重要的考量，能经受高负载的考验，有报告表明能支持高达50000个并发连接数。

![](/blog/img/nginx-1.jpg)

**2.2正向代理与反向代**

为了便于理解，首先先来了解一下一些基础知识，nginx是一个高性能的反向代理服务器那么什么是反向代理呢？

代理是在服务器和客户端之间假设的一层服务器，代理将接收客户端的请求并将它转发给服务器，然后将服务端的响应转发给客户端。

不管是正向代理还是反向代理，实现的都是上面的功能。如果你对OSI 七层模型与 TCP/IP 四层模型不是很熟悉可以再回顾下。

![](/blog/img/nginx-2.jpg)

> **正向代理**

正向代理（forward）意思是一个位于客户端和原始服务器 (origin server) 之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标 (原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。

正向代理是为我们服务的，即为客户端服务的，客户端可以根据正向代理访问到它本身无法访问到的服务器资源。

正向代理对我们是透明的，对服务端是非透明的，即服务端并不知道自己收到的是来自代理的访问还是来自真实客户端的访问。

> **反向代理**

反向代理（Reverse Proxy）方式是指以代理服务器来接受 internet 上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 internet 上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

反向代理是为服务端服务的，反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等。

反向代理对服务端是透明的，对我们是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。

**2.3负载均衡**

如果请求数过大，单个服务器解决不了，我们增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器的情况改为请求分发到多个服务器上，就是负载均衡。

Upstream 指定后端服务器地址列表，在 server 中拦截响应请求，并将请求转发到 Upstream 中配置的服务器列表。

```yml
upstream balanceServer {
 server 10.1.22.33:12345;
  server 10.1.22.34:12345;
server 10.1.22.35:12345;
}
server { 
  server_name fe.server.com;
  listen 80;
  location /api {
    proxy_pass [http://balanceServer](http://balanceserver/);
 }
}
```

上面的配置只是指定了 nginx 需要转发的服务端列表，并没有指定分配策略。

默认情况下采用的是轮询策略，将所有客户端请求轮询分配给服务端。这种策略是可以正常工作的，但是如果其中某一台服务器压力太大，出现延迟，会影响所有分配在这台服务器下的用户。

**Nginx支持的负载均衡调度算法方式如下：**

weight轮询(默认，常用)：接收到的请求按照权重分配到不同的后端服务器，即使在使用过程中，某一台后端服务器宕机，Nginx会自动将该服务器剔除出队列，请求受理情况不会受到任何影响。这种方式下，可以给不同的后端服务器设置一个权重值(weight)，用于调整不同的服务器上请求的分配率；权重数据越大，被分配到请求的几率越大；该权重值，主要是针对实际工作环境中不同的后端服务器硬件配置进行调整的。ip_hash（常用）：每个请求按照发起客户端的ip的hash结果进行匹配，这样的算法下一个固定ip地址的客户端总会访问到同一个后端服务器，这也在一定程度上解决了集群部署环境下session共享的问题。

fair：智能调整调度算法，动态的根据后端服务器的请求处理到响应的时间进行均衡分配，响应时间短处理效率高的服务器分配到请求的概率高，响应时间长处理效率低的服务器分配到的请求少；结合了前两者的优点的一种调度算法。但是需要注意的是Nginx默认不支持fair算法，如果要使用这种调度算法，请安装upstream_fair模块。url_hash：按照访问的url的hash结果分配请求，每个请求的url会指向后端固定的某个服务器，可以在Nginx作为静态服务器的情况下提高缓存效率。同样要注意Nginx默认不支持这种调度算法，要使用的话需要安装Nginx的hash软件包。

**2.4动静分离**

为了加快服务器的解析速度，可以把动态页面和静态页面交给不同的服务器来解析，加快解析速度，降低原来单个服务器的压力。

**2.5Nginx常用命令**

```bash
# 快速关闭Nginx，可能不保存相关信息，并迅速终止web服务
nginx -s stop
# 平稳关闭Nginx，保存相关信息，有安排的结束web服务
nginx -s quit
# 因改变了Nginx相关配置，需要重新加载配置而重载
nginx -s reload
# 重新打开日志文件
nginx -s reopen
# 为 Nginx 指定一个配置文件，来代替缺省的
nginx -c filename
# 不运行，而仅仅测试配置文件。nginx 将检查配置文件的语法的正确性，并尝试打开配置文件中所引用到的文件
nginx -t
#  显示 nginx 的版本
nginx -v
# 显示 nginx 的版本，编译器版本和配置参数
nginx -V
# 格式换显示 nginx 配置参数
2>&1 nginx -V | xargs -n1
2>&1 nginx -V | xargs -n1 | grep lua
```

**三.为什么选择****Nginx？**

Nginx是一款自由的、开源的、高性能的HTTP服务器和反向代理服务器；同时也是一个IMAP、POP3、SMTP代理服务器；Nginx可以作为一个HTTP服务器进行网站的发布处理，另外Nginx可以作为反向代理进行负载均衡的实现。在Nginx网站上，其功能包括：

- HTTP和HTTPS（TLS / SSL / SNI）
- 超快速的Web服务器用于静态内容
- FastCGI，WSGI，SCGI用于动态内容
- 具有负载平衡和缓存功能的加速Web代理
- 不间断实时二进制升级和配置
- 压缩和内容过滤器
- 虚拟主机
- FLV和MP4的媒体流
- 带宽和连接策略
- 全面的访问控制
- 自定义日志
- 嵌入式脚本
- 带有TLS的SMTP / IMAP / POP3的邮件代理
- 逻辑，灵活，可扩展的配置
- 在Linux，FreeBSD，Mac OS X，Solaris和Windows上运行

**nginx有如下优势：**

**1. IO多路复用epoll（IO复用）**

如何理解呢？举个例子吧！
有A、B、C三个老师，他们都遇到一个难题，要帮助一个班级的学生解决课堂作业。
老师A采用从第一排开始一个学生一个学生轮流解答的方式去回答问题，老师A浪费了很多时间，并且有的学生作业还没有完成呢，老师就来了，反反复复效率极慢。
老师B是一个忍者，他发现老师A的方法行不通，于是他使用了影分身术，分身出好几个自己同一时间去帮好几个同学回答问题，最后还没回答完，老师B消耗光了能量累倒了。
老师C比较精明，他告诉学生，谁完成了作业举手，有举手的同学他才去指导问题，他让学生主动发声，分开了“并发”。
这个老师C就是Nginx。

**2.** **轻量级**

- 功能模块少 - Nginx仅保留了HTTP需要的模块，其他都用插件的方式，后天添加
- 代码模块化 - 更适合二次开发，如阿里巴巴Tengine

**3. CPU亲和**

把CPU核心和Nginx工作进程绑定，把每个worker进程固定在一个CPU上执行，减少切换CPU的cache miss，从而提高性能。

**四.Nginx的安装**

#### **1.本地安装**

- windows系统：

> 直接去官网：https://nginx.org/en/download... 下载相应版本即可。

- mac系统：

```bash
$ brew install nginx
```

#### **2.Linux安装：**

> 以centOS系统为例，有下面两种安装方式(推荐1)

1.) 通过rpm镜像源安装

```bash
$ rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
$ yum install -y nginx
```

2.) 通过依赖包详细安装

> 安装nginx依赖库pcre、zlib

```bash
$ yum install pcre pcre-devel
$ yum install zlib zlib-devel
```

> 如有必要，可以安装c++编译环境和openssl

```bash
$ yum install gcc-c++
$ yum install openssl openssl-devel
```

> 下载/编译nginx

```yml
$ wget -c https://nginx.org/download/nginx-1.16.0.tar.gz
$ tar -zxvf nginx-1.16.0.tar.gz
# 编译安装
$ cd nginx-1.16.0
$ ./configure  # 默认安装在/usr/local/nginx
$ make && make install
# 创建软链
$ ln -s /usr/local/nginx/sbin/nginx /usr/local/sbin/nginx
$ nginx -v
```

**五.Nginx配置**

```yml
#打开主配置文件，若你是用lnmp环境安装
vim /usr/local/nginx/conf/nginx.conf
----------------------------------------
user                    #设置nginx服务的系统使用用户
worker_processes        #工作进程数 一般情况与CPU核数保持一致
error_log               #nginx的错误日志
pid                     #nginx启动时的pid
events {
    worker_connections    #每个进程允许最大连接数
    use                   #nginx使用的内核模型
}
```

我们使用 nginx 的 http 服务，在配置文件 nginx.conf 中的 http 区域内，配置无数个 server ，每一个 server 对应这一个虚拟主机或者域名。

```yml
http {
    ... ...        #后面再详细介绍 http 配置项目
    
    server {
        listen 80                          #监听端口;
        server_name localhost              #地址
        
        location / {                       #访问首页路径
            root /xxx/xxx/index.html       #默认目录
            index index.html index.htm     #默认文件
        }        
        
        error_page  500 504   /50x.html    #当出现以上状态码时从新定义到50x.html
        location = /50x.html {             #当访问50x.html时
            root /xxx/xxx/html             #50x.html 页面所在位置
        }        
    }
    
    server {
        ... ...
 } 
}
```

一个 server 可以出现多个 location ，我们对不同的访问路径进行不同情况的配置
我们再来看看 http 的配置详情。

```yml
http {
    sendfile  on                  #高效传输文件的模式 一定要开启
    keepalive_timeout   65        #客户端服务端请求超时时间
    log_format  main   XXX        #定义日志格式 代号为main
    access_log  /usr/local/access.log  main     #日志保存地址 格式代码 main
}
```

下面是 nginx 一些配置中常用的内置全局变量，你可以在配置的任何位置使用它们。

![](/blog/img/nginx-3.jpg)

**六.Nginx实战**

各种开发工具的配置结合实战来讲述，会让人更易理解。

我们先实现一个小目标：不考虑复杂的配置，仅仅是完成一个 http 反向代理。

nginx.conf 配置文件如下：

> *注：_*`conf/nginx.conf` 是 nginx 的默认配置文件。你也可以使用 nginx -c 指定你的配置文件_

```yml
#运行用户
#user somebody;
#启动进程,通常设置成和cpu的数量相等
worker_processes  1;
#全局错误日志
error_log  D:/Tools/nginx-1.10.1/logs/error.log;
error_log  D:/Tools/nginx-1.10.1/logs/notice.log  notice;
error_log  D:/Tools/nginx-1.10.1/logs/info.log  info;
#PID文件，记录当前启动的nginx的进程ID
pid        D:/Tools/nginx-1.10.1/logs/nginx.pid;
#工作模式及连接数上限
events {
    worker_connections 1024;    #单个后台worker process进程的最大并发链接数
}
#设定http服务器，利用它的反向代理功能提供负载均衡支持
http {
    #设定mime类型(邮件支持类型),类型由mime.types文件定义
    include       D:/Tools/nginx-1.10.1/conf/mime.types;
    default_type  application/octet-stream;
    #设定日志
    log_format  main  '[$remote_addr] - [$remote_user] [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log    D:/Tools/nginx-1.10.1/logs/access.log main;
    rewrite_log     on;
    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，
    #必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile        on;
    #tcp_nopush     on;
    #连接超时时间
    keepalive_timeout  120;
    tcp_nodelay        on;
    #gzip压缩开关
    #gzip  on;
    #设定实际的服务器列表
    upstream zp_server1{
        server 127.0.0.1:8089;
    }
    #HTTP服务器
    server {
        #监听80端口，80端口是知名端口号，用于HTTP协议
        listen       80;
        #定义使用www.xx.com访问
        server_name  www.helloworld.com;
        #首页
        index index.html
        #指向webapp的目录
        root D:01_WorkspaceProjectgithubzpSpringNotesspring-securityspring-shirosrcmainwebapp;
        #编码格式
        charset utf-8;
        #代理配置参数
        proxy_connect_timeout 180;
        proxy_send_timeout 180;
        proxy_read_timeout 180;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarder-For $remote_addr;
        #反向代理的路径（和upstream绑定），location 后面设置映射的路径
        location / {
            proxy_pass http://zp_server1;
        }
        #静态文件，nginx自己处理
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {
            root D:01_WorkspaceProjectgithubzpSpringNotesspring-securityspring-shirosrcmainwebappviews;
            #过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。
            expires 30d;
        }
        #设定查看Nginx状态的地址
        location /NginxStatus {
            stub_status           on;
            access_log            on;
            auth_basic            "NginxStatus";
            auth_basic_user_file  conf/htpasswd;
        }
        #禁止访问 .htxxx 文件
        location ~ /.ht {
            deny all;
        }
        #错误处理页面（可选择性配置）
        #error_page   404              /404.html;
        #error_page   500 502 503 504  /50x.html;
        #location = /50x.html {
        #    root   html;
        #}
    }
}
```

好了，让我们来试试吧：

1. 启动 webapp，注意启动绑定的端口要和 nginx 中的 upstream 设置的端口保持一致。
2. 更改 host：在 C:WindowsSystem32driversetc 目录下的 host 文件中添加一条 DNS 记录

```
127.0.0.1 www.helloworld.com
```

1. 启动前文中 startup.bat 的命令
2. 在浏览器中访问 www.helloworld.com，不出意外，已经可以访问了。

### **搭建文件服务器**

有时候，团队需要归档一些数据或资料，那么文件服务器必不可少。使用 Nginx 可以非常快速便捷的搭建一个简易的文件服务。

Nginx 中的配置要点：

- 将 autoindex 开启可以显示目录，默认不开启。
- 将 autoindex_exact_size 开启可以显示文件的大小。
- 将 autoindex_localtime 开启可以显示文件的修改时间。
- root 用来设置开放为文件服务的根路径。
- charset 设置为 charset utf-8,gbk;，可以避免中文乱码问题

一个最简化的配置如下：

```yml
autoindex on;# 显示目录
autoindex_exact_size on;# 显示文件大小
autoindex_localtime on;# 显示文件时间
server {
    charset      utf-8,gbk; # windows 服务器下设置后，依然乱码，暂时无解
    listen       9050 default_server;
    listen       [::]:9050 default_server;
    server_name  _;
    root         /share/fs;
}
```