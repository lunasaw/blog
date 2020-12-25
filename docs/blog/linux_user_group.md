---
title: linux_user_group命令
date: 2020-12-25
banner_img: /img/java1.jpg
tags: 
 - linux
categories:
 - 日志

---

# 1 用户组操作

创建`admin`用户组，指定组编号，命令如下：

```bash
groupadd -g 777 admin
1
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200623220944164.png)

> 其他用户组相关命令：
>
> - 删除xxx用户组：`groupdel xxx`
> - 修改用户组groupb名称为groupa：`groupmod -n groupa groupb`

# 2 用户操作

## 2.1 创建用户

创建`crane`用户，并归属到`admin`用户组中

```bash
useradd -g admin crane
1
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020062322143654.png)

## 2.2 修改用户密码

修改用户`crane`的密码

```bash
passwd crane
1
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200623221658719.png)

## 2.3 用户权限

为用户`crane`添加`sudo`权限：
使用`root`用户执行`visudo`命令，编辑文件，添加一行`crane`相关的信息，如下图

```bash
visudo
1
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200623222751147.png)

## 2.4 切换用户

切换用户到`crane`

```bash
su crane
1
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200623221911376.png)

## 用户更改 usermod

### 语法

```
usermod [-LU][-c <备注>][-d <登入目录>][-e <有效期限>][-f <缓冲天数>][-g <群组>][-G <群组>][-l <帐号名称>][-s <shell>][-u <uid>][用户帐号]
```

**参数说明**：

- -c<备注> 　修改用户帐号的备注文字。
- -d登入目录> 　修改用户登入时的目录。
- -e<有效期限> 　修改帐号的有效期限。
- -f<缓冲天数> 　修改在密码过期后多少天即关闭该帐号。
- -g<群组> 　修改用户所属的群组。
- -G<群组> 　修改用户所属的附加群组。
- -l<帐号名称> 　修改用户帐号名称。
- -L 　锁定用户密码，使密码无效。
- -s<shell> 　修改用户登入后所使用的shell。
- -u<uid> 　修改用户ID。
- -U 　解除密码锁定。

### 实例

更改登录目录

```
# usermod -d /home/hnlinux root
```

改变用户的uid

```
# usermod -u 777 root
```

### 