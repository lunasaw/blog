---
title: macos-profile
date: 2021-05-17 10:32:32
banner_img: /img/macos.png
index_img: /img/macos.png
sidebar: 'auto'
isShowComments: true
tags: 
 - macos
categories:
 - system
---

# macOS 环境变量配置教程

### 如果只是寻找设置方法，请按照如下方法操作：



```bash
 $echo $PATH
 $sudo vi ~/.bash_profile
```

*Tips: 以上操作为显示当前已设置环境变量路径，如果没有要添加的程序，则使用vi 命令进行操作添加。*
 在 文件中 输入 



```bash
$export PATH="$PATH:'pwd'/xxxx/bin"
```

*Tips: 以上命令中将  pwd  替换为当前程序文件所在目录，XXXX替换为程序名称。*
 *或者在应用程序根目录处执行以上命令*
 编辑完成后，按ESC键，输入:wq 保存退出。
 如果需要立即生效



```bash
$source 'fileName'
```

*Tips: 以上命令中： 'fileName' 参数为要操作的文件名。*

## 一、环境变量（environment variables）

环境变量一般是指在操作系统中用来制定操作系统运行环境的一些参数。环境变量是在操作系统中一个具有特定名字的对象，它包含了一个或者多个应用程序所使用到的信息。

当要求系统运行一个程序而没有告诉它程序所在的完整路径时，系统除了在当前目录下面寻找此程序外，还应该到path中指定的路径中去寻找。用户通过设置环境变量，来更好的运行进程。

## 二、主要作用

### 设置参数

环境变量相当于给系统或用户应用程序设置的一些参数，具体起什么作用这当然和具体的环境变量有关。比如 path，是告诉系统，当需要系统运行一个程序而没有告诉它程序所在的完整路径时，系统除了在当前目录下面寻找此程序外，还应该到哪些目录下去寻找。

## 常见环境变量

### macOS

macOS  一般使用bash作为默认shell

Mac系统的环境变量，加载顺序为：
 /etc/profile  /etc/paths  ~/.bash_profile  ~/.bash_login  ~/.profile   ~/.bashrc

其中 /etc/profile 和 /etc/paths 是系统级别的,系统启动就会加载，后面几个是当前用户级的环境变量。后面三个按照从前往后的顺序读取，如果 ~/.bash_profile 文件存在，则后面的几个文件就会被忽略，若不存在才会依次读取。 而 ~/.bashrc 没有上述规则，它是 bash shell 打开的时候载入的。

#### 设置方法



```ruby
#中间用冒号隔开 最好不要有空格
    export PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:---:<PATH N>
```

(一) 全局变量
 下面的几个文件是全局的，修改时需要先获取权限

1. /etc/paths
    编辑 paths 时，将环境变量添加到 paths 文件中即可，一行一个路径

2）/etc/profile (建议不修改此文件)
 全局（公有）配置，不管是哪个用户，登录时都会读取该文件。

1. /etc/bashrc (一般在此文件中添加系统级环境变量)
    全局（公有）配置，bash shell 执行时，不管是何种方式，读取此文件。

(二)单个用户设置

1）~/bash_profile (任意一个文件中添加用户级环境变量)
 （*tips*: Linux里面是 .bashrc 而Mac下是 .bash_profile）

若 bash shell 是以 login 方式执行时，才会读取此文件。该文件仅仅执行一次，默认情况下，他设置一些环境变量设置命令别名 alias ll= 'ls -la'

1. 若需要立即生效，需要执行  $source .bash_profile ,否则一般重启后生效。

### WINDOWS系统

|           名称           | 作用                                                         |
| :----------------------: | :----------------------------------------------------------- |
|    %ALLUSERSPROFILE%     | 局部 返回所有“用户配置文件”的位置。                          |
|        %APPDATA%         | 局部 返回默认情况下应用程序存储数据的位置。                  |
|           %CD%           | 局部 返回当前目录字符串。                                    |
|       %CMDCMDLINE%       | 局部 返回用来启动当前的 Cmd.exe 的准确命令行。               |
|     %CMDEXTVERSION%      | 系统 返回当前的“命令处理程序扩展”的版本号。                  |
|      %COMPUTERNAME%      | 系统 返回计算机的名称。                                      |
|        %COMSPEC%         | 系统 返回命令行解释器可执行程序的准确路径。                  |
|          %DATE%          | 系统 返回当前日期。使用与 date /t 命令相同的格式。由 Cmd.exe 生成。有关 date 命令的详细信息，请参阅 Date。 |
|       %ERRORLEVEL%       | 系统 返回使用过的命令的错误代码。通常用非零值表示错误。      |
|       %HOMEDRIVE%        | 系统 返回连接到用户主目录的本地工作站驱动器号。基于主目录值的设置。用户主目录是在“本地用户和组”中指定的。 |
|        %HOMEPATH%        | 系统 返回用户主目录的完整路径。基于主目录值的设置。用户主目录是在“本地用户和组”中指定的。 |
|       %HOMESHARE%        | 系统 返回用户的共享主目录的网络路径。基于主目录值的设置。用户主目录是在“本地用户和组”中指定的。 |
|       %LOGONSEVER%       | 局部 返回验证当前登录会话的域控制器的名称。                  |
|  %NUMBER_OF_PROCESSORS%  | 系统 指定安装在计算机上的处理器的数目。                      |
|           %OS%           | 系统 返回操作系统的名称。Windows 2000 将操作系统显示为 Windows_NT。 |
|          %PATH%          | 系统 指定可执行文件的搜索路径。                              |
|        %PATHEXT%         | 系统 返回操作系统认为可执行的文件扩展名的列表。              |
| %PROCESSOR_ARCHITECTURE% | 系统 返回处理器的芯片体系结构。值: x86，IA64。               |
|  %PROCESSOR_IDENTIFIER%  | 系统 返回处理器说明。                                        |
|    %PROCESSOR_LEVEL%     | 系统 返回计算机上安装的处理器的型号。                        |
|   %PROCESSOR_REVISION%   | 系统 返回处理器修订号的系统变量。                            |
|         %PROMPT%         | 局部 返回当前解释程序的命令提示符设置。由 Cmd.exe 生成。     |
|         %RANDOM%         | 系统 返回 0 到 32767 之间的任意十进制数字。由 Cmd.exe 生成。 |
|      %SYSTEMDRIVE%       | 系统 返回包含 Windows XP 根目录（即系统根目录）的驱动器。    |
|       %SYSTEMROOT%       | 系统 返回 Windows XP 根目录的位置。                          |
|     %TEMP% and %TMP%     | 系统和用户 返回对当前登录用户可用的应用程序所使用的默认临时目录。有些应用程序需要 TEMP，而其它应用程序则需要 TMP。 |
|          %TIME%          | 系统 返回当前时间。使用与 time /t 命令相同的格式。由 Cmd.exe 生成。有关 time 命令的详细信息，请参阅 Time。 |
|       %USERDOMAIN%       | 局部 返回包含用户帐户的域的名称。                            |
|        %USERNAME%        | 局部 返回当前登录的用户的名称。                              |
|      %UserProfile%       | 局部 返回当前用户的配置文件的位置。                          |
|         %WINDIR%         | 系统 返回操作系统目录的位置。                                |

### Linux系统

shell 环境依赖于多个文件的设置。当 shell 被调用时，它从两个初始文件读取命令。 /etc/profile 包含了系统变量，它由系统管理员维护，由系统管理员设置本地系统变量和特殊命令。普通用户的启动信息文件($HOME/.bash_project)由各用户自己维护，该文件可以被修改以实现任何特定的系统初始化。

只有在特定的情况下才读取 profile 文件，确切的说是在用户登录的时候。当运行shell脚本或者 subshell 以后，就无需再读 profile。虽然所有 profile 都是可选的，但是基本上所有系统都有 /etc/profile.

如果定义了变量 ENV 且已经传递到环境中，则所有的 bash shell 都要读取并调用由这个变量制定的文件所包含的命令。这个文件用来定义所有 bash shell 的特性，而不仅仅是登录到 shell。这个文件的典型的名字是 '$HOME/,bashrc'。

当新建用户是，.bash_profile、bashrc 和其他公共的环境文件模板将复制到 /etc/skel 这个目录下面。可以编辑这些初始化设置，也可以在此目录下添加附加的文件。

| 一个典型的系统profile(/etc/profile):  |
| :-----------------------------------: |
|     PATH=$PATH:/usr/qa/tools/bin      |
|          ENV==$HOME/.bashrc           |
|        ORACLE_HOME=/dbs/oracle        |
|            ORACLE_SID=qadb            |
| Export PATH ENV ORACLE_HOME ORCAL_SID |
|             Cat /etc/motd             |

|                一个典型的用户profile(.bashrc)                |
| :----------------------------------------------------------: |
| PATH=![PATH:](https://math.jianshu.com/math?formula=PATH%3A)HOME/bin |
|                   TEAM=uvt1224 export TERM                   |
|                         sttyintr ^C                          |
|                             cal                              |
|                            mesg n                            |

| 一个典型的用户 bashrc file (.bashrc): |
| :-----------------------------------: |
|       alias dir=ls lf='ls -FC'        |
|            PSI='$PWS[!]>'             |
|               set -o vi               |

*tips:* 别名和其他bash专用的定义应该放在.bashrc文件（不应在.bash_profile) 中定义；否则会导致找不到某些命令。

 应该记住profile文件和.bashrc文件的区别：两个profile都只在系统启动时被读取一次，而.bashrc在系统启动和每次调用shell的时候都要被读取。