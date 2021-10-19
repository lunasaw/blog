#!/usr/bin/env sh
echo '开始执行命令'

# 进入生成的文件夹
cd public

# 初始化一个仓库，仅仅是做了一个初始化的操作，项目里的文件还没有被跟踪
echo "执行命令：git init\n"
git init

# 保存所有的修改
echo "执行命令：git add -A"
git add -A

# 把修改的文件提交
echo "执行命令：commit -m 'deploy'"
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git remote add origin https://gitee.com/lunasaw/blog.git
git remote add github git@github.com:lunasaw/blog.git
#git push -f https://github.com/lunasaw/luna-blog.git master:gh-pages
# git push -f http://github.z01.com/waipo/waipo.git master:gh-pages
git push -f github master:gh-page
git push -f origin  master:gh-pages


cd ../
rm -rf public