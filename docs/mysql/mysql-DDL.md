---
title: mysql-DDL
date: 2020-07-04
banner_img: /img/mysql.jpg
tags: 
 - mysql
categories:
 - mysql
---

## Review mysql

### 库管理

```sql
一、创建库
create database 【if not exists】 库名【 character set 字符集名】;

二、修改库
alter database 库名 character set 字符集名;
三、删除库
drop database 【if exists】 库名;

```

### 表管理

```sql
一、创建表 ★
create table 【if not exists】 表名(
	字段名 字段类型 【约束】,
	字段名 字段类型 【约束】,
	。。。
	字段名 字段类型 【约束】 

)

二、修改表

1.添加列
alter table 表名 add column 列名 类型 【first|after 字段名】;
2.修改列的类型或约束
alter table 表名 modify column 列名 新类型 【新约束】;
3.修改列名
alter table 表名 change column 旧列名 新列名 类型;
4 .删除列
alter table 表名 drop column 列名;
5.修改表名
alter table 表名 rename 【to】 新表名;

三、删除表
drop table【if exists】 表名;

四、复制表
1、复制表的结构
create table 表名 like 旧表;
2、复制表的结构+数据
create table 表名 
select 查询列表 from 旧表【where 筛选】;

```

### 类型约束

```sql
一、数值型
1、整型
tinyint、smallint、mediumint、int/integer、bigint
1         2        3          4            8

特点：
①都可以设置无符号和有符号，默认有符号，通过unsigned设置无符号
②如果超出了范围，会报out or range异常，插入临界值
③长度可以不指定，默认会有一个长度
长度代表显示的最大宽度，如果不够则左边用0填充，但需要搭配zerofill，并且默认变为无符号整型


2、浮点型
定点数：decimal(M,D)
浮点数:
	float(M,D)   4
	double(M,D)  8

特点：
①M代表整数部位+小数部位的个数，D代表小数部位
②如果超出范围，则报out or range异常，并且插入临界值
③M和D都可以省略，但对于定点数，M默认为10，D默认为0
④如果精度要求较高，则优先考虑使用定点数

二、字符型
char、varchar、binary、varbinary、enum、set、text、blob

char：固定长度的字符，写法为char(M)，最大长度不能超过M，其中M可以省略，默认为1
varchar：可变长度的字符，写法为varchar(M)，最大长度不能超过M，其中M不可以省略

三、日期型
year年
date日期
time时间
datetime 日期+时间          8      
timestamp 日期+时间         4   比较容易受时区、语法模式、版本的影响，更能反映当前时区的真实时间
```

### 常见约束

```sql
一、常见的约束
NOT NULL：非空，该字段的值必填
UNIQUE：唯一，该字段的值不可重复
DEFAULT：默认，该字段的值不用手动插入有默认值
CHECK：检查，mysql不支持
PRIMARY KEY：主键，该字段的值不可重复并且非空  unique+not null
FOREIGN KEY：外键，该字段的值引用了另外的表的字段

主键和唯一
1、区别：
①、一个表至多有一个主键，但可以有多个唯一
②、主键不允许为空，唯一可以为空
2、相同点
都具有唯一性
都支持组合键，但不推荐
外键：
1、用于限制两个表的关系，从表的字段值引用了主表的某字段值
2、外键列和主表的被引用列要求类型一致，意义一样，名称无要求
3、主表的被引用列要求是一个key（一般就是主键）
4、插入数据，先插入主表
删除数据，先删除从表
可以通过以下两种方式来删除主表的记录
#方式一：级联删除
ALTER TABLE stuinfo ADD CONSTRAINT fk_stu_major FOREIGN KEY(majorid) REFERENCES major(id) ON DELETE CASCADE;

#方式二：级联置空
ALTER TABLE stuinfo ADD CONSTRAINT fk_stu_major FOREIGN KEY(majorid) REFERENCES major(id) ON DELETE SET NULL;

二、创建表时添加约束
create table 表名(
	字段名 字段类型 not null,#非空
	字段名 字段类型 primary key,#主键
	字段名 字段类型 unique,#唯一
	字段名 字段类型 default 值,#默认
	constraint 约束名 foreign key(字段名) references 主表（被引用列）

)
注意：
			支持类型		可以起约束名			
列级约束		除了外键		不可以
表级约束		除了非空和默认	可以，但对主键无效

列级约束可以在一个字段上追加多个，中间用空格隔开，没有顺序要求

三、修改表时添加或删除约束
1、非空
添加非空
alter table 表名 modify column 字段名 字段类型 not null;
删除非空
alter table 表名 modify column 字段名 字段类型 ;

2、默认
添加默认
alter table 表名 modify column 字段名 字段类型 default 值;
删除默认
alter table 表名 modify column 字段名 字段类型 ;
3、主键
添加主键
alter table 表名 add【 constraint 约束名】 primary key(字段名);
删除主键
alter table 表名 drop primary key;

4、唯一
添加唯一
alter table 表名 add【 constraint 约束名】 unique(字段名);
删除唯一
alter table 表名 drop index 索引名;
5、外键
添加外键
alter table 表名 add【 constraint 约束名】 foreign key(字段名) references 主表（被引用列）;
删除外键
alter table 表名 drop foreign key 约束名;


四、自增长列
特点：
1、不用手动插入值，可以自动提供序列值，默认从1开始，步长为1
auto_increment_increment
如果要更改起始值：手动插入值
如果要更改步长：更改系统变量
set auto_increment_increment=值;
2、一个表至多有一个自增长列
3、自增长列只能支持数值型
4、自增长列必须为一个key

一、创建表时设置自增长列
create table 表(
	字段名 字段类型 约束 auto_increment
)
二、修改表时设置自增长列
alter table 表 modify column 字段名 字段类型 约束 auto_increment
三、删除自增长列
alter table 表 modify column 字段名 字段类型 约束 
```

