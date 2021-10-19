---
title: git-clean
date: 2021-06-17 15:29:26
banner_img: /img/git.jpg
index_img: /img/git.png
sidebar: 'auto'
isShowComments: true
tags: 
 - git
categories:
 - basic-component
 - git
---

# Git仓库删除大文件

## 背景

当用Git久了，难免会手误或临时添加一些大文件到仓库中，即使以后添加进了.gitignore，甚至做了git rm，但是Git为了保证版本可回退，history pack里面依然会存储这些对象，这个时候我们就要为Git仓库进行瘦身。

或者不是大文件的情况，有时我们需要删除掉一些敏感信息文件，比如password.txt，即使回退也无法找到敏感文件，要实现这个要求，也要对history pack进行清理。

**清理主要做如下一些事情：**

1. 寻找想要彻底清理的文件路径
2. 查询这个文件第一次出现的提交
3. 从第一次出现的提交开始清理，重写之后的所有提交，保证该文件在history中完全抹除
4. 清理掉相关的引用，以及log信息
5. 重新打包所有对象
6. 推送至远程仓库以应用更新

所以做完了清理之后，既能够保证Git还可以正常回溯，分支，tag，历史变更这些都还保留；又能够完全清理掉指定的文件。

### 操作思路

下面有2种途径达到目的

1. 可以使用BFG工具，操作简单，链接为：https://rtyley.github.io/bfg-repo-cleaner/
2. 如果喜欢自己倒腾，可以使用原生git命令组合实现，主要用到git filter-branch，其实BFG也是对该命令的封装

### 详细步骤

以第2种途径来达成目的，亲测可用，场景为 我在几个月前推送了一批镜像文件到仓库中，虽然git rm移除了，但history pack中依然保留了数据 。汗…

以下步骤均在工程根目录下操作

1. 寻找大文件是哪些

镜像已经移除掉了，我需要寻找到它们曾经在哪里。以下命令罗列出整个仓库中前10个最大文件对象。该命令运行需要等待一段时间

```
$ git verify-pack -v .git/objects/pack/pack-43035f03d78ed39da647d4685e427bd126209bdb.idx | sort -k 3 -n | tail -10
e28b267b24de7d5b32ed2391669df8a72e24257d blob   162449408 62757122 757958127
c32c8b1da1c6283b250402aa31cde35051a52b3d blob   177733120 59785053 1360726301
711c9b581771981c54b4637497ceeb4bb23012bd blob   188976128 70107988 2347396900
d5cb26ac04328a255e922a24ea271ee50901c59d blob   196414976 74351707 1500585499
f93b48272597886796fc03d54e281f2403bea5ed blob   199080448 44716221 1455869278
247b35b36ef4c9f980c8cf967712788539980e5d blob   244180480 88897974 820715249
71848a6b5cb31639f8770553ddf6222573755d3d blob   414519296 140712921 100780869
d69f7af4727d15ee563aead6eff1d8baff61105d blob   1295518720 427812890 330145237
a3a36f25a9c3d610cb4d4eea381314ecf7b1510d blob   1324011520 443360428 909613223
c32670dfb49ae6a5948517fb6d19f78812a840ad blob   1802148352 617108853 1730288047
```

2.查找对应路径

发现e28b267b24de7d5b32ed2391669开头的对象最大，我们来看看它指代了哪个路径

```
$ git rev-list --objects --all | grep e28b267b24de7d5b32ed2391669
e28b267b24de7d5b32ed2391669df8a72e24257d backEnd/vendor/history/dockerimages/fabric-baseos
```

3.查找第一次出现该文件的log

从上个命令找到了大文件的曾经存在过的路径，现在查找log看看第一次提交该文件的版本号，结果列表里面最下面一个即为第一次，例如下面的722113f8a88。其实这一步不是必须的，因为清理可以从头清理到尾，全面覆盖。

```
$ git log --pretty=oneline --branches -- backEnd/vendor/history/dockerimages/fabric-baseos
486eac3085e25e9cec8c2de35c1e09cf79a5134e update
5fb74121be3fe311428068dd02837406a5d8f173 update
1380ead7f038a4b23add4fd64e9b66cb678cd6b5 commit something
a49db09fb148aabf51223d73fbcdb71e103610a0 update
722113f8a88e03cafebe7bbfcb6de20ffb068387 push
```

4.开始清理history

```
$ git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch backEnd/vendor/ILIOS/dockerimages/fabric-baseos' --prune-empty --tag-name-filter cat -- --all
Rewrite 6aeecaec3cfb419313bfb5516048b0979a6f284f (236/251) (11 seconds passed, rRewrite 2e5b34a51afb5a43f6b5d3e4400bfa0400629a4e (236/251) (11 seconds passed, rRewrite 914c89a1ea1e325f8be990c47cb71eaf88c29649 (236/251) (11 seconds passed, remaining 0 predicted)
WARNING: Ref 'refs/heads/branch1' is unchanged
WARNING: Ref 'refs/heads/master' is unchanged
Ref 'refs/heads/branch2' was rewritten
WARNING: Ref 'refs/remotes/origin/master' is unchanged
WARNING: Ref 'refs/remotes/origin/branch1' is unchanged
WARNING: Ref 'refs/remotes/origin/master' is unchanged
Ref 'refs/remotes/origin/branch2' was rewritten
```

5.清理所有废弃的引用

```

git verify-pack -v .git/objects/pack/pack-7b03cc896f31b2441f3a791ef760bd28495697e6.idx \
| sort -k 3 -n \
| tail -10
git rev-list --objects --all | grep 185ab8d
git log --pretty=oneline --branches -- spark-assembly-1.3.1-hadoop2.4.0.jar
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch spark-assembly-1.3.1-hadoop2.4.0.jar' \
--prune-empty --tag-name-filter cat -- --all
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now
git count-objects -v
git push origin --force --all
```
