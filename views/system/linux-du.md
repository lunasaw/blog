---
title: linux du
date: 2021-10-12
banner_img: /img/linux.jpg
index_img: /img/linux.jpg
sidebar: "auto"
isShowComments: true
tags:
  - linux
categories:
  - system
  - linux
---# du 查看某个文件或目录占用磁盘空间的大小

一、du 的功能：`du` reports the amount of disk space used by the specified files and for each subdirectory (of directory arguments). with no arguments,`du` reports the disk space for the current directory。

很明显，与 df 不同，它用来查看文件或目录所占用的磁盘空间的大小。

二、du 常用的选项：

**-h**：以人类可读的方式显示(表示以恰当的 K/M/G 单位展示)

-a：显示目录占用的磁盘空间大小，还要显示其下目录和文件占用磁盘空间的大小

**-s**：(summarize)显示目录占用的磁盘空间大小，不要显示其下子目录和文件占用的磁盘空间大小(即算总和)

-c：显示几个目录或文件占用的磁盘空间大小，还要统计它们的总和

--apparent-size：显示目录或文件自身的大小

-l ：统计硬链接占用磁盘空间的大小

-L：统计符号链接所指向的文件占用的磁盘空间大小

一、du -h：这个就不多说了。

二、du -a：使用此选项时，显示目录和目录下子目录和文件占用磁盘空间的大小。

常用的命令

du -sh [指定文件或目录]: 查看当前目录总共占的容量。而不单独列出各子项占用的容量

du -lh --max-depth=1 : 查看当前目录下一级子文件和子目录占用的磁盘容量。--max-depth 选项控制深度（从 0、1...开始）

示例：

1.

```
du -sh *
```

![img](./img/linux/du-sh.png)

2.

```
du -ch *.tar.gz
```

![img](./img/linux/du-ch.png)

`-c`选项，是 --total 的缩写形式，它表示的是针对输出的各个对象来计算其磁盘使用量的总和

3.

```
du -lh --max-depth=1
```

![img](./img/linux/du-lh.png)

当--max-depth 设定为 0 时, 只显示当前文件夹总大小

可见, --max-depth=0 的作用, 相当于-s

**du 和 ls 的区别**

- du 展示的是磁盘空间占用量。
- ls 展示的是文件内容的大小。

同时， du 和 ls 针对同一个文件，展示的大小是不一样的 (抽象说：磁盘占用=内容+包装)

因为大部分文件系统规定：

1. 一个数据块中最多存放一个文件的内容，当没存满时，剩余的空间不得被其他文件使用。
2. 当一个文件的内容较大时，则可以存储到多个数据块中。
