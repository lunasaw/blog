---
title: mac-launchctl
date: 2021-04-20 23:18:17
banner_img: /img/macos.png
index_img: /img/macos.png
tags: 
 - macos
categories:
 - system
---

# MAC设置Launchctl开机启动

### 主要目录

#### mac将使用launchctl做为开机启动工具，launchctl将根据plist文件的信息来启动任务。plist脚本一般存放在以下目录：

- l /Library/LaunchDaemons -->只要系统启动了，哪怕用户不登陆系统也会被执行
- l /Library/LaunchAgents -->当用户登陆系统后才会被执行

```bash
~/Library/LaunchAgents 由用户自己定义的任务项
/Library/LaunchAgents 由管理员为用户定义的任务项
/Library/LaunchDaemons 由管理员定义的守护进程任务项
/System/Library/LaunchAgents 由Mac OS X为用户定义的任务项
/System/Library/LaunchDaemons 由Mac OS X定义的守护进程任务项
```

### launchctl 常用命令：

```bash
# 加载任务, -w选项会将plist文件中无效的key覆盖掉，建议加上

$ launchctl load -w com.demo.plist


# 删除任务

$ launchctl unload -w com.demo.plist


# 查看任务列表, 使用 grep '任务部分名字' 过滤

$ launchctl list | grep 'com.demo'


# 开始任务

$ launchctl start  com.demo.plist


# 结束任务

$ launchctl stop   com.demo.plist
```

如果任务呗修改了，那么必须先unload，然后重新loadstart可以测试任务，这个是立即行，不管时间到了没有执行start和unload前，任务必须先load过，否则报错stop可以停止任务

##### plist支持两种方式配置执行时间：

- StartInterval: 指定脚本每间隔多长时间（单位：秒）执行一次
- StartCalendarInterval: 可以指定脚本在多少分钟、小时、天、星期几、月时间上执行，类似如crontab的中的设置，包含下面的 key:

```xml
Minute <integer>

The minute on which this job will be run.

Hour <integer>

The hour on which this job will be run.

Day <integer>

The day on which this job will be run.

Weekday <integer>

The weekday on which this job will be run (0 and 7 are Sunday).

Month <integer>

The month on which this job will be run.
```

### plist部分参数说明：

1. Label：对应的需要保证全局唯一性；
2. Program：要运行的程序；
3. ProgramArguments：命令语句
4. StartCalendarInterval：运行的时间，单个时间点使用dict，多个时间点使用 array
5. StartInterval：时间间隔，与StartCalendarInterval使用其一，单位为秒
6. StandardInPath、StandardOutPath、StandardErrorPath：标准的输入输出错误文件，这里建议不要使用 .log 作为后缀，会打不开里面的信息。

#### 定时启动任务时，如果涉及到网络，但是电脑处于睡眠状态，是执行不了的，这个时候，可以定时的启动屏幕就好了。

### 例子

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>KeepAlive</key>
	<dict>
		<key>SuccessfulExit</key>
		<false/>
	</dict>
	<key>Label</key>
	<string>frpc</string>
	<key>ProgramArguments</key>
	<array>
		<string>/Users/luna_mac/Documents/luna/frp/frpc</string>
		<string>-c</string>
		<string>/Users/luna_mac/Documents/luna/frp/frpc.ini</string>
	</array>
	<key>StandardErrorPath</key>
	<string>/tmp/shelltask.err</string>
	<key>StandardOutPath</key>
	<string>/tmp/shelltask.log</string>
	<key>WorkingDirectory</key>
	<string>/Users/luna_mac/Documents/luna/frp</string>
</dict>
</plist>
```

