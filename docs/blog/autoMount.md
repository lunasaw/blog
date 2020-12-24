---
title: ubuntu自动挂载
date: 2020-12-24
banner_img: /img/java1.jpg
tags: 
 - ubuntu
categories:
 - 日志
---

### 一、/etc/fstab文件的作用

　　磁盘被手动挂载之后都必须把挂载信息写入/etc/fstab这个文件中，否则下次开机启动时仍然需要重新挂载。
　　系统开机时会主动读取/etc/fstab这个文件中的内容，根据文件里面的配置挂载磁盘。这样我们只需要将磁盘的挂载信息写入这个文件中我们就不需要每次开机启动之后手动进行挂载了。

### 二、挂载的限制

　　在说明这个文件的作用之前我想先强调一下挂载的限制。
　　1. 根目录是必须挂载的，而且一定要先于其他mount point被挂载。因为mount是所有目录的跟目录，其他木有都是由根目录 /衍生出来的。
　　2. 挂载点必须是已经存在的目录。
　　3. 挂载点的指定可以任意，但必须遵守必要的系统目录架构原则
　　4. 所有挂载点在同一时间只能被挂载一次
　　5. 所有分区在同一时间只能挂在一次
　　6. 若进行卸载，必须将工作目录退出挂载点（及其子目录）之外。

### 三、/etc/fstab文件中的参数

　　查看/etc/fstab文件。

```bash
# cat /etc/fstab 1
```

　　这是我的linux环境中/etc/fstab文件中的内容

```bash
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda1 during installation
UUID=2095f3a3-960c-466d-92fe-3f3be1dc0fd3 /               ext4    errors=remount-ro 0       1
# swap was on /dev/sda5 during installation
UUID=3d0e5364-4082-4644-92a9-6d4afa28d143 none            swap    sw              0       0
123456789101112
```

　　在文件中我已经把每一列都做出来表示方便识别，我们可以看到一共有六列。

##### 第一列：Device：磁盘设备文件或者该设备的Label或者UUID

　　1）查看分区的label和uuid
　　Label就是分区的标签，在最初安装系统时填写的挂载点就是标签的名字。可以通过查看一个分区的superblock中的信息找到UUID和Label name。
　　例如:我们要查看/dev/sda1这个设备的uuid和label name

```bash
# dumpe2fs -h /dev/sda11
dumpe2fs 1.42.13 (17-May-2015)
Filesystem volume name:   <none>  //Label name
Last mounted on:          /
Filesystem UUID:          2095f3a3-960c-466d-92fe-3f3be1dc0fd3 //UUID
Filesystem magic number:  0xEF53
Filesystem revision #:    1 (dynamic)
Filesystem features:      has_journal ext_attr resize_inode dir_index filetype needs_recovery extent flex_bg sparse_super large_file huge_file uninit_bg dir_nlink extra_isize
Filesystem flags:         signed_directory_hash 
Default mount options:    user_xattr acl
Filesystem state:         clean
...1234567891011
```

　　简单点的方式我们可以通过命令blkid来查看

```bash
# blkid
/dev/sda1: UUID="2095f3a3-960c-466d-92fe-3f3be1dc0fd3" TYPE="ext4" PARTUUID="8c98aa8e-01"
/dev/sda5: UUID="3d0e5364-4082-4644-92a9-6d4afa28d143" TYPE="swap" PARTUUID="8c98aa8e-05"
/dev/sdb1: UUID="a37f9605-44ee-4fbd-9943-69fd47928f87" TYPE="ext4" PARTUUID="d86506b9-01"
/dev/sdc1: UUID="00dbb3ac-c544-402b-98e1-f15d93a7bb53" TYPE="ext4" PARTUUID="79e762ca-01"
123456
```

　　2）使用设备名和label及uuid作为标识的不同
　　**使用设备名称（/dev/sda)来挂载分区时是被固定死的，一旦磁盘的插槽顺序发生了变化，就会出现名称不对应的问题。因为这个名称是会改变的。**
　　**不过使用label挂载就不用担心插槽顺序方面的问题。不过要随时注意你的Label name。至于UUID，每个分区被格式化以后都会有一个UUID作为唯一的标识号。使用uuid挂载的话就不用担心会发生错乱的问题了。**

##### 第二列：Mount point：设备的挂载点，就是你要挂载到哪个目录下。

##### 第三列：filesystem：磁盘文件系统的格式，包括ext2、ext3、reiserfs、nfs、vfat等

##### 第四列：parameters：文件系统的参数

|             |                                                              |
| ----------- | ------------------------------------------------------------ |
| Async/sync  | 设置是否为同步方式运行，默认为async                          |
| auto/noauto | 当下载mount -a 的命令时，此文件系统是否被主动挂载。默认为auto |
| rw/ro       | 是否以以只读或者读写模式挂载                                 |
| exec/noexec | 限制此文件系统内是否能够进行”执行”的操作                     |
| user/nouser | 是否允许用户使用mount命令挂载                                |
| suid/nosuid | 是否允许SUID的存在                                           |
| Usrquota    | 启动文件系统支持磁盘配额模式                                 |
| Grpquota    | 启动文件系统对群组磁盘配额模式的支持                         |
| Defaults    | 同时具有rw,suid,dev,exec,auto,nouser,async等默认参数的设置   |

##### 第五列：能否被dump备份命令作用：dump是一个用来作为备份的命令。通常这个参数的值为0或者1

|      |                            |
| ---- | -------------------------- |
| 0    | 代表不要做dump备份         |
| 1    | 代表要每天进行dump的操作   |
| 2    | 代表不定日期的进行dump操作 |

##### 第六列：是否检验扇区：开机的过程中，系统默认会以fsck检验我们系统是否为完整（clean）。

|      |                              |
| ---- | ---------------------------- |
| 0    | 不要检验                     |
| 1    | 最早检验（一般根目录会选择） |
| 2    | 1级别检验完成之后进行检验    |