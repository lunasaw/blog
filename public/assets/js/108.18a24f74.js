(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{810:function(a,s,t){"use strict";t.r(s);var e=t(7),r=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h2",{attrs:{id:"_1-安装apache"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装apache"}},[a._v("#")]),a._v(" 1.安装apache")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" apache2 apache2-utils\n")])])]),t("h2",{attrs:{id:"_2-启用dav模块"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-启用dav模块"}},[a._v("#")]),a._v(" 2.启用dav模块")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" a2enmod dav_fs\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" a2enmod dav\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" a2enmod dav_lock\n")])])]),t("h2",{attrs:{id:"_3-创建webdav目录及davlockdb文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-创建webdav目录及davlockdb文件"}},[a._v("#")]),a._v(" 3.创建webdav目录及DavLockDB文件")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("mkdir")]),a._v(" /var/webdav\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("chown")]),a._v(" www-data:www-data /var/webdav\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("touch")]),a._v(" /var/DavLock\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("chown")]),a._v(" www-data:www-data /var/DavLock\n")])])]),t("h2",{attrs:{id:"_4-增加访问用户-例如用户-alex"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-增加访问用户-例如用户-alex"}},[a._v("#")]),a._v(" 4.增加访问用户(例如用户 alex)")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" htpasswd -c /var/passwd.dav alex\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 此处会输入密码2次")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("chown")]),a._v(" www-data:www-data /var/passwd.dav\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("chmod")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("640")]),a._v(" /var/www/passwd.dav\n")])])]),t("h2",{attrs:{id:"_5-配置虚拟主机"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-配置虚拟主机"}},[a._v("#")]),a._v(" 5.配置虚拟主机")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" /etc/apache2/site-available/000-default.conf\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("############################")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("## 内容开始")]),a._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 80端口冲突需要修改此处及 /etc/apache2/ports.conf 文件")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("VirtualHost *:8"),t("span",{pre:!0,attrs:{class:"token operator"}},[t("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[a._v("0")]),a._v(">")]),a._v("\n        ServerAdmin webmaster@localhost\n        DocumentRoot /var/webdav\n        ErrorLog "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${APACHE_LOG_DIR}")]),a._v("/error.log\n        CustomLog "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${APACHE_LOG_DIR}")]),a._v("/access.log combined\n        \n        DavLockDB "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/var/DavLock"')]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("Directory /var/webdav/"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n                Options Indexes MultiViews\n                AllowOverride None\n                Order allow,deny\n                allow from all\n        "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("/Directory"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n\n        Alias /webdav /var/webdav\n        "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("Location /webdav"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n             DAV On\n             AuthType Basic\n             AuthName "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"webdav"')]),a._v("\n             AuthUserFile /var/webdav/passwd.dav\n             Require valid-user\n        "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("/Location"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("/VirtualHost"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# vim: syntax=apache ts=4 sw=4 sts=4 sr noet")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),a._v("\n")])])]),t("h2",{attrs:{id:"_6-重启apache服务及测试"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-重启apache服务及测试"}},[a._v("#")]),a._v(" 6.重启apache服务及测试")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" systemctl restart apache2\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 命令行测试用 cadaver")]),a._v("\ncadaver http://127.0.0.1/webdav\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# Win客户端可以使用 WinSCP")]),a._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);