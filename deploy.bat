@echo off
git init
git add -A
git commit -m 'auto-deploy'
git remote add origin https://gitee.com/luna_nov/blog.git
git remote add github https://github.com/czy1024/blog.git

git pull
git push --force origin HEAD:master
git push --force github HEAD:master
REM To delete the dist folder

echo Auto-Deploy-Complete!
pause
echo Auto-Deploy-Complete!
pause