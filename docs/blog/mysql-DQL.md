---
title: mysql-DQL
date: 2020-06-29
banner_img: /img/mysql.jpg
index_img: /img/mysql.png
tags: 
 - mysql
categories:
 - basic-component
 - mysql
---

## Review mysql

#### 基础查询

```sql
一、语法
select 查询列表
from 表名;
二、特点
1、查询列表可以是字段、常量、表达式、函数，也可以是多个
2、查询结果是一个虚拟表

三、示例
1、查询单个字段
select 字段名 from 表名;
2、查询多个字段
select 字段名，字段名 from 表名;
3、查询所有字段
select * from 表名
4、查询常量
select 常量值;
注意：字符型和日期型的常量值必须用单引号引起来，数值型不需要
5、查询函数
select 函数名(实参列表);
6、查询表达式
select 100/1234;
7、起别名
①as
②空格
8、去重
select distinct 字段名 from 表名;

9、+
作用：做加法运算
select 数值+数值; 直接运算
select 字符+数值;先试图将字符转换成数值，如果转换成功，则继续运算；否则转换成0，再做运算
select null+值;结果都为null

10、【补充】concat函数
功能：拼接字符
select concat(字符1，字符2，字符3,...);

11、【补充】ifnull函数
功能：判断某字段或表达式是否为null，如果为null 返回指定的值，否则返回原本的值
select ifnull(commission_pct,0) from employees;

12、【补充】isnull函数
功能：判断某字段或表达式是否为null，如果是，则返回1，否则返回0

```

#### 条件查询

```sql
一、语法
select 查询列表
from 表名
where 筛选条件

二、筛选条件的分类
1、简单条件运算符
> < = <> != >= <=  <=>安全等于
2、逻辑运算符
&& and
|| or
!  not
3、模糊查询
like:一般搭配通配符使用，可以判断字符型或数值型
通配符：%任意多个字符，_任意单个字符

between and
in
is null /is not null：用于判断null值

is null PK <=>
			普通类型的数值	null值		可读性
is null		×			√		√
	<=>		√			√		×

```

#### 排序查询

```sql
一、语法
select 查询列表
from 表
where 筛选条件
order by 排序列表 【asc}desc】

二、特点
1、asc ：升序，如果不写默认升序
   desc：降序

2、排序列表 支持 单个字段、多个字段、函数、表达式、别名

3、order by的位置一般放在查询语句的最后（除limit语句之外）
```

#### 常见函数

```sql
一、概述
功能：类似于java中的方法
好处：提高重用性和隐藏实现细节
调用：select 函数名(实参列表);
二、单行函数
1、字符函数
concat:连接
substr:截取子串
upper:变大写
lower：变小写
replace：替换
length：获取字节长度
trim:去前后空格
lpad：左填充
rpad：右填充
instr:获取子串第一次出现的索引
2、数学函数
ceil:向上取整
round：四舍五入
mod:取模
floor：向下取整
truncate:截断
rand:获取随机数，返回0-1之间的小数

3、日期函数

now：返回当前日期+时间
year:返回年
month：返回月
day:返回日
date_format:将日期转换成字符
curdate:返回当前日期
str_to_date:将字符转换成日期
curtime：返回当前时间
hour:小时
minute:分钟
second：秒
datediff:返回两个日期相差的天数
monthname:以英文形式返回月


4、其他函数
version 当前数据库服务器的版本
database 当前打开的数据库
user当前用户
password('字符')：返回该字符的密码形式
md5('字符'):返回该字符的md5加密形式



5、流程控制函数

①if(条件表达式，表达式1，表达式2)：如果条件表达式成立，返回表达式1，否则返回表达式2
②case情况1
case 变量或表达式或字段
when 常量1 then 值1
when 常量2 then 值2
...
else 值n
end

③case情况2
case 
when 条件1 then 值1
when 条件2 then 值2
...
else 值n
end

三、分组函数
1、分类
max 最大值
min 最小值
sum 和
avg 平均值
count 计算个数

2、特点

①语法
select max(字段) from 表名;

②支持的类型
sum和avg一般用于处理数值型
max、min、count可以处理任何数据类型

③以上分组函数都忽略null
④都可以搭配distinct使用，实现去重的统计
select sum(distinct 字段) from 表;
⑤count函数
count(字段)：统计该字段非空值的个数
count(*):统计结果集的行数
案例：查询每个部门的员工个数
1 xx    10
2 dd    20
3 mm    20
4 aa    40
5 hh    40

count(1):统计结果集的行数

效率上：
MyISAM存储引擎，count(*)最高
InnoDB存储引擎，count(*)和count(1)效率>count(字段)

⑥ 和分组函数一同查询的字段，要求是group by后出现的字段
```

#### 分组函数

```sql
一、语法
select 分组函数，分组后的字段
from 表
【where 筛选条件】
group by 分组的字段
【having 分组后的筛选】
【order by 排序列表】


二、特点

			使用关键字		筛选的表	 位置
分组前筛选	where			原始表		  group by的前面
分组后筛选	having		分组后的结果		group by 的后面
```

#### 连接查询

```sql
一、含义
当查询中涉及到了多个表的字段，需要使用多表连接
select 字段1，字段2
from 表1，表2,...;

笛卡尔乘积：当查询多个表时，没有添加有效的连接条件，导致多个表所有行实现完全连接
如何解决：添加有效的连接条件

二、分类

按年代分类：
	sql92：
		等值
		非等值
		自连接

		也支持一部分外连接（用于oracle、sqlserver，mysql不支持）
	sql99【推荐使用】
		内连接
			等值
			非等值
			自连接
		外连接
			左外
			右外
			全外（mysql不支持）
		交叉连接
			

三、SQL92语法
1、等值连接
语法：
	select 查询列表
	from 表1 别名,表2 别名
	where 表1.key=表2.key
	【and 筛选条件】
	【group by 分组字段】
	【having 分组后的筛选】
	【order by 排序字段】

特点：
	① 一般为表起别名
	②多表的顺序可以调换
	③n表连接至少需要n-1个连接条件
	④等值连接的结果是多表的交集部分


2、非等值连接
语法：
	select 查询列表
	from 表1 别名,表2 别名
	where 非等值的连接条件
	【and 筛选条件】
	【group by 分组字段】
	【having 分组后的筛选】
	【order by 排序字段】
3、自连接

语法：
	select 查询列表
	from 表 别名1,表 别名2
	where 等值的连接条件
	【and 筛选条件】
	【group by 分组字段】
	【having 分组后的筛选】
	【order by 排序字段】


四、SQL99语法
1、内连接
语法：
select 查询列表
from 表1 别名
【inner】 join 表2 别名 on 连接条件
where 筛选条件
group by 分组列表
having 分组后的筛选
order by 排序列表
limit 子句;

特点：
①表的顺序可以调换
②内连接的结果=多表的交集
③n表连接至少需要n-1个连接条件

分类：
等值连接
非等值连接
自连接

2、外连接
语法：
select 查询列表
from 表1 别名
left|right|full【outer】 join 表2 别名 on 连接条件
where 筛选条件
group by 分组列表
having 分组后的筛选
order by 排序列表
limit 子句;
特点：
①查询的结果=主表中所有的行，如果从表和它匹配的将显示匹配行，如果从表没有匹配的则显示null
②left join 左边的就是主表，right join 右边的就是主表
  full join 两边都是主表
③一般用于查询除了交集部分的剩余的不匹配的行

3、交叉连接

语法：
select 查询列表
from 表1 别名
cross join 表2 别名;

特点：
类似于笛卡尔乘积
```

#### 子查询

```sql
一、含义
嵌套在其他语句内部的select语句称为子查询或内查询，
外面的语句可以是insert、update、delete、select等，一般select作为外面语句较多
外面如果为select语句，则此语句称为外查询或主查询

二、分类
1、按出现位置
select后面：
		仅仅支持标量子查询
from后面：
		表子查询
where或having后面：
		标量子查询
		列子查询
		行子查询
exists后面：
		标量子查询
		列子查询
		行子查询
		表子查询

2、按结果集的行列
标量子查询（单行子查询）：结果集为一行一列
列子查询（多行子查询）：结果集为多行一列
行子查询：结果集为多行多列
表子查询：结果集为多行多列


三、示例
where或having后面
1、标量子查询
案例：查询最低工资的员工姓名和工资
①最低工资
select min(salary) from employees

②查询员工的姓名和工资，要求工资=①
select last_name,salary
from employees
where salary=(
	select min(salary) from employees
);

2、列子查询
案例：查询所有是领导的员工姓名
①查询所有员工的 manager_id
select manager_id
from employees

②查询姓名，employee_id属于①列表的一个
select last_name
from employees
where employee_id in(
	select manager_id
	from employees
);

```

#### 分页查询

```sql
一、应用场景
当要查询的条目数太多，一页显示不全
二、语法

select 查询列表
from 表
limit 【offset，】size;
注意：
offset代表的是起始的条目索引，默认从0卡死
size代表的是显示的条目数

公式：
假如要显示的页数为page，每一页条目数为size
select 查询列表
from 表
limit (page-1)*size,size;

```

#### 联合查询

```sql
一、含义
union：合并、联合，将多次查询结果合并成一个结果
二、语法
查询语句1
union 【all】
查询语句2
union 【all】
...

三、意义
1、将一条比较复杂的查询语句拆分成多条语句
2、适用于查询多个表的时候，查询的列基本是一致

四、特点
1、要求多条查询语句的查询列数必须一致
2、要求多条查询语句的查询的各列类型、顺序最好一致
3、union 去重，union all包含重复项
```

#### 总结

```sql
语法：
select 查询列表    ⑦
from 表1 别名       ①
连接类型 join 表2   ②
on 连接条件         ③
where 筛选          ④
group by 分组列表   ⑤
having 筛选         ⑥
order by排序列表    ⑧
limit 起始条目索引，条目数;  ⑨
```

