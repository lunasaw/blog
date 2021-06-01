---
title: linux crontabs
date: 2020-12-24
banner_img: /img/linux.jpg
index_img: /img/linux.jpg
tags: 
 - linux
categories:
 - system
 - linux
---

## 格式说明与范例

 

![img](https://images2015.cnblogs.com/blog/513841/201608/513841-20160812102124078-171184924.png)

*   *   *   *   *    command

分　 时　  日　 月     周　     命令

 ```bash
  第1列表示分钟1～59 每分钟用*或者 */1表示
  第2列表示小时1～23（0表示0点）
  第3列表示日期1～31
  第4列表示月份1～12
  第5列标识号星期0～6（0表示星期天）
  第6列要运行的命令
 ```

在以上各个字段中，还可以使用以下特殊字符：

星号（*）：代表所有可能的值，例如month字段如果是星号，则表示在满足其它字段的制约条件后每月都执行该命令操作。

逗号（,）：可以用逗号隔开的值指定一个列表范围，例如，“1,2,5,7,8,9”

中杠（-）：可以用整数之间的中杠表示一个整数范围，例如“2-6”表示“2,3,4,5,6”

正斜线（/）：可以用正斜线指定时间的间隔频率，例如“0-23/2”表示每两小时执行一次。同时正斜线可以和星号一起使用，例如*/10，如果用在minute字段，表示每十分钟执行一次。

```bash
安装crontab：

yum install crontabs || apt-get install crontab

服务操作说明：

/sbin/service crond start //启动服务

/sbin/service crond stop //关闭服务

/sbin/service crond restart //重启服务

/sbin/service crond reload //重新载入配置

查看crontab服务状态：

service crond status

手动启动crontab服务：

service crond start

查看crontab服务是否已设置为开机启动，执行命令：

ntsysv

加入开机自动启动：

chkconfig –level 35 crond on

基础命令：

-e 表示编辑当前的crontab

-l 表示列表显示当前的crontab任务

-r 表示删除当前用户的crontab

-i 表示删除crontab时给予提示信息
```

## 使用实例

```bash
Cron表达式范例：
             每隔5秒执行一次：*/5 * * * * ?
 
             每隔1分钟执行一次：0 */1 * * * ?
 
             每天23点执行一次：0 0 23 * * ?
 
             每天凌晨1点执行一次：0 0 1 * * ?
 
             每月1号凌晨1点执行一次：0 0 1 1 * ?
 
             每月最后一天23点执行一次：0 0 23 L * ?
 
             每周星期天凌晨1点实行一次：0 0 1 ? * L
1、每天6:00执行
 
0 6 * * * root /home/mvp/osyunwei.sh
 
2、每周六凌晨4:00执行
 
0 4 * * 6 root /home/mvp/osyunwei.sh
 
3、每周六凌晨4:05执行
 
5 4 * * 6 root /home/mvp/osyunwei.sh 
 
4、每周六凌晨4:15执行
 
15 4 * * 6 root /home/mvp/osyunwei.sh
 
5、每周六凌晨4:25执行
 
25 4 * * 6 root /home/mvp/osyunwei.sh
 
6、每周六凌晨4:35执行
 
35 4 * * 6 root /home/mvp/osyunwei.sh
 
7、每周六凌晨5:00执行
 
5 * * 6 root /home/mvp/osyunwei.sh
 
8、每天8:40执行
 
40 8 * * * root /home/mvp/osyunwei.sh
 
9、每天8:30执行
 
30 8 * * * root /home/mvp/osyunwei.sh
 
10、每周一到周五的11:41开始，每隔10分钟执行一次    #值得借鉴
 
41,51 11 * * 1-5   root /home/mvp/osyunwei.sh
 
或者
 
1-59/10 12-23 * * 1-5   root /home/mvp/osyunwei.sh
 
11、在每天的10:31开始，每隔2小时重复一次
 
31 10-23/2 * * * root   /home/mvp/osyunwei.sh
 
12、每天15:00执行
 
0 15 * * *  root /home/mvp/osyunwei.sh
 
13、每天的10:30开始，每隔2小时重复一次
 
30 10-23/2 * * * root  /home/mvp/osyunwei.sh
 
14、每天15:30执行
 
30 15 * * *  root /home/mvp/osyunwei.sh
 
15、每天17:50执行
 
50 17 * * *  root /home/mvp/osyunwei.sh
 
16、每天8:00执行
 
0 8 * * *  root  /home/mvp/osyunwei.sh
 
17、每天18:00执行
 
0 18 * * *  root  /home/mvp/osyunwei.sh
 
18、每天8:30执行
 
30 8 * * *  root  /home/mvp/osyunwei.sh
 
19、每天20:30
 
30 20 * * *  root /home/mvp/osyunwei.sh
 
20、每周一到周五2:00
 
0 2 * * 1-5 root /home/mvp/osyunwei.sh
 
21、每周一到周五9:30
 
30 9 * * 1-5 root /home/mvp/osyunwei.sh
 
22、每周一到周五8:00，每周一到周五9:00
 
0 8,9 * * 1-5  root /home/mvp/osyunwei.sh
 
23、每天23:59
 
59 23 * * *  root  /home/mvp/osyunwei.sh
 
24、每周六23:59
 
59 23 * * 6  root    /home/mvp/osyunwei.sh
 
25、每天0:30
 
30 0 * * *  root  /home/mvp/osyunwei.sh
 
26、每周一到周五9:25到11:35之间、13:00到15:00之间，每隔10分钟运行一次
 
分区段写值得借鉴
 
25,35,45,55  9 * * 1-5  root   /home/mvp/osyunwei.sh
 
5-59/10  10 * * 1-5  root   /home/mvp/osyunwei.sh
 
5,15,25,35  11 * * 1-5  root   /home/mvp/osyunwei.sh
 
*/10  13-15 * * 1-5  root   /home/mvp/osyunwei.sh
 
27、每周一到周五8:30、8:50、9:30、10:00、10:30、11:00、11:30、13:30、14:00、14:30、5:00分别执行一次
 
30,50 8 * * 1-5  root  /home/mvp/osyunwei.sh
 
30 9 * * 1-5  root  /home/mvp/osyunwei.sh
 
*/30 10-11 * * 1-5  root  /home/mvp/osyunwei.sh
 
30 13 * * 1-5  root  /home/mvp/osyunwei.sh
 
0,30 14-15 * * 1-5  root  /home/mvp/osyunwei.sh
 
28、每天23:50执行
 
50 23 * * *  root  /home/mvp/osyunwei.sh
 
29、每天10:00、16:00执行
 
0 10,16 * * *  root /home/mvp/osyunwei.sh
 
30、每天5:30执行
 
30 5 * * *  root  /home/mvp/osyunwei.sh
 
31、每周一到周五9:30执行
 
30 9 * * 1-5  root  /home/mvp/osyunwei.sh
 
32、每周一到周五13:00执行
 
0 13 * * 1-5  root  /home/mvp/osyunwei.sh
 
33、每天7:51执行
 
51 7 * * *  root /home/mvp/osyunwei.sh
 
34、每天7:53、12:40分别执行一次
 
53 7 * * *  root /home/mvp/osyunwei.sh
 
40 12 * * *  root /home/mvp/osyunwei.sh
 
35、每天7:55执行
 
55 7 * * *  root  /home/mvp/osyunwei.sh
 
36、每天8:10、16:00、20:00分别执行一次
 
10 8 * * *  root  /home/mvp/osyunwei.sh
 
0 16 * * *  root  /home/mvp/osyunwei.sh
 
0 20 * * *  root  /home/mvp/osyunwei.sh
 
37、每天7:57、8:00分别执行一次
 
57 7 * * *  root  /home/mvp/osyunwei.sh
 
0 8 * * *  root  /home/mvp/osyunwei.sh
 
             在26分、29分、33分执行一次：0 26,29,33 * * * ?
 
             每天的0点、13点、18点、21点都执行一次：0 0 0,13,18,21 * * ?
 
实例1：每1分钟执行一次command
 
命令：
 
* * * * * command
 
 
 
实例2：每小时的第3和第15分钟执行
 
命令：
 
3,15 * * * * command
 
 
 
实例3：在上午8点到11点的第3和第15分钟执行
 
命令：
 
3,15 8-11 * * * command
 
 
 
实例4：每隔两天的上午8点到11点的第3和第15分钟执行
 
命令：
 
3,15 8-11 */2 * * command
 
 
 
实例5：每个星期一的上午8点到11点的第3和第15分钟执行
 
命令：
 
3,15 8-11 * * 1 command
 
 
 
实例6：每晚的21:30重启smb 
 
命令：
 
30 21 * * * /etc/init.d/smb restart
 
 
 
实例7：每月1、10、22日的4 : 45重启smb 
 
命令：
 
45 4 1,10,22 * * /etc/init.d/smb restart
 
 
 
实例8：每周六、周日的1 : 10重启smb
 
命令：
 
10 1 * * 6,0 /etc/init.d/smb restart
 
 
 
实例9：每天18 : 00至23 : 00之间每隔30分钟重启smb 
 
命令：
 
0,30 18-23 * * * /etc/init.d/smb restart
 
 
 
实例10：每星期六的晚上11 : 00 pm重启smb 
 
命令：
 
0 23 * * 6 /etc/init.d/smb restart
 
 
 
实例11：每一小时重启smb 
 
命令：
 
* */1 * * * /etc/init.d/smb restart
 
 
 
实例12：晚上11点到早上7点之间，每隔一小时重启smb 
 
命令：
 
* 23-7/1 * * * /etc/init.d/smb restart
 
 
 
实例13：每月的4号与每周一到周三的11点重启smb 
 
命令：
 
0 11 4 * mon-wed /etc/init.d/smb restart
 
 
 
实例14：一月一号的4点重启smb 
 
命令：
 
0 4 1 jan * /etc/init.d/smb restart
 
实例15：每小时执行/etc/cron.hourly目录内的脚本
 
命令：
 
01   *   *   *   *     root run-parts /etc/cron.hourly
 
说明：
 
run-parts这个参数了，如果去掉这个参数的话，后面就可以写要运行的某个脚本名，而不是目录名了
 
```

## 三、其他问题

####  注意环境变量问题

有时我们创建了一个crontab，但是这个任务却无法自动执行，而手动执行这个任务却没有问题，这种情况一般是由于在crontab文件中没有配置环境变量引起的。

在crontab文件中定义多个调度任务时，需要特别注意的一个问题就是环境变量的设置，因为我们手动执行某个任务时，是在当前shell环境下进行的，程序当然能找到环境变量，而系统自动执行任务调度时，是不会加载任何环境变量的，因此，就需要在crontab文件中指定任务运行所需的所有环境变量，这样，系统执行任务调度时就没有问题了。

不要假定cron知道所需要的特殊环境，它其实并不知道。所以你要保证在shelll脚本中提供所有必要的路径和环境变量，除了一些自动设置的全局变量。所以注意如下3点：

1）脚本中涉及文件路径时写全局路径；

2）脚本执行要用到java或其他环境变量时，通过source命令引入环境变量，如：

```bash
cat start_cbp.sh

\#!/bin/sh

source /etc/profile

export RUN_CONF=/home/d139/conf/platform/cbp/cbp_jboss.conf

/usr/local/jboss-4.0.5/bin/run.sh -c mev &
```

3）当手动执行脚本OK，但是crontab死活不执行时。这时必须大胆怀疑是环境变量惹的祸，并可以尝试在crontab中直接引入环境变量解决问题。如：

0 * * * * . /etc/profile;/bin/sh /var/www/java/audit_no_count/bin/restart_audit.sh

#### 注意清理系统用户的邮件日志

每条任务调度执行完毕，系统都会将任务输出信息通过电子邮件的形式发送给当前系统用户，这样日积月累，日志信息会非常大，可能会影响系统的正常运行，因此，将每条任务进行重定向处理非常重要。

例如，可以在crontab文件中设置如下形式，忽略日志输出：

0 */3 * * * /usr/local/apache2/apachectl restart >/dev/null 2>&1

“/dev/null 2>&1”表示先将标准输出重定向到/dev/null，然后将标准错误重定向到标准输出，由于标准输出已经重定向到了/dev/null，因此标准错误也会重定向到/dev/null，这样日志输出问题就解决了。

#### 系统级任务调度与用户级任务调度

系统级任务调度主要完成系统的一些维护操作，用户级任务调度主要完成用户自定义的一些任务，可以将用户级任务调度放到系统级任务调度来完成（不建议这么做），但是反过来却不行，root用户的任务调度操作可以通过“crontab –uroot –e”来设置，也可以将调度任务直接写入/etc/crontab文件，需要注意的是，如果要定义一个定时重启系统的任务，就必须将任务放到/etc/crontab文件，即使在root用户下创建一个定时重启系统的任务也是无效的。

#### 其他注意事项

新创建的cron job，不会马上执行，至少要过2分钟才执行。如果重启cron则马上执行。

当crontab突然失效时，可以尝试/etc/init.d/crond restart解决问题。或者查看日志看某个job有没有执行/报错tail -f /var/log/cron。

千万别乱运行crontab -r。它从Crontab目录（/var/spool/cron）中删除用户的Crontab文件。删除了该用户的所有crontab都没了。

在crontab中%是有特殊含义的，表示换行的意思。如果要用的话必须进行转义\%，如经常用的date ‘+%Y%m%d’在crontab里是不会执行的，应该换成date ‘+\%Y\%m\%d’。	