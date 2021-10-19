#!/usr/bin/env sh
# 返回到上一次的工作目录
echo "回到刚才工作目录"

# 保存所有的修改
echo "执行命令：git add -A"
git add ./

# 把修改的文件提交
echo "执行命令：commit -m 'deploy'"
git commit -m 'deploy'

git remote add origin https://gitee.com/lunasaw/blog.git
git remote add github git@github.com:lunasaw/blog.git
#git push -f https://github.com/lunasaw/luna-blog.git master:gh-pages
# git push -f http://github.z01.com/waipo/waipo.git master:gh-pages
git push -f github master
git push -f origin  master