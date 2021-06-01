---
title: linux_systemctl
date: 2020-04-02
banner_img: /img/linux.jpg
index_img: /img/linux.jpg
tags: 
 - linux
categories:
 - system
 - linux
---
# systemctl配置管理文件详解

- 文件存放位置：（共三处）
  /etc/systemd/system/
  /usr/lib/systemd/system
  /lib/systemd/system

## 文件内容

```bash
$cat sshd.service
    [Unit]
    Description=OpenSSH server daemon
    Documentation=man:sshd(8) man:sshd_config(5)
    After=network.target sshd-keygen.service
    Wants=sshd-keygen.service
    [Service]
    Type=forking
    PIDFile=/var/run/sshd.pid
    EnvironmentFile=/etc/sysconfig/sshd
    ExecStart=/usr/sbin/sshd $OPTIONS
    ExecReload=/bin/kill -HUP $MAINPID
    KillMode=process
    Restart=on-failure
    RestartSec=42s
    [Install]
    WantedBy=multi-user.target

```

## 参数介绍

```bash
[Unit] 区块：启动顺序与依赖关系。
Description：当前配置文件的描述信息。
Documentation：帮助信息。
After：表示当前服务是在那个服务后面启动，一般定义为网络服务启动后启动
Wants：表示sshd.service与sshd-keygen.service之间存在”弱依赖”关系，即如果”sshd-keygen.service”启动失败或停止运行，不影响sshd.service继续执行。
[Service] 区块：启动行为
Type：定义启动类型。
PIDFile：服务的pid文件路径。
EnvironmentFile：指定当前服务依赖的环境参数文件。
ExecStart：定义启动进程时执行的命令。
ExecReload：重启服务时执行的命令
KillMode：定义 Systemd 如何停止 sshd 服务。
Restart：定义了 sshd 退出后，Systemd 的重启方式。
RestartSec：表示Systemd重启服务之前，需要等待的秒数。上面的例子设为等待42秒。
[Install] 区块：定义如何安装这个配置文件，即怎样做到开机启动。
WantedBy：表示该服务所在的 Target。multi-user.target表明当系统以多用户方式（默认的运行级别）启动时，这个服务需要被自动运行。

```

