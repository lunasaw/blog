---
title: redis
date: 2021-05-18 11:42:41
banner_img: /img/redis.png
index_img: /img/redis.jpg
tags: 
 - redis
categories:
 - java
 - middle-component
 - redis
---

前言：本篇文章主要是对于Redis官方配置文件的翻译，主要目的是便于自己了解Redis及分析为初学者提供配置文件的中文翻译。
英语水平有限，因此文中有诸多不恰当的地方，欢迎指正，同时本文去掉了官方文档中一些个人认为不那么重要的配置内容。



# Redis配置文件示例

Redis在启动的时候必须将配置文件的路径作为启动的参数，以便于能够正确读取配置文件。

```
./redis-server /path/to/redis.conf
```

内存大小单位：所有配置文件中内存大小的表示单位，一般的表现形式如下：

```
# 1k => 1000 bytes
# 1kb => 1024 bytes
# 1m => 1000000 bytes
# 1mb => 1024*1024 bytes
# 1g => 1000000000 bytes
# 1gb => 1024*1024*1024 bytes
```

并且内存大小表示单位是内存不敏感的，`1GB 1Gb 1gB`表示的含义相同。

# 1. 配置文件详解

## 1. INCLUDES

一个配置文件中可以包含一个或者多个其他的配置文件，主要是便于管理，类似于Spring中分为各个细的配置文件。
如果每个redis服务器有一个的标准配置模板，并且还需要为某些服务器设置特定的配置，则文件的相互包含十分有效。A包含B，B也可以包含C

被包含的文件不会被因为`CONFIG REWRITE`命令而重写。因为 Redis 始终使用最后一个处理过的命令行作为配置指令，因此最好将 被包含文件放在此文件的开头来避免在运行将配置覆盖。

相反，如果真的想使用 include 来覆盖配置选项，则最好使用 include 作为最后一行。

```
# include /path/to/local.conf
# include /path/to/other.conf
```

## 2.MODULES

启动时加载模块。如果服务器无法加载模块，该模块将会被废弃，也可以使用多个加载模块命令。
做redis功能扩展使用

```
# loadmodule /path/to/my_module.so
# loadmodule /path/to/other_module.so
```

## 3. NETWORK

默认情况下，如果未指定"bind"具体的配置指令，Redis将监听来自服务器上所有可用网络接口的连接请求。

可以使用"bind"配置指令仅监听一个或多个选定的接口，然后被一个或多个 特定的IP 地址连接。

默认情况下，如果不配置具体的ip，则链接服务器所有的网络接口，如果具体指出，则只连接具体的某一个ip。如果不绑定特定的ip，则会造成连接的不安全性。

```
# bind 192.168.1.100 10.0.0.1
# bind 127.0.0.1 ::1
```

注意点：如果运行redis的计算机直接对所有的网络开放，会使服务器十分危险，者会将服务器直接暴露给所有的互联网用户。
因此，默认情况下，会设置如下绑定指令，这将强制 Redis 仅侦听 IPv4接口地址（这意味着 Redis 只能接受来自运行在同一台计算机的客户端连接）

```
bind 127.0.0.1 ::1                      // 注释这一行将会允许redis被所有计算机连接
```

### 设置连接模式是否安全

保护模式是一层安全保护，以避免在 Redis 实例被 Internet 上所有用户访问和利用。

以下两种情况会导致保护模式开启：

1. redis服务器没有直接绑定任何的地址
2. 没有设置登录密码

保护模式默认是开启的，如果确认想关闭时，则只需要将保护模式设置为no

```
protected-mode yes
```

### 设置redis连接端口号

设置可以连接的特定端口号，默认的端口是6379

```
port 6379
```

### 设置TCP连接的监听日志

设置Tcp的backlog，backlog其实是一个连接队列，backlog队列总和=未完成的三次握手队列+已完成的三次握手队列
在高并发下需要一个高backlog来避免慢客户端连接问题，linux内核会将这个值减少到`/proc/sys/net/core/somaxconn`
所以为了确保能保证得到想要结果，需要确认增大`somaxconn`和 `tcp_max_syn_backlog`

```
tcp-backlog 511
1
```

### 设置自动断开连接的时间

当客户端空闲多久时会自动断开连接，如果设置为0，则不会自动断开。

```
timeout 0
```

### 设置否是长连接

如果该值不设置为非零，在没有通信的情况下利用`SO_KEEPALIVE`发送tcp acks信息 给客户端，这样做的理由如下：

1. 检测已经挂掉的客户端
2. 从中间的网络设备的角度保证连接不中断。

在linux系统中，一定时间段内发送ACKS的数据量是特定的，
如果设置为0则不会进行keyalive检测，建议设置成300s

```
tcp-keepalive 300
```

## 4. GENERAL(通用设置)

### 设置是否后台运行

默认情况下，Redis不在后台运行，如果需要开启后台运行，则将下值设置为yes。
在后台运行的时候，Redis会写入到特定的pid文件，默认的文件地址为：`/usr/local/var/run/redis.pid`，如果关闭后台运行，则不写入该文件中。
设置是否后台程序，是否允许关闭doc窗口redis继续提供服务

```
 daemonize no
1
```

### 设置监控模式

如果将redis运行模式设置为`upstart`或者`systemd`模式，则redis可以与监控系统进行交互。
该参数可以设置的值为：

1. supervised no - 不设置监控模式
2. supervised upstart - signal upstart by putting Redis into SIGSTOP mode
3. supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
4. supervised auto - detect upstart or systemd method based on UPSTART_JOB or NOTIFY_SOCKET environment variables

设置是否需要监控，默认不开启监控模式

```
supervised no
```

### 指定pid文件的地址

如果指定pid文件的路径，Redis启动的时候会向该文件中写入信息，退出时则会删除该文件。
当redis服务器设置为不可以在后台运行，则启动的时候不会创建pid文件。如果redis服务器设置为后台运行，及时不指定pid文件的文件路径，也会按照默认的地址创建路径。如果不手动指定，则将其放置在`/usr/local/var/run/redis.pid`
创建pid文件是很有必要的：

如果redis不可以创建该文件，但没有其他坏事发生，redis服务器还是可以正常启动和运行。

```
pidfile /var/run/redis_6379.pid
1
```

### 指定服务器详细日志级别

具体的设置可以有:

1. debug (大量信息，有利于开发和测试)
2. verbose (很多相对有用的信息，但是日志量没有dug多)
3. notice (一般详细的信息，一般是生产中可能用到的) 默认级别
4. warning (只是监控一些非常重要或者关键的信息)

```
loglevel notice
```

### 指定日志文件的名称

指定日志文件的名称，会强制redis将日志按照标准输出到该文件中。如果后台按照标准文件的格式输出到日志文件，日志文件会默认放到`/dev/null`文件下

```
logfile "6381.log"
1
```

### 是否开启系统日志

如果想要打印系统日志，只需要将该值设置为yes即可，

```
syslog-enabled no
```

### 指定系统日志标志

```
syslog-ident redis
```

### 指定系统日志用途

指定系统日志用途,必须是`USER`或者是`LOCAL0-LOCAL7`

```
syslog-facility local0
```

### 设置数据库的数量

默认选择的数据库是`select 0`，选择的数据库必须数据`(0,'databases'-1)`

```
databases 16
```

### 是否展示启动时候的艺术log

```
always-show-logo yes
```

## 5. SNAPSHOTTING(快照)

主要是保证数据的持久化。
将数据保存到磁盘中，具体的设置模式
设置存储数据库的周期
设置的格式

```
save <seconds> <changes>
```

只要设置的任意一种情况发生，都会将redis中存储的数据写入到磁盘中

```
save 900 1                  900s中有一个key发生变化
save 300 10                 300s内有10个key发生变化
save 60 10000               60s内有10000个key发生变化
```

如果想禁用RDB，则需要设置成，并且注释掉上面的三个默认设置：

```
save ""
```

### 持久化出问题时是否允许写操作

在快照后台保存失败情况下，默认停止写操作，让用户意识到故障，否则没有注意到问题回到值故障产生。
如果已经建立的适当的监控，即使在后台快照备份失败时也执行写操作，则需要将其设置为no。

```
stop-writes-on-bgsave-error yes
1
```

### 是否压缩rdb文件

设置是否压缩`dump .rdb`文件，推荐开启，否则文件会越来越大。如果不想消耗cpu内存，则可以设置为no，但是这样的话日志文件会越来越大。

```
rdbcompression yes
```

### 是否开启数据校验

设置rdb checkSum是否跳过，是否进行数据校验。

```
rdbchecksum yes
```

### 设置rdb文件名

设置数据库dump文件的名称,每个操作都会记录到dump.rds中，重启服务器，客户端连接时会重新写入

```
dbfilename dump.rdb
```

### 设置工作目录

在该目录中，会存储数据库的写操作的rdb文件及AOF文件，这里只是指定文件夹路径，而不是具体的文件名称。

```
dir /usr/local/var/db/redis/
```

## 6. REPLICATION (主从复制)

对于redis的复制需要理解以下几点：
master主要接受写，slaver是对于master的精确复制。

1. redis主从同步是异步的，但是可以让在没有指定slave连接的情况下使master停止写入数据。
2. 连接中断一定时间内，如果复制缺失了一段时间内的数据，slave可以执行部分数据重新同步。
3. 同步是自动的，不需要人工接入，slave可以自动重连并且自动同步数据。

```
replicaof <masterip> <masterport>
```

### 设置master的链接密码

如果master链接需要密码(这个是通过`requirepass`控制)，则在创建slaver链接master时，在同步之前，需要确认密码，否则master服务器将会具体slaver的链接。

```
masterauth <master-password>

```

### 当slaver与master失去连接时，从机表现情况？

当一个slave失去和master的连接，或者同步正在进行中，slave的行为有两种可能：

1. 如果 `slave-serve-stale-data` 设置为 “yes” (默认值)，slave会继续响应客户端请求，可能是正常数据，也可能是还没获得值的空数据。
2. 如果 `slave-serve-stale-data` 设置为 “no”，slave会回复"正在从master同步（SYNC with master in progress）"来处理除了以下的其他各种请求：
   `INFO, replicaOF, AUTH, PING, SHUTDOWN, REPLCONF, ROLE, CONFIG, SUBSCRIBE, UNSUBSCRIBE, PSUBSCRIBE, PUNSUBSCRIBE, PUBLISH, PUBSUB, COMMAND, POST, HOST: and LATENCY.`

```
replica-serve-stale-data yes
```

### 配置slave是否接受写操作

可写的slave实例可能对存储临时数据比较有用(因为写入salve# 的数据在同master同步之后将很容被删除)，但是如果客户端由于配置错误在写入时也可能产生一些问题。

从redis 2.6 之后所有的slave都是只读的。

注：只读副本不会暴露给互联网上不受信任的客户端，防止redis被无用，加强保护。

```
replica-read-only yes
```

### 副本同步策略

**非磁盘复制目前处于试验阶段**
针对于新的slave或者重新链接的slave因为连接发生变化，无法继续备份过程，需要进行全同步的过程。从master同步到slave又两种方式：

1. Disk-backed(磁盘备份)：master创建一个新的进程专门用于将数据库写入到磁盘中，稍后通过父进程将该文件复制到slave节点中。
2. Diskless(非磁盘)：master创建一个新进程直接将RDB文件写入到slave中，不必在磁盘中创建文件。

设置同步的策略,默认为磁盘策略

```
repl-diskless-sync no
```

### 设置非磁盘同步的延迟时间

如果非磁盘同步方式开启，可以配置同步延迟时间，以等待master产生子进程通过socket传输RDB数据给slave。

默认值为5秒，设置为0秒则每次传输无延迟。

```
repl-diskless-sync-delay 5
```

### slaver给master发送ping请求的时间间隔

slave根据指定的时间间隔向master发送ping请求。默认10秒

```
repl-ping-replica-period 10
```

### 复制的超时时间

下列操作可能导致同步的超时：

1. slave在与master SYNC期间有大量数据传输，造成超时
2. 从slave观察，master超时，包括数据、ping等
3. 在master观察，slave超时，当master发送`REPLCONF ACK pings`

设置超时时间，该值不易设置过小，需要大于指定的repl-ping-slave-period，否则即使复制数据量不大时，也容易频繁出现超时情况。

```
repl-timeout 60
```

### 是否在slave套接字发送SYNC之后禁用 TCP_NODELAY？

```
repl-disable-tcp-nodelay no
```

1. 如果选择yes，Redis将使用更少的TCP包和带宽来向slaves发送数据。但是这将使数据传输到slave上有延迟，Linux内核的默认配置会达到40毫秒。
2. 如果选择no，数据传输到salve的延迟将会减少但要使用更多的带宽。
3. 默认我们会为**低延迟做优化**，但高流量情况或主从之间的跳数过多时，可以设置为“yes”。

### 设置数据备份的backlog大小

```
repl-backlog-size 1mb
```

1. backlog是一个slave在一段时间内断开连接时记录salve数据的缓冲，所以一个slave在重新连接时，不必要全量的同步，而是一个增量同步，将在断开连接的这段时间内把slave丢失的部分数据传送给它。
2. 同步的backlog越大，slave能够进行增量同步并且允许断开连接的时间就越长。
3. backlog只分配一次并且至少需要一个slave连接。

## 设置缓冲backlog超时时间

当master在一段时间内不再与任何slave连接，backlog将会释放。以下选项配置了从最后一个slave断开开始计时多少秒后，backlog缓冲将会释放。

0表示永不释放backlog

```
repl-backlog-ttl 3600
```

### 设置每个slave的优先级别

salver的优先级别是由Redis配置信息决定的整数，主要目的是：当master挂掉之后哨兵选择优先级别最低的slave去替换master，默认的优先级别为100。

例如有三个slave优先级分别为10，100，25，sentinel将挑选优先级最小数字为10的slave

然而，0作为一个特殊的优先级，标识这个slave不能作为master，所以一个优先级为0的slave永远不会被哨兵挑选提升为master。

系统默认的优先级别是100.

```
replica-priority 100
```

### 设置主机中断写操作的条件

如果master少于N个连接，延时小于等于M秒的已连接slave，就可以停止接收写操作。

例如至少需要3个延时小于等于10秒的slave用下面的指令

```
min-replicas-to-write 3
min-replicas-max-lag 10
```

两者之一设置为0将禁用这个功能，
两个值的默认值分别是：
默认`min-slaves-to-write` 值是0, 默认`min-slaves-max-lag`值是10。

### 设置slave ip及port

可以通过不同的方式查看Redis master服务器所连接的slaver的ip地址及端口号。
`INFO replication`命令可以查看主机及从机的集群信息;或者可以通过`ROLE`命令查看主机的一些配置。

```
replica-announce-ip 5.5.5.5
replica-announce-port 1234
```

## 7. SECURITY(安全)

一旦设置了密码，则需要再连接前先进行授权`AUTH <PASSWORD>`，但是大部分情况下都不需要设置密码的，因为Redis主要目的是保证性能。

### 查看设置的密码

```
CONFIG GET requirepass
```

### 设置客户端连接的密码

```
requirepass foobared
```

### 通过命令的方式设置密码

```
config set requirepass "password"
```

### 如果设置了密码则需要先通过如下命令认证

```
auth password
1
```

### 设置是否为命令重命名

```
rename-command CONFIG b840fc02d524045429941cc15f59e41cb7be6c52
```

或者通过以下设置直接警用某些命令

```
rename-command CONFIG ""
```

请注意：改变命令名字被记录到AOF文件或被传送到从服务器可能产生问题。

## 8. CLIENTS(客户端)

### 设置可以同时连接的最大客户端数

默认为10000，一旦达到了最大连接数，Redis会关闭所有先的连接请求，并且发送错误日志`max number of clients reached`

```
maxclients 10000
```

## 9. MEMORY MANAGEMENT(内存管理)

### 设置最大使用内存

不要使用比设置的上限更多的内存。
一旦内存使用达到上限，Redis会根据选定的回收策略删除key（参见：maxmemmory-policy）

如果Redis根据回收策略不能够删除key，Redis则会只处理读请求(比如get)，而写请求会直接报错(SET、LPUSH等等)

注意：

总之，如果你需要附加多个slave，建议你设置一个稍小maxmemory限制，这样系统就会有空闲的内存作为slave的输出缓存区(但是如果最大内存策略设置为"noeviction"的话就没必要了)

```
maxmemory <bytes>
1
```

### 内存管理策略

当内存达到最大时，如何删除key，根据以下策略

1. volatile-lru -> 根据LRU算法只删除设置过过期时间的key
2. allkeys-lru -> 根据LRU算法删除任何key
3. allkeys-lfu -> 根据LFU算法删除任何key
4. allkeys-random -> 随机移除任何key
5. volatile-ttl -> 移除最近刚过期的key
6. noeviction -> 不移除任何key，只返回一个写错误

**LRU means Least Recently Used
LFU means Least Frequently Used**

系统默认的内存管理策略：

```
maxmemory-policy noeviction
```

### 设置内存管理检查策略

LRU和最小TTL算法的实现都不是很精确，但是很接近算法（为了省内存），所以你可以用样本量做检测。

例如：默认Redis会检查5个key然后取最旧的那个，你可以通过下面的配置指令来设置样本的个数。默认值为5，数字越大结果越精确但是会消耗更多CPU。

```
maxmemory-samples 5
```

### 设置slave是否忽略最大内存限制

```
replica-ignore-maxmemory yes
```

## 10 .LAZY FREEING

redis删除key有两个方法

1. `DEL`，该命令是一个阻塞式。服务器停止处理新的命令，以便以同步方式回收与对象关联的所有内存，如果被删除的key与小对象相关联，则DEL命令需要时间和其他redis命令一样短，基本上属于O(1) or O(log_N)。相反，如果key关联的对象较大，则执行该命令所需时间较长。
2. 非阻塞命令。`UNLINK (non blocking DEL)、FLUSHALL、FLUSHDB` 执行该操作需要常量的时间，其他线程会在后台增量的释放内存。

上述的命令都是用户控制的，但是redis服务器在执行其他命令时可能会触发`DEL`或者`flush`，以下是几种常见的场景：

1. 由于最大内存策略，超过最大内存时为了给新数据提供内存，会删除key。
2. key过期而造成的删除。
3. 由于存储一些已经存在的key而造成的删除。比如`RENAME`命令，可能会删除旧的key。
4. 在主从复制期间，当副本与其主服务器执行完全重新同步时，将删除整个数据库的内容，以便加载刚刚传输的RDB文件。

上述的四个操作删除操作都是阻塞式的，可以在配置文件中为每种情况配置非阻塞式的删除操作。

```
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no
```

## 11. APPEND ONLY MODE(AOF方式持久化)

默认情况下，Redis以异步方式将数据集存储到磁盘上。这种模式在很多应用里已经足够好，但Redis进程出问题或断电时可能造成一段时间的写操作丢失(这取决于配置的save指令)。

AOF是一种提供了更可靠的替代持久化模式，例如使用默认的数据写入文件策略（参见后面的配置）。在遇到像服务器断电或单写情况下Redis自身进程出问题但操作系统仍正常运行等突发事件时，Redis能只丢失1秒的写操作。

AOF和RDB持久化能同时启动并且不会有问题。如果AOF开启，那么在启动时Redis将加载AOF文件，它更能保证数据的可靠性，如果aof文件损坏，则redis则会启动失败。

### 开启AOF

可以通过以下方式开启AOF

```
appendonly yes
```

### 设置aof文件名

默认为`appendonly.aof`

```
appendfilename "appendonly.aof"
```

### 设置备份数据到磁盘的频率

fsync() 系统调用告诉操作系统把数据写到磁盘上，而不是等更多的数据进入输出缓冲区。有些操作系统会真的把数据马上刷到磁盘上；有些则会尽快去尝试这么做。

Redis支持三种不同的模式：

1. no：不要立刻存储，只有在操作系统需要刷的时候再存储。比较快。
2. always：每次写操作都立刻写入到aof文件。慢，但是最安全。
3. everysec：每秒写一次。折中方案。

默认的 “everysec” 通常来说能在速度和数据安全性之间取得比较好的平衡。

```
appendfsync always

appendfsync everysec

appendfsync no
```

### 同步时重写

如果AOF的同步策略设置成 “always” 或者 “everysec”，并且后台的存储进程（后台存储或写入AOF 日志）会产生很多磁盘I/O开销。某些Linux的配置下会使Redis因为 fsync()系统调用而阻塞很久。注意，目前对这个情况还没有完美修正，甚至不同线程的 fsync() 会阻塞我们同步的write(2)调用。

为了缓解这个问题，可以用下面这个选项。它可以在 `BGSAVE` 或`BGREWRITEAOF` 处理时阻止`fsync()`。

这就意味着如果有子进程在进行保存操作，那么`Redis`就处于"不可同步"的状态。这实际上是说，在最差的情况下可能会丢掉30秒钟的日志数据。（默认`Linux`设定）

如果把这个设置成"yes"带来了延迟问题，保存持久数据的最安全的方式将下面命令设置为no，

```
no-appendfsync-on-rewrite no
1
```

### 何时自动重写AOF文件

如果AOF日志文件增大到指定百分比，Redis能够通过 `BGREWRITEAOF` 自动重写AOF日志文件。

工作原理：Redis记住上次重写时AOF文件的大小（如果重启后还没有写操作，就直接用启动时的AOF大小）

这个基准大小和当前大小做比较。如果当前大小超过指定比例，就会触发重写操作。你还需要指定被重写日志的最小内存，这样有利于避免达到指定百分比但仍然很小的情况还要重写。

指定百分比为0时，会禁用AOF自动重写特性。

```
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
```

### 被截断的aof文件是否允许启动

如果设置为yes，如果一个因异常被截断的AOF文件被redis启动时加载进内存，redis将会发送日志通知用户。如果设置为no，redis将会拒绝启动。此时需要用"redis-check-aof"工具修复文件。

```
aof-load-truncated yes
1
```

## 12. LUA脚本

Lua脚本的最长执行时间（以毫秒为单位）

```
lua-time-limit 5000
```

## 13. REDIS CLUSTER（REDIS集群）

### 是否开启集群

正常的Redis实例不会成为Redis集群的一部分。只有开启了以下选项，redis才能成为集群服务的一部分

```
cluster-enabled yes
```

### 设置集群的配置文件

每个集群节点都有一个集群配置文件，配置redis自动生成的集群配置文件名。确保同一系统中运行的各redis实例该配置文件不要重名。

```
cluster-config-file nodes-6379.conf
1
```

### 集群节点超时毫秒数。

超时的节点将被视为不可用状态。

```
cluster-node-timeout 15000
```

如果数据太旧，集群中的不可用master的slave节点会避免成为备用master。如果slave和master失联时间超过:

`(node-timeout * slave-validity-factor) + repl-ping-slave-period`则不会被提升为master。

*如node-timeout为30秒，slave-validity-factor为10, 默认default repl-ping-slave-period为10秒,失联时间超过310秒slave就不会成为master。*

较大的slave-validity-factor值可能允许包含过旧数据的slave成为master，同时较小的值可能会阻止集群选举出新master

为了达到最大限度的高可用性，可以设置为0，即slave不管和master失联多久都可以提升为master

```
cluster-replica-validity-factor 10
```

### 设置在工作slave为多少个的时候可以提升为master

只有在之前master有其它指定数量的工作状态下的slave节点时，slave节点才能提升为master。默认为1（即该集群至少有3个节点，1 master＋2 slaves，master宕机，仍有另外1个slave的情况下其中1个slave可以提升）

测试环境可设置为0，生成环境中至少设置为1

```
cluster-migration-barrier 1
```

### 自动检测恢复机制

默认情况下如果redis集群如果检测到至少有1个hash slot不可用，集群将停止查询数据。

如果所有slot恢复则集群自动恢复。

如果需要剩余集群部分可用情况下仍可提供查询服务，设置为no。

```
cluster-require-full-coverage yes
```

## 14. CLUSTER DOCKER/NAT support

在某些部署中，Redis群集节点地址发现失败，因为地址是NAT或由于端口被转发（典型情况是Docker和其他容器）。

为了保证在这种环境下redis集群可用，一个静态配置使每个节点都需要知道它的公共地址。 以下两个选项用于此范围，并且是：

```
 * cluster-announce-ip
 * cluster-announce-port
 * cluster-announce-bus-port
123
```

如果未使用上述选项，则将使用正常的Redis群集自动检测。

请注意，重新映射时，总线端口可能不在固定偏移量处客户端端口+ 10000，因此您可以指定任何端口和总线端口如何重新映射它们。 如果未设置总线端口，则固定偏移量为通常会使用10000。

```
cluster-announce-ip 10.1.1.5
cluster-announce-port 6379
cluster-announce-bus-port 6380
```

## 15. 慢查询日志(SLOW LOG)

慢查询日志记录超过特定时间的执行命令，执行时间不包括I/O操作的时间，比如：连接客户端、返回响应等等，而是命令真正的执行时间。
redis中慢查询日志配置参数包括两个，一个是判断Redis执行的时间，单位是微秒；另一个参数是慢查询日志记录的长度，类似于一个队列，新的记录被插入时会删除最老的日志。

1. redis查询执行的时间。单位微秒

```
slowlog-log-slower-than 10000
```

1. 日志长度的大小。可以通过`SLOWLOG RESET`重置

```
slowlog-max-len 128
```

## 16.LATENCY MONITOR(延时监控)

系统仅记录在等于或大于通过指定的毫秒数量的时间内执行的操作latency-monitor-threshold配置指令。 当其值设置为零时，将关闭延迟监视器。

默认情况下关闭延时监控，

```
latency-monitor-threshold 0
1
```

## 17. EVENT NOTIFICATION（事件通知）

主要是用于订阅与发布。

一旦key值发生变化时，Redis可以通知 Pub/Sub客户端。
如果键值空间通知开启时，可以通过Pub/Sub两种方式发布信息：

```
 PUBLISH __keyspace@0__:foo del
 PUBLISH __keyevent@0__:del foo
12
```

可以在一组类中选择Redis进行事件的通知，每个类都由一个字符标识：

```
#  K     Keyspace events, published with __keyspace@<db>__ prefix.
#  E     Keyevent events, published with __keyevent@<db>__ prefix.
#  g     Generic commands (non-type specific) like DEL, EXPIRE, RENAME, ...
#  $     String commands
#  l     List commands
#  s     Set commands
#  h     Hash commands
#  z     Sorted set commands
#  x     Expired events (events generated every time a key expires)
#  e     Evicted events (events generated when a key is evicted for maxmemory)
#  A     Alias for g$lshzxe, so that the "AKE" string means all the events.
```

## 18. ADVANCED CONFIG(高级配置)

当哈希值具有少量条目时，使用内存有效数据结构对哈希进行编码，并且最大条目不超过给定阈值。 可以使用以下指令配置这些阈值。

```
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
```

列表也以特殊方式编码以节省大量空间。每个内部列表节点允许的条目数可以指定为固定的最大大小或最大元素数。
该值一般在-5到-1之间

```
-5: max size: 64 Kb  <-- not recommended for normal workloads
-4: max size: 32 Kb  <-- not recommended
-3: max size: 16 Kb  <-- probably not recommended
-2: max size: 8 Kb   <-- good
-1: max size: 4 Kb   <-- good
```

正数表示存储每个列表节点的_exactly_元素数

```
list-max-ziplist-size -2
```

设置list是否被压缩

```
list-compress-depth 0
1
```

不同数值的含义

```bash
0: 所有的list都不压缩
1: depth 1 means "don't start compressing until after 1 node into the list,
    going from either the head or tail"
    So: [head]->node->node->...->node->[tail]
    [head], [tail] will always be uncompressed; inner nodes will compress.
2: [head]->[next]->node->node->...->node->[prev]->[tail]
    2 here means: don't compress head or head->next or tail->prev or tail,
    but compress all nodes between them.
3: [head]->[next]->[next]->node->node->...->node->[prev]->[prev]->[tail]
```

设置set压缩参数

集合在下面情况下有一个特殊的编码：当一个集合只是在64位有符号整数范围内恰好是基数为10的整数的字符串时

```bash
set-max-intset-entries 512
```

设置set多大时开启压缩

```bash
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
```
