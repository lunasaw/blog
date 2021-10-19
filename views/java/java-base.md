---
title: java
date: 2021-05-18 11:36:52
banner_img: /img/java.jpg
index_img: /img/java.png
sidebar: 'auto'
isShowComments: true
tags: 
 - video
categories:
 - java
 - javabin
---

## [Java的bin等目录说明](https://www.cnblogs.com/studywiththinking/p/4638948.html)

- **javac：**Java编译器，将Java源代码换成字节代
- **java：**Java解释器，直接从类文件执行Java应用程序代码
- **appletviewer(小程序浏览器)：**一种执行HTML文件上的Java小程序类的Java浏览器
- **javadoc：**根据Java源代码及其说明语句生成的HTML文档
- **jdb：**Java调试器，可以逐行地执行程序、设置断点和检查变量
- **javah：**产生可以调用Java过程的C过程，或建立能被Java程序调用的C过程的头文件
- **Javap：**Java反汇编器，显示编译类文件中的可访问功能和数据，同时显示字节代码含义
- **jar：**多用途的存档及压缩工具，是个java应用程序，可将多个文件合并为单个JAR归档文件。
- **htmlConverter**——命令转换工具。
- **native2ascii**——将含有不是Unicode或Latinl字符的的文件转换为Unicode编码字符的文件。
- **serialver**——返回serialverUID。语法：serialver [show] 命令选项show是用来显示一个简单的界面。输入完整的类名按Enter键或"显示"按钮，可显示serialverUID。

```bash
补充详细：
**javac.exe**

用法：javac <选项> <源文件>
可能的选项包括：
-g 生成所有调试信息
-g:none 生成无调试信息
-g:{lines,vars,source} 生成只有部分调试信息
-O 优化；可能妨碍调试或者增大类文件
-nowarn 生成无警告
-verbose 输出关于编译器正在做的信息
-deprecation 输出使用了不鼓励使用的API的源程序位置
-classpath <路径> 指定用户类文件的位置
-sourcepath <路径> 指定输入源文件的位置
-bootclasspath <路径> 覆盖自举类文件的位置
-extdirs <目录(多个)> 覆盖安装的扩展类的位置
-d <目录> 指定输出类文件的位置
-encoding <编码> 指定源文件中所用的字符集编码
-target <版本> 生成指定虚拟机版本的类文件
-help Print a synopsis of standard options
```

```bash
**appletviewer.exe**

用法：appletviewer <options> url

其中，<options> 包括：
-debug 在 Java 调试器中启动 applet 小程序查看器
-encoding <encoding> 指定由 HTML 文件使用的字符编码
-J<runtime flag> 向 Java 解释器传递参数

-J 选项不是标准选项，如有更改，不另行通知。
```



====================

```bash
**jar.exe**

用法：jar {ctxu}[vfm0M] [jar-文件] [manifest-文件] [-C 目录] 文件名 ...
选项：
-c 创建新的存档
-t 列出存档内容的列表
-x 展开存档中的命名的（或所有的〕文件
-u 更新已存在的存档
-v 生成详细输出到标准输出上
-f 指定存档文件名
-m 包含来自标明文件的标明信息
-0 只存储方式；未用ZIP压缩格式
-M 不产生所有项的清单（manifest〕文件
-i 为指定的jar文件产生索引信息
-C 改变到指定的目录，并且包含下列文件：
如果一个文件名是一个目录，它将被递归处理。
清单（manifest〕文件名和存档文件名都需要被指定，按'm' 和 'f'标志指定的相同顺序。
示例1：将两个class文件存档到一个名为 'classes.jar' 的存档文件中：
jar cvf classes.jar Foo.class Bar.class
示例2：用一个存在的清单（manifest）文件 'mymanifest' 将 foo/ 目录下的所有
文件存档到一个名为 'classes.jar' 的存档文件中：
jar cvfm classes.jar mymanifest -C foo/ .
```



```bash
**javadoc.exe**

用法：javadoc [options] [packagenames] [sourcefiles] [classnames] [@files]
-overview <file> 读取 HTML 格式的概述文档
-public 仅显示 public 类和成员
-protected 显示 protected/public 类和成员（缺省）
-package 显示 package/protected/public 类和成员
-private 显示所有类和成员
-help 显示命令行选项
-doclet <class> 通过候选 doclet 生成输出
-docletpath <path> 指定 doclet 类文件的查找位置
-sourcepath <pathlist> 指定源文件的查找位置
-classpath <pathlist> 指定用户类文件的查找位置
-exclude <pkglist> Specify a list of packages to exclude
-subpackages <subpkglist> Specify subpackages to recursively load
-breakiterator Compute 1st sentence with BreakIterator
-bootclasspath <pathlist> 覆盖自举类加载器所加载的类文件的位置
-source <release> Provide source compatibility with specified release
-extdirs <dirlist> 覆盖已安装的扩展的位置
-verbose 有关 Javadoc 所做工作的输出信息
-locale <name> 所用的 Locale，例如 en_US 或 en_US_WIN
-encoding <name> 源文件编码名称
-J<flag> 将 <flag> 直接传给运行时系统
```

```bash
由标准 doclet 提供：
-d <directory> 输出文件的目标目录
-use 创建类和包的用法页
-version 包含 @version 段
-author 包含 @author 段
-docfilessubdirs Recursively copy doc-file subdirectories
-splitindex 将索引分为每个字母对应一个文件
-windowtitle <text> 文档的浏览器窗口标题
-doctitle <html-code> 包含包索引页（首页）的标题
-header <html-code> 包含每一页的页眉文本
-footer <html-code> 包含每一页的页脚文本
-bottom <html-code> 包含每一页的页底文本
-link <url> Create links to javadoc output at <url>
-linkoffline <url> <url2> Link to docs at <url> using package list at <url2>
-excludedocfilessubdir <name1>:.. Exclude any doc-files subdirectories with given name.
-group <name> <p1>:<p2>.. Group specified packages together in overview page
-nocomment Supress description and tags, generate only declarations.
-nodeprecated 不包含 @deprecated 信息
-noqualifier <name1>:<name2>:... Exclude the list of qualifiers from the output.
-nosince Do not include @since information
-nodeprecatedlist 不生成不鼓励使用的列表
-notree 不生成类层次
-noindex 不生成索引
-nohelp 不生成帮助链接
-nonavbar 不生成导航栏
-quiet Do not display status messages to screen
-serialwarn Generate warning about @serial tag
-tag <name>:<locations>:<header> Specify single argument custom tags
-taglet The fully qualified name of Taglet to register
-tagletpath The path to Taglets
-charset <charset> Charset for cross-platform viewing of generated documentation.
-helpfile <file> 包含帮助链接功能链接到目标的文件
-linksource Generate source in HTML
-stylesheetfile <path> 改变所生成文档的样式的文件
-docencoding <name> 输出编码名称
```



```bash
 **javah.exe**

用法：javah [options] <classes>

其中 [options] 包括：

-help 打印该帮助信息
-classpath <path> 类的加载路径
-bootclasspath <path> 自举类的加载路径
-d <dir> 输出目录
-o <file> 输出文件（仅能使用 -d 或 -o 之一）
-jni 生成 JNI 风格的头文件（缺省）
-old 生成 JDK1.0 风格的头文件
-stubs 生成 stubs 文件
-version 打印版本信息
-verbose 输出有关本命令所做工作的信息
-force 始终写输出文件

指定 <classes> 时必须使用全名（例如 java.lang.Object）。
```

```bash
**javaw.exe**

====================
HtmlConverter.exe

用法：HtmlConverter [-option1 value1 [-option2 value2 [...]]] [-simulate] [filespecs]

其中，选项包括：

-source: 获取源文件的路径。 缺省值： <userdir>
-dest: 写入已转换文件的路径。 缺省值： <userdir>
-backup: 写备份文件的路径。 缺省值： <dirname>_BAK
-f: 强制覆写备份文件。
-subdirs: 应处理子目录中的文件。
-template: 模板文件的路径。 如果不确定，请使用缺省值。
-log: 写日志的路径。 如果没有提供，则不会写入任何日志。
-progress: 转换时显示进度。 缺省值： true
-simulate: 在没有进行转换时显示特定于转换的信息。
-latest: 使用最新的 JRE 支持发行版 mimetype。
-gui: 显示转换程序的图形用户界面。

filespecs: 用空格分开的文件说明列表。 缺省值： "*.html *.htm" （需要引号）

```



```bash
**orbd.exe**

用法：orbd <选项>

其中，<选项> 包括：
-port 启动 ORBD 的激活端口，缺省值为 1049 (可选)
-defaultdb ORBD 文件的目录，缺省值为 "./orb.db" (可选)
-serverid ORBD 的服务器标识符，缺省值为 1 (可选)
-ORBInitialPort 初始端口（必需）
-ORBInitialHost 初始主机名称（必需）

====================
policytool.exe

用法：policytool [选项]

[-file <file>] 规则文件位置

====================
rmic.exe

用法：rmic <选项> <类名>

其中 <选项> 包括：
-keep 不删除中间生成的源文件
-keepgenerated （同 "-keep")
-v1.1 为 1.1 stub 协议版本创建 stubs/skeleton
-vcompat （缺省）创建与 1.1 和
1.2 stub 协议版本兼容的 stubs/skeleton
-v1.2 仅为 1.2 stub 协议版本创建 stubs
-iiop 为 IIOP 创建 stubs。当使用该选项时，<选项>还应包括：

-always 总创建 stubs （即使在它们同时出现时〕
-alwaysgenerate (同 "-always")
-nolocalstubs 不创建为同一进程优化的 stubs

-idl 创建 IDL。当使用该选项时，<选项>还应包括：

-noValueMethods 不生成值类型的方法
-always 总创建 IDL （即使在它们同时出现时〕
-alwaysgenerate (同 "-always")

-g 一般调试信息
-depend 以递归方式重编译过期的文件
-nowarn 不警告
-nowrite 不将编译过的类写入到文件系统
-verbose 输出有关编译器所做工作的信息
-classpath <path> 指定输入源和类文件的查找位置
-sourcepath <path> 指定用户源文件的查找位置
-bootclasspath <path> 覆盖自举类文件的位置
-extdirs <path> 覆盖安装扩展类的位置
-d <directory> 指定所生成类文件的放置位置
-J<runtime flag> 将参数传给 java 解释程序

====================
**rmid.exe**

用法：rmid <option>

其中，<option> 包括:
-port <option> 指定供 rmid 使用的端口
-log <directory> 指定 rmid 将日志写入的目录
-stop 停止当前的 rmid 调用（对指定端口）
-C<runtime 标记> 向每个子进程传递参数（激活组）
-J<runtime 标记> 向 java 解释程序传递参数

====================
rmiregistry.exe

用法： rmiregistry <选项> <端口>

其中，<选项> 包括：
-J<runtime 标记> 将参数传递到 java 解释程序

====================
serialver.exe

用法：serialver [-classpath classpath] [-show] [classname...]

====================
**servertool.exe**

欢迎使用 Java IDL 服务器工具
请在提示处输入命令

servertool > help

可用命令：
\-------------------

register - 注册一个可激活的服务器
unregister - 取消服务器注册
getserverid - 返回应用程序名称的服务器标识符
list - 列举所有已注册服务器
listappnames - 列举当前定义的应用程序名称
listactive - 列举当前活动的服务器
locate - 将已注册服务器定位在特定类型的端口
locateperorb - 为已注册服务器的特定对象请求代理程序定位端口。
orblist - 对象请求代理程序 (orb) 名称及其映射列表
shutdown - 关闭一个已注册服务器
startup - 启动一个已注册服务器
help - 取得帮助
```

## quit - 退出此工具

```bash
**rmic**

功能说明：
rmic 为远程对象生成 stub 和 skeleton。
语法：
rmic [ options ] package-qualified-class-name(s)
补充说明：
rmic 编译器根据编译后的 Java 类（含有远程对象实现）名，为远程对象生成 stub 和 skeleton（远程对象是指实现 java.rmi.Remote 接口的对象）。在 rmic 命令中所给的类必须是经 javac 命令成功编译且是完全包限定的类。
命令选项
-classpath[路径] 指定 rmic 用于查询类的路径。如果设置了该选项，它将覆盖缺省值或 CLASSPATH 环境变量。目录用冒号分隔。
-d[目录] 指定类层次的根目录。此选项可用来指定 stub 和 skeleton 文件的目标目录。
-depend 使编译器考虑重新编译从其它类引用的类。 一般来说，它只重新编译从源代码引用的遗漏或过期的类。
-g 允许生成调试表格。调试表格含有行号和局部变量的有关信息，即 Java 调试工具所使用的信息。缺省情况下，只生成行号。
-J 与 -D 选项联用，它将紧跟其后的选项（ -J 与 -D 之间无空格）传给 java 解释器。
-keepgenerated 为 stub 和 skeleton 文件保留所生成的 .java 源文件，并将这些源文件写到与 .class 文件相同的目录中，如果要指定目录，则使用 -d 选项。
-nowarn 关闭警告。如果使用该选项，则编译器不输出任何警告信息。
-show 显示 rmic 编译器的 GUI（图形用户界面）。输入一个或多个包限定类名（以空格分隔），并按回车键或“显示”按钮，创建 stub 和 skeleton。
-vcompat （缺省值）创建与 JDK 1.1 和 1.2 stub 协议版本都兼容的 stub 和 skeleton。
-verbose 使编译器和链接器输出关于正在编译哪些类和正在加载哪些类文件的信息。
-v1.1 创建 JDK 1.1 stub 协议版本的 stub 和 skeleton。
-v1.2 只创建 JDK 1.2 stub 协议版本的 stub。

=================================

rmid

功能说明：
rmid 启动激活系统守护进程，以便能够在 Java 虚拟机上注册和激活对象。
语法：
rmid [-port port] [-log dir]
补充说明：
rmid 工具启动激活系统守护进程。必须先启动激活系统守护进程，才能向激活系统注册可被激活的对象或在 Java 虚拟机上激活可被激活的对象。
命令选项
-C<某些命令行选项> 指定一个选项，在创建每个 rmid 的子守护进程（激活组）时，该选项以命令行参数的形式传给该子守护进程。
-log[目录] 指定目录的名称，激活系统守护进程在该目录中写入其数据库及相关信息。缺省状态下，将在执行 rmid 命令的目录中创建一个 log 目录。
-port[端口] 指定 rmid 的注册服务程序所使用的端口。激活系统守护进程将 ActivationSystem 与该注册服务程序中的名称java.rmi.activation.ActivationSystem 捆绑在一起。
-stop 停止 -port 选项所指定端口上的当前 rmid 调用。若未指定端口，则将停止在端口 1098 上运行的 rmid。

=============================

rmiregistry

功能说明：
rmiregistry 命令可在当前主机的指定端口上启动远程对象注册服务程序。
语法：
rmiregistry [port]
补充说明：
rmiregistry 命令在当前主机的指定 port 上创建并启动远程对象注册服务程序。如果省略 port，则注册服务程序将在 1099 端口上启动。rmiregistry 命令不产生任何输出而且一般在后台运行。远程对象注册服务程序是自举命名服务。主机上的 RMI 服务器将利用它将远程对象绑定到名字上。客户机即可查询远程对象并进行远程方法调用。注册服务程序一般用于定位应用程序需调用其方法的第一个远程对象。该对象反过来对各应用程序提供相应的支持，用于查找其它对象。java.rmi.registry.LocateRegistry 类的方法可用于在某台主机或主机和端口上获取注册服务程序操作。java.rmi.Naming 类的基于 URL 的方法将对注册服务程序进行操作，并可用于查询远程对象、将简单（字符串）名称绑定到远程对象、将新名称重新绑定到远程对象（覆盖旧绑定）、取消远程对象的绑定以及列出绑定在注册服务程序上的 URL。

=============================

serialver

功能说明：
serialver 命令返回 serialVersionUID。
语法：
serialver [ 命令选项 ]
补充说明：
serialver 以适于复制到演变类的形式返回一个或多个类的 serialVersionUID。不带参数调用时，它输出用法行。
命令选项
-show 显示一个简单的用户界面。输入完整的类名并按回车键或“显示”按钮可显示 serialVersionUID。

================================

jarsigner

功能说明：
为 Java 归档 (JAR) 文件产生签名，并校验已签名的 JAR 文件的签名。
语法：
jarsigner [ 命令选项 ] jar-file alias
jarsigner -verify [ 命令选项 ] jar-file
补充说明：
jarsigner 工具用于两个目的：
1:为 Java 归档 (JAR) 文件签名
2:校验已签名的 JAR 文件的签名和完整性
命令选项
-keystore[url] 指定密钥仓库的 URL。缺省值是用户的宿主目录中的 .keystore 文件，它由系统属性“user.home”决定。
-storetype[storetype] 指定要被实例化的密钥仓库类型。默认的密钥仓库类型是安全属性文件中 "keystore.type" 属性值所指定的那个类型，由 java.security.KeyStore 中的静态方法 getDefaultType 返回。
-storepass[password] 指定访问密钥仓库所需的口令。这仅在签名（不是校验）JAR 文件时需要。在这种情况下，如果命令行中没有提供 -storepass 选项，用户将被提示输入口令。
-keypass[password] 指定用于保护密钥仓库项（由命令行中指定的别名标出）的私钥的口令。使用 jarsigner 为 JAR 文件签名时需要该口令。如果命令行中没有提供口令，且所需的口令与密钥仓库的口令不同，则将提示用户输入它。
-sigfile[file] 指定用于生成 .SF 和 .DSA 文件的基本文件名。
-signedjar[file] 指定用于已签名的 JAR 文件的名称。
-verify 如果它出现在命令行中，则指定的 JAR 文件将被校验，而不是签名。如果校验成功，将显示“jar verified”。如果试图校验未签名的 JAR 文件，或校验被不支持的算法（例如未安装 RSA 提供者时使用的 RSA）签名的 JAR 文件，则将有如下显示： "jar is unsigned. (signatures missing or not parsable)" 。
-certs 如果它与 -verify 和 -verbose 选项一起出现在命令行中，则输出将包括 JAR 文件的每个签名人的证书信息。
-verbose 如果它出现在命令行中，则代表“verbose”模式，它使 jarsigner 在 JAR 签名或校验过程中输出额外信息。
-internalsf 过去，JAR 文件被签名时产生的 .DSA（签名块）文件包含一个同时产生的 .SF 文件（签名文件）的完整编码副本。这种做法已被更改。为了减小输出 JAR 文件的整个大小，缺省情况下 .DSA 文件不再包含 .SF 文件的副本。但是如果 -internalsf 出现在命令行中，将采用旧的做法。该选项主要在测试时有用；实际上不应使用它，因为这样将消除有用的优化。
-sectionsonly 如果它出现在命令行中，则 JAR 文件被签名时生成的 .SF 文件（签名文件）将不包括含有整个清单文件的散列的头。它仅包含 与 JAR 中每个单独的源文件相关的信息和散列。该选项主要在测试时有用；实际上不应使用它，因为这样将消除有用的优化。
-J[javaoption] 将指定的 javaoption 串直接传递到 Java 解释器。(（jarsigner 实际上是解释器的一个 “wrapper”）。该选项不应含有任何空格。它有助于调整执行环境或内存使用。要获得可用的解释器选项的清单，可在命令行键入 java -h 或 java -X。

========================

keytool
功能说明：
管理由私钥和认证相关公钥的 X.509 证书链组成的密钥仓库（数据库）。还管理来自可信任实体的证书。
语法：
keytool [ 命令 ]
补充说明：
keytool 是个密钥和证书管理工具。它使用户能够管理自己的公钥/私钥对及相关证书，用于（通过数字签名）自我认证（用户向别的用户/服务认证自己）或数据完整性以及认证服务。它还允许用户储存他们的通信对等者的公钥（以证书形式）。

=======================

native2ascii

功能说明：
将含有本地编码字符（既非 Latin1 又非 Unicode 字符）的文件转换为 Unicode 编码字符的文件。
语法：
native2ascii [options] [inputfile [outputfile]]
补充说明：
Java 编译器和其它 Java 工具只能处理含有 Latin-1 和/或 Unicode 编码（udddd 记号）字符的文件。native2ascii 将含有其它字符编码的文件转换成含 Latin-1 和/或 Unicode 编码字符的文件。若省略 outputfile，则使用标准输出设备输出。此外，如果也省略 inputfile，则使用标准输入设备输入。
命令选项
-reverse 执行相反的操作：将含 Latin-1 和/或 Unicode 编码字符的文件转换成含本地编码字符的文件。
-encoding[encoding_name] 指定转换过程使用的编码名称。缺省的编码从系统属性 file.encoding 中得到。

=======================

appletviewer

功能说明：
Java applet 浏览器。appletviewer 命令可在脱离万维网浏览器环境的情况下运行 applet。
语法：
appletviewer [ threads flag ] [ 命令选项 ] urls ...
补充说明：
appletviewer 命令连接到 url 所指向的文档或资源上，并在其自身的窗口中显示文档引用的每个 applet。注意：如果 url 所指向的文档不引用任何带有 OBJECT、EMBED 或 APPLET 标记的 applet，那么 appletviewer 就不做任何事情。
命令选项
-debug 在 Java 调试器 jdb 中启动 appletviewer，使您可以调试文档中的 applet。
-encoding[编码名称] 指定输入 HTML 文件的编码名称。
-J[javaoption] 将 javaoption 字符串作为单个参数传给运行 appletviewer 的 Java 解释器。参数不能含有空格。由多重参数组成的字符串，其中的每个参数都必须以前缀 -J 开头，该前缀以后将被除去。这在调整编译器的执行环境或内存使用时将很有用。

=========================

extcheck

功能说明：
extcheck 检测目标 jar 文件与当前安装方式扩展 jar 文件间的版本冲突。
语法：
extcheck [ -verbose ] targetfile.jar
补充说明：
extcheck 实用程序检查指定 Jar 文件的标题和版本与 JDK TM 软件中所安装的扩展是否有冲突。在安装某个扩展前，可以用该实用程序查看是否已安装了该扩展的相同版本或更高的版本。
extcheck 实用程序将 targetfile.jar 文件清单的 specification-title 和 specification-version 头与当前安装在扩展目录下所有 Jar 文件的相对应的头进行比较（缺省扩展目录为 jre/lib/ext）。extcheck 实用程序比较版本号的方式与 java.lang.Package.isCompatibleWith 方法相同。若未检测到冲突，则返回代码为 0。如果扩展目录中任何一个 jar 文件的清单有相同的 specification-title 和相同的或更新的 specification-version 号，则返回非零错误代码。如果 targetfile.jar 的清单中没有 specification-title 或 specification-version 属性，则同样返回非零错误代码。
命令选项
-verbose 对扩展目录中的 Jar 文件进行检查时，列出文件。此外，还报告目标 jar 文件的清单属性及所有冲突的 jar 文件。

=====================

jar

功能说明：
Java归档工具
语法：
jar [ 命令选项 ] [manifest] destination input-file [input-files]
补充说明：
jar工具是个java应用程序，可将多个文件合并为单个JAR归档文件。jar是个多用途的存档及压缩工具，它基于ZIP和ZLIB压缩格式。然而，设计jar的主要目的是便于将java applet或应用程序打包成单个归档文件。将applet或应用程序的组件(.class 文件、图像和声音)合并成单个归档文件时，可以用java代理(如浏览器)在一次HTTP事务处理过程中对它们进行下载，而不是对每个组件都要求一个新连接。这大大缩短了下载时间。jar还能压缩文件，从而进一步提高了下载速度。此外，它允许applet的作者对文件中的各个项进行签名，因而可认证其来源。jar工具的语法基本上与tar命令的语法相同。
命令选项
-c 在标准输出上创建新归档或空归档。
-t 在标准输出上列出内容表。
-x[file] 从标准输入提取所有文件，或只提取指定的文件。如果省略了file，则提取所有文件；否则只提取指定文件。
-f 第二个参数指定要处理的jar文件。在-c(创建)情形中，第二个参数指的是要创建的jar文件的名称(不是在标准输出上)。在-t(表(或-x(抽取)这两种情形中，第二个参数指定要列出或抽取的jar文件。
-v 在标准错误输出设备上生成长格式的输出结果。
-m 包括指定的现有清单文件中的清单信息。用法举例：“jar cmf myManifestFile myJarFile *.class”
-0 只储存，不进行 ZIP 压缩。
-M 不创建项目的清单文件。
-u 通过添加文件或更改清单来更新现有的 JAR 文件。例如：“jar -uf foo.jar foo.class”将文件 foo.class 添加到现有的JAR文件foo.jar中，而“jar umf manifest foo.jar”则用manifest中的信息更新foo.jar的清单。
-C 在执行 jar 命令期间更改目录。例如：“jar -uf foo.jar -C classes *”将classes目录内的所有文件加到foo.jar中，但不添加类目录本身。
程序示例
1:将当前目录下所有CLASS文件打包成新的JAR文件：
jar cf file.jar *.class
2:显示一个JAR文件中的文件列表
jar tf file.jar
3:将当前目录下的所有文件增加到一个已经存在的JAR文件中
jar cvf file.jar *

========================

javadoc

功能说明
Java API文档生成器从Java源文件生成API文档HTML页。
语法：
javadoc [ 命令选项 ] [ 包名 ] [ 源文件名 ] [ @files ]
其中[ 包名 ]为用空格分隔的一系列包的名字，包名不允许使用通配符，如（*）。[ 源文件名 ]为用空格分
```

