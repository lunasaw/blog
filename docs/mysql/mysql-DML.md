---
title: mysql-DML
date: 2020-07-04
banner_img: /img/mysql.jpg
tags: 
 - mysql
categories:
 - mysql
---

## Review mysql

### 插入

```sql
一、方式一
语法：
insert into 表名(字段名,...) values(值,...);
特点：
1、要求值的类型和字段的类型要一致或兼容
2、字段的个数和顺序不一定与原始表中的字段个数和顺序一致
但必须保证值和字段一一对应
3、假如表中有可以为null的字段，注意可以通过以下两种方式插入null值
①字段和值都省略
②字段写上，值使用null
4、字段和值的个数必须一致
5、字段名可以省略，默认所有列

二、方式二
语法：
insert into 表名 set 字段=值,字段=值,...;


两种方式 的区别：
1.方式一支持一次插入多行，语法如下：
insert into 表名【(字段名,..)】 values(值，..),(值，...),...;
2.方式一支持子查询，语法如下：
insert into 表名
查询语句;

```

### 修改

```sql
一、修改单表的记录 ★
语法：update 表名 set 字段=值,字段=值 【where 筛选条件】;

二、修改多表的记录【补充】
语法：
update 表1 别名 
left|right|inner join 表2 别名 
on 连接条件  
set 字段=值,字段=值 
【where 筛选条件】;
```

### 删除

```sql
方式一：使用delete
一、删除单表的记录★
语法：delete from 表名 【where 筛选条件】【limit 条目数】
二、级联删除[补充]
语法：
delete 别名1,别名2 from 表1 别名 
inner|left|right join 表2 别名 
on 连接条件
 【where 筛选条件】

方式二：使用truncate
语法：truncate table 表名

两种方式的区别【面试题】★

1.truncate删除后，如果再插入，标识列从1开始
  delete删除后，如果再插入，标识列从断点开始
2.delete可以添加筛选条件
 truncate不可以添加筛选条件
3.truncate效率较高
4.truncate没有返回值
delete可以返回受影响的行数
5.truncate不可以回滚
delete可以回滚
```

