---
title: apachedav配置
date: 2020-05-05
banner_img: /img/java1.jpg
tags: 
 - apache
categories:
 - basic-component
 - apache
---

## 1.安装apache

```shell
sudo apt-get install apache2 apache2-utils
```

## 2.启用dav模块

```shell
sudo a2enmod dav_fs
sudo a2enmod dav
sudo a2enmod dav_lock
```

## 3.创建webdav目录及DavLockDB文件

```shell
sudo mkdir /var/webdav
sudo chown www-data:www-data /var/webdav
sudo touch /var/DavLock
sudo chown www-data:www-data /var/DavLock
```

## 4.增加访问用户(例如用户 alex)

```shell
sudo htpasswd -c /var/passwd.dav alex
# 此处会输入密码2次
sudo chown www-data:www-data /var/passwd.dav
sudo chmod 640 /var/www/passwd.dav
```

## 5.配置虚拟主机

```shell
sudo vim /etc/apache2/site-available/000-default.conf

############################
## 内容开始

# 80端口冲突需要修改此处及 /etc/apache2/ports.conf 文件
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/webdav
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        
        DavLockDB "/var/DavLock"
        <Directory /var/webdav/>
                Options Indexes MultiViews
                AllowOverride None
                Order allow,deny
                allow from all
        </Directory>

        Alias /webdav /var/webdav
        <Location /webdav>
             DAV On
             AuthType Basic
             AuthName "webdav"
             AuthUserFile /var/webdav/passwd.dav
             Require valid-user
        </Location>
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
======================================
```

## 6.重启apache服务及测试

```shell
sudo systemctl restart apache2

# 命令行测试用 cadaver
cadaver http://127.0.0.1/webdav
# Win客户端可以使用 WinSCP
```