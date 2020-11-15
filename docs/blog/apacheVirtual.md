---
title: apache虚拟主机配置
date: 2020-05-05
banner_img: /img/java1.jpg
tags: 
 - apache
categories:
 - 日志
---

## apache虚拟主机配置

apache2.4的最终配置效果:

**httpd.conf**

```xml
Listen 19010
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
```

**httpd-vhosts.conf**

```xml
# IP:Port,以端口号配置虚拟机
<VirtualHost 127.0.0.1:19010>
    # 网站错误时提示的联系管理员邮箱（可不配置）
    ServerAdmin webmaster@dummy-host.example.com
    # 虚拟主机根目录
    DocumentRoot "${SRVROOT}"
    # 服务器名称（可不配置）
    ServerName dummy-host.example.com
    # 服务器别名（可不配置）
    ServerAlias www.dummy-host.example.com
    # 错误日志
    ErrorLog "logs/dummy-host.example.com-error.log"
    # 访问日志
    CustomLog "logs/dummy-host.example.com-access.log" common
    # 访问目录的配置，可以是其的一个子文件夹
    <Directory "${SRVROOT}/public">
        # 控制特定目录将启用哪些服务器特性
		Options FollowSymLinks
        # 指明Apache服务器是否去找.htacess文件作为配置文件
		AllowOverride All
        # 控制请求是否可以访问
		Require all granted
	</Directory>
</VirtualHost>
```

部分参数详细说明：

**Options FollowSymLinks**

Options指令是Apache配置文件中一个比较常见也比较重要的指令，Options指令可以在Apache服务器核心配置(server config)、虚拟主机配置(virtual host)、特定目录配置(directory)以及.htaccess文件中使用。

Options指令的主要作用是控制特定目录将启用哪些服务器特性。

All

表示除 `MultiViews`之外的所有特性。这也是Options指令的默认设置。

None

表示不启用任何的服务器特性。

FollowSymLinks

服务器允许在此目录中使用符号连接。如果该配置选项位于 `<Location>`配置段中，将会被忽略。

Indexes

如果输入的网址对应服务器上的一个文件目录，而此目录中又没有 `DirectoryIndex`指令(例如： `DirectoryIndex index.html index.php`)，那么服务器会返回由 `mod_autoindex`模块生成的一个格式化后的目录列表，并列出该目录下的所有文件。

MultiViews

允许使用 `mod_negotiation`模块提供内容协商的"多重视图"。

SymLinksIfOwnerMatch

服务器仅在符号连接与目标文件或目录的所有者具有相同的用户ID时才使用它。

ExecCGI

允许使用 `mod_cgi`模块执行CGI脚本。

Includes

允许使用 `mod_include`模块提供的服务器端包含功能。

IncludesNOEXEC

允许服务器端包含，但禁用"#exec cmd"和"#exec cgi"。但仍可以从 `ScriptAlias`目录使用"#include virtual"虚拟CGI脚本。

**AllowOverride All**

AllowOverride参数就是指明Apache服务器是否去找.htacess文件作为配置文件，如果设置为none,那么服务器将忽略.htacess文件，如果设置为All,那么所有在.htaccess文件里有的指令都将被重写。对于AllowOverride，还可以对它指定如下一些能被重写的指令类型。

从安全性考虑，根目录的AllowOverride属性一般都配置成不允许任何Override 。

None

网站 .htaccess 文件将被完全忽略。

All

所有具有 .htaccess 作用域的指令都允许出现在 .htaccess 文件中。

AuthConfig

允许使用与认证授权相关的指令(AuthDBMGroupFile, AuthDBMUserFile, AuthGroupFile, AuthName, AuthType, AuthUserFile, Require, 等)。

FileInfo

允许使用控制文档类型的指令(DefaultType, ErrorDocument, ForceType, LanguagePriority, SetHandler, SetInputFilter, SetOutputFilter, mod\_mime中的 Add\* 和 Remove\* 指令等等)、控制文档元数据的指令(Header, RequestHeader, SetEnvIf, SetEnvIfNoCase, BrowserMatch, CookieExpires, CookieDomain, CookieStyle, CookieTracking, CookieName)、mod\_rewrite中的指令(RewriteEngine, RewriteOptions, RewriteBase, RewriteCond, RewriteRule)和mod\_actions中的Action指令。

Indexes

允许使用控制目录索引的指令(AddDescription, AddIcon, AddIconByEncoding, AddIconByType, DefaultIcon, DirectoryIndex, FancyIndexing, HeaderName, IndexIgnore, IndexOptions, ReadmeName, 等)。

Limit

允许使用控制主机访问的指令(Allow, Deny, Order)。 一般 Apache 新安装 AllowOverride 默认为「None」。

一般都尽可能避免使用.htaccess文件，任何希望放在.htaccess文件中的配置，都可放在主配置的<Directory>段中。避免使用的原因主要有：

性能问题

如果AllowOverride启用.htaccess文件，则Apache会在每个目录中查找.htaccess文件，因此启用.htaccess都会导致性能的下降。

另外，对每一个请求，都需要读取一次.htaccess文件。

还有，Apache必须在所有上级的目录中查找.htaccess文件，以使所有有效的指令都起作用(参见指令的生效)

安全问题

允许用户自己修改apache的配置，可能会导致某些意想不到的修改，如果给予用户较少的特权而不能满足其需要，则会带来额外的技术支持请求，所以必须明确地告诉用户已经给予他们的权限，说明AllowOverride设置的值，并引导他们参阅相应的说明，以免日后生出许多麻烦。

**Require all granted**

在Apache2.2版本中，访问控制是基于客户端的主机名、IP地址以及客户端请求中的其他特征，使用Order(排序), Allow(允许), Deny(拒绝),Satisfy(满足)指令来实现。

在Apache2.4版本中，使用mod_authz_host这个新的模块，来实现访问控制，其他授权检查也以同样的方式来完成。旧的访问控制语句应当被新的授权认证机制所取代，即便Apache已经提供了mod_access_compat这一新模块来兼容旧语句。

用新方法取代旧语句实现相同的访问控制示例：



1.所有请求都被拒绝

Apache2.2 配置:

Order deny,allow #排序，先拒绝后允许

Deny from all #拒绝所有

Apache2.4 配置:

Require all denied #拒绝所有

2.所有请求都被允许

Apache2.2 配置:

Order allow,deny #排序，先允许后拒绝

Allow from all #允许所有

Apache2.4 配置:

Require all granted #允许所有

http://3.example.com所有请求都被允许，其他拒绝

Apache2.2 配置:

Order Deny,Allow #排序，先拒绝后允许

Deny from all #拒绝所有

Allow from [Example Domain](https://link.zhihu.com/?target=http%3A//example.com) #[允许example.com](https://link.zhihu.com/?target=http%3A//%E5%85%81%E8%AE%B8example.com)

Apache2.4 配置:

Require host [Example Domain](https://link.zhihu.com/?target=http%3A//example.com) #[允许example.com](https://link.zhihu.com/?target=http%3A//%E5%85%81%E8%AE%B8example.com)



附：常见访问控制指令

Require all granted #允许所有来源访问

Require all denied #拒绝所有来源访问

Require expr expression #允许表达式为true时访问

Require ip 10 172.1 192.168.2 #允许特定IP段访问，多个段之前用空格隔开，每个段使用开头几项表示

Require host [Example Domain](https://link.zhihu.com/?target=http%3A//example.com) #只允许来自域名example.com的主机访问