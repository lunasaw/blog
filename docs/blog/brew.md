---
title: homebrew教程
date: 2020-05-05
banner_img: /img/java1.jpg
tags: 
 - Mac-brew
categories:
 - system
 - macos

---

## homebrew

是osx下的一个包管理工具，可以很方便的管理各类包。官方给出的定义是

> macOS缺失的软件包管理器
>  [官方地址](https://links.jianshu.com/go?to=https%3A%2F%2Fbrew.sh%2F)

# 安装

## 1、自动安装(推荐)

执行如下命令：



```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

上边的命令行是两个命令，首先下载install文件，然后用系统的ruby工具安装。

尽量再bash或者zsh下安装，fish下会提示不识别'$'。

不需要使用超级权限（sudo），该文件会将HomeBrew安装至 `usr/local` 目录下。安装过程中会提示你絮语奥执行哪些动作。



```bash
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew
==> The following new directories will be created:
/usr/local/bin
/usr/local/etc
/usr/local/include
/usr/local/lib
/usr/local/sbin
/usr/local/share
/usr/local/var
/usr/local/opt
/usr/local/share/zsh
/usr/local/share/zsh/site-functions
/usr/local/var/homebrew
/usr/local/var/homebrew/linked
/usr/local/Cellar
/usr/local/Caskroom
/usr/local/Homebrew
/usr/local/Frameworks
==> The Xcode Command Line Tools will be installed.
```

后边还会有一些提示。继续的话会提示输入密码，等待安装完成。

安装完成后输入 `brew -v` 即可显示是否安装成功：

```undefined
Homebrew 2.1.9
Homebrew/homebrew-core (git revision 84988; last commit 2019-07-29)
```

## 2、手动安装

执行如下命令：

```cpp
mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
```

避免以下两点：

目录内包含空格
 不要安装在 `/sw` 或者 `/opt/local` 目录下
 当然也可以手动下载安装脚本，然后修改 `HOMEBREW_PREFIX` 变量的值，改为自己的安装目录。

------

# brew常用命令

## 1、安装卸载软件

```bash
1. `brew --version` 或者 `brew -v` 显示brew版本信息
2. `brew install <formula>` 安装指定软件
3. `brew uninstall <formula>` 卸载指定软件
4. `brew list` 显示所有的已安装的软件
5. `brew search text` 搜索本地远程仓库的软件，已安装会显示绿色的勾
6. `brew search /text/` 使用正则表达式搜软件
7. `brew info <formula>` 显示指定软件信息
8. `brew reinstall <formula>` 重新安装指定软件，先卸载后安装
9. `brew install <formula> --build-from-source` 源码安装指定软件，可以给定指定参数
10. `brew commands`  列出所有可用命令
11. brew link <apps> 添加路径
```

## 2、升级软件相关

```bash
1. `brew update` 自动升级homebrew （从github下载最新版本）
2. `brew outdated` 检测已经过时的软件
3. `brew upgrade` 升级所有已过时的软件，即列出的以过时软件
4. `brew upgrade <formula>` 升级指定的软件
5. `brew pin <formula>` 禁止指定软件升级
6. `brew unpin <formula>` 解锁禁止升级
7. `brew upgrade --all` 升级所有的软件包，包括未清理干净的旧版本的包
8. `brew edit <formula>` 编辑软件，不会的情况下慎用
9. `brew tap` 列出本地资源仓库，其中 homebrew 是默认仓库，其它都是第三方仓库
10. `brew tap <user/repo>` 添加第三方仓库，命名的规则按照github来定的。[使用](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.brew.sh%2FTaps)
11. `brew untap <user/repo>`  删除仓库
12. `brew deps <formula>` 查看指定软件依赖于哪些软件
13. `brew uses <formula>` 查看指定软件被哪些软件所依赖
```



## 3、清理相关

```bash
homebrew再升级软件时候不会清理相关的旧版本，在软件升级后我们可以使用如下命令清理

1. `brew cleanup -n` 列出需要清理的内容
2. `brew cleanup <formula>` 清理指定的软件过时包
3. `brew cleanup` 清理所有的过时软件
4. `brew unistall <formula>` 卸载指定软件
5. `brew unistall <fromula> --force` 彻底卸载指定软件，包括旧版本

通过brew安装的文件会自动设置环境变量，所以不用担心命令行不能启动的问题。
 比如安装好了gradle，即可运行 `gradle -v`
```



## 3、brew services管理后台服务

macOS使用 `launchctl` 命令加载开机自动运行的服务，`brew service` 可以简化 `lauchctl` 的操作。

以MySQL为例，使用launchctl启动:



```ruby
ln -sfv /usr/local/opt/mysql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
```

如使用 `brew service` 可以简化为:

```undefined
brew services start mysql
```

- services 常用命令

```bash
brew services list  # 查看使用brew安装的服务列表

brew services run formula|--all  # 启动服务（仅启动不注册）

brew services start formula|--all  # 启动服务，并注册

brew services stop formula|--all   # 停止服务，并取消注册

brew services restart formula|--all  # 重启服务，并注册

brew services cleanup  # 清除已卸载应用的无用的配置
```

- 配置文件目录

```ruby
/Library/LaunchDaemons # 开机自启，需要sudo
~/Library/LaunchAgents # 用户登录后自启
```

以homebrew.mxcl.kafka.plist为例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>homebrew.mxcl.kafka</string>
    <key>WorkingDirectory</key>
    <string>/usr/local</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/opt/kafka/bin/kafka-server-start</string>
        <string>/usr/local/etc/kafka/server.properties</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardErrorPath</key>
    <string>/usr/local/var/log/kafka/kafka_output.log</string>
    <key>StandardOutPath</key>
    <string>/usr/local/var/log/kafka/kafka_output.log</string>
</dict>
</plist>
```

在这里可以找到服务路径、启动参数、日志路径等

## 4、brew cask

Homebrew Cask 是 Homebrew 的扩展，借助它可以方便地在 macOS 上安装图形界面程序，即我们常用的各类应用。Homebrew 中文含义为自制、自酿酒，Cask 中文含义为桶、木桶，桶装酒是一种成品，也就是说每一个 homebrew cask 都可以直接使用的，比如 Atom 的 Cask 名称为 atom，那么就可以使用如下命令安装：

```bash
brew cask install atom
```

甚至也可以提交新的 Cask，比如假设有桌面客户端少数派，则用 `brew cask create sspai` 创建新的名称为 `sspai` 的 Cask，当然还要提供官网下载链接、官方主页、应用版本等信息，可以参照 [官方教程](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FHomebrew%2Fhomebrew-cask%2Fblob%2Fmaster%2FCONTRIBUTING.md)，此处就不再细说。

> **安装 Homebrew Cask【以后新版不需要安装】**
>  安装好brew 后，就可以执行命令 `brew tap caskroom/cask` 获取 Homebrew Cask。
>
> **注意：**
>  Caskroom 的 Git 地址在 2018 年 5 月 25 日从 [https://github.com/caskroom/homebrew-cask](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fcaskroom%2Fhomebrew-cask) 迁移到了 [https://github.com/Homebrew/homebrew-cask](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FHomebrew%2Fhomebrew-cask)
>  所以，以后就不需要安装 Homebrew Cask

#### 使用 Homebrew Cask

```bash
github使用：[https://github.com/Homebrew/homebrew-cask/blob/master/USAGE.md](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FHomebrew%2Fhomebrew-cask%2Fblob%2Fmaster%2FUSAGE.md)

1. `brew cask install <formula>`  安装指定图形界面软件
2. `brew cask uninstall <formula>`   卸载软件
3. `brew cask uninstall --force <formula>`   卸载软件，带参数
4. `brew cask search text`   搜索软件
5. `brew cask list`   列出所有通过cask安装的软件
6. 其它可以参考：[https://github.com/Homebrew/homebrew-cask/blob/master/USAGE.md](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FHomebrew%2Fhomebrew-cask%2Fblob%2Fmaster%2FUSAGE.md)

举例可安装的软件
```



```bash
# 安装chrome
brew cask install google-chrome

# 安装LaunchRocket
brew cask install launchrocket
```

------

# Homebrew 更换为国内镜像

查看镜像地址



```bash
➜  ~ cd "$(brew --repo)" 
➜  Homebrew git:(stable) pwd
/usr/local/Homebrew
➜  Homebrew git:(stable) git remote -v
origin  https://github.com/Homebrew/brew (fetch)
origin  https://github.com/Homebrew/brew (push)
```

## 1、国内镜像安装

- 获取官网脚本 并保存名为 brew_install；



```cpp
curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install >> brew_install
```

- 编辑brew_install文件，更改脚本中的资源链接，替换成 *中国科学技术大学* 的镜像



```objectivec
#BREW_REPO = "https://github.com/Homebrew/brew".freeze
BREW_REPO = "git://mirrors.ustc.edu.cn/brew.git".freeze
```

- 安装brew

```undefined
/usr/bin/ruby ./brew_install
```

## 2、Homebrew替换为[中科大源](https://links.jianshu.com/go?to=https%3A%2F%2Fmirrors.ustc.edu.cn%2F)

- Homebrew 源使用帮助 [http://mirrors.ustc.edu.cn/help/brew.git.html](https://links.jianshu.com/go?to=http%3A%2F%2Fmirrors.ustc.edu.cn%2Fhelp%2Fbrew.git.html)
- Homebrew Core 源使用帮助 [http://mirrors.ustc.edu.cn/help/homebrew-core.git.html](https://links.jianshu.com/go?to=http%3A%2F%2Fmirrors.ustc.edu.cn%2Fhelp%2Fhomebrew-core.git.html)
- Homebrew Cask 源使用帮助 [http://mirrors.ustc.edu.cn/help/homebrew-cask.git.html](https://links.jianshu.com/go?to=http%3A%2F%2Fmirrors.ustc.edu.cn%2Fhelp%2Fhomebrew-cask.git.html)
- Homebrew Bottles 源使用帮助 [http://mirrors.ustc.edu.cn/help/homebrew-bottles.html](https://links.jianshu.com/go?to=http%3A%2F%2Fmirrors.ustc.edu.cn%2Fhelp%2Fhomebrew-bottles.html)

### 替换默认源

- 替换brew.git

```bash
cd "$(brew --repo)"     # 其实就是定位至 /usr/local/Homebrew 目录下
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
# git remote set-url origin git://mirrors.ustc.edu.cn/brew.git

# 重置为官方地址：
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git
```

- 替换homebrew-core.git

```bash
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
# git remote set-url origin git://mirrors.ustc.edu.cn/homebrew-core.git

# 重置为官方地址：
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core
```

- 默认不安装cask 有需要的可以替换
   [Homebrew cask 软件仓库，提供 macOS 应用和大型二进制文件]

```bash
cd "$(brew --repo)"/Library/Taps/homebrew/homebrew-cask
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
# git remote set-url origin git://mirrors.ustc.edu.cn/homebrew-cask.git

# 重置为官方地址：
cd "$(brew --repo)"/Library/Taps/homebrew/homebrew-cask
git remote set-url origin https://github.com/Homebrew/homebrew-cask
```

- brew 更新



```undefined
brew update
```

- 检查是否有误

```undefined
brew doctor
```

### 替换Homebrew Bottles源

- bash用户

```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

- zsh用户

```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc
```

## 3、Homebrew替换为[清华大学源](https://links.jianshu.com/go?to=https%3A%2F%2Fmirrors.tuna.tsinghua.edu.cn%2Fhelp%2Fhomebrew%2F)

### 替换默认源

- 替换现有上游

```bash
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

brew update
```

- 复原

```bash
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core

brew update
```

### 替换Homebrew Bottles源

- bash用户



```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

- zsh用户



```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc
```

> 中科大源 和 清华大学源 其实在操作上是一样的，而本文档分了两部份整理，是为了区分 和更容易理解

# 常用软件安装

## ccat 安装（查看工具）

```undefined
brew install ccat
```

添加快捷方式

```bash
# 修改配置
vi ~/.zshrc
# 底部添加（覆盖掉之前的 cat功能。最好不要有换行）
alias cat=ccat
```

## git 安装（git插件）

```undefined
brew install tig
```

```bash
# 在git项目下 输入
tig

# 进入tig界面，上下键选择提交的信息
# 按住 cmd 按键查看
# q 键退出
```

#### 安装常用的开发包

```bash
brew install wget watch tmux cmake openssl imagemagick graphicsmagick gearman geoip readline autoconf multitail source-highlight autojump zsh-completions sshfs
```

#### 安装常用的软件

```undefined
brew cask install firefox google-chrome  thunder qq phpstorm sublime-text

brew cask install alfred appcleaner  sequel-pro sketch mplayerx
```