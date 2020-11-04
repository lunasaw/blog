---
title: mybatis动态sql
date: 2020-11-04
banner_img: /blog/img/Pikachu.jpg
tags: 
 - mybatis
categories:
 - mybatis
---
### MyBatis的动态SQL是基于OGNL表达式的，它可以帮助我们方便的在SQL语句中实现某些逻辑。 

MyBatis中用于实现动态SQL的元素主要有：

- if
- where
- set
- choose（when，otherwise）
- trim
- foreach  

### （1）if标签

此时如果CNAINDCLABASINFID为null，此语句很可能报错或查询结果为空。此时我们使用if动态sql语句先进行判断，如果值为null或等于空字符串，我们就不进行此条件的判断，增加灵活性。

```sql
<where>
   com.CNAINDCLABASINFID = #{industryNum}
   <if test="id!=null and id!=''"><!-- 项目编号 -->
      and bas.id = #{id}
   </if>
   <if test="projectName!=null and projectName!=''"><!-- 项目名称 -->
      and bas.PROJECT_NAME = #{projectName}
   </if>
</where>
```

### （2）if + where 条件判断

如上所示

### （3）if + set 更新语句

当update语句中没有使用if标签时，如果有一个参数为null，都会导致错误。 
当在update语句中使用if标签时，如果前面的if没有执行，则或导致逗号多余错误。使用set标签可以将动态的配置SET 关键字，和剔除追加到条件末尾的任何不相关的逗号。**如果set包含的内容为空的话则会出错。**

使用if+set标签修改后，如果某项为null则不进行更新，而是保持数据库原值。如下示例：

```sql
<update id="editRateAnalysTask" parameterType="RateAnalystScale" >
UPDATE STUDENT_TBL
<set>
   <if test="studentName != null and studentName != '' ">
      STUDENT_TBL.STUDENT_NAME = #{studentName},
   </if>
   <if test="studentSex != null and studentSex != '' ">
      STUDENT_TBL.STUDENT_SEX = #{studentSex},
   </if>
   <if test="studentBirthday != null ">
      STUDENT_TBL.STUDENT_BIRTHDAY = #{studentBirthday},
   </if>
   <if test="studentPhoto != null ">
      STUDENT_TBL.STUDENT_PHOTO = #{studentPhoto, javaType=byte[], jdbcType=BLOB, typeHandler=org.apache.ibatis.type.BlobTypeHandler},
   </if>
   <if test="classId != '' ">
      STUDENT_TBL.CLASS_ID = #{classId}
   </if>
   <if test="placeId != '' ">
      STUDENT_TBL.PLACE_ID = #{placeId}
   </if>
</set>
WHERE STUDENT_TBL.STUDENT_ID = #{studentId};
</update>
```

### （4）choose (when,otherwise)

​    有时候我们并不想应用所有的条件，而只是想从多个选项中选择一个。而使用if标签时，只要test中的表达式为true，就会执行if标签中的条件。MyBatis提供了choose 元素。if标签是与(and)的关系，而choose标签是或（or）的关系.

​    choose标签是按顺序判断其内部when标签中的test条件出否成立，如果有一个成立，则choose结束**。**当choose中所有when的条件都不满则时，则执行otherwise中的sql。类似于Java 的switch 语句，choose为switch，when为case，otherwise则为default。

例如下面例子，同样把所有可以限制的条件都写上，方面使用。choose会从上到下选择一个when标签的test为true的sql执行。安全考虑，我们使用where将choose包起来，放置关键字多于错误。



```sql
<select id="">
   SELECT ST.STUDENT_ID,
   ST.STUDENT_NAME,
   ST.STUDENT_SEX,
   ST.STUDENT_BIRTHDAY,
   ST.STUDENT_PHOTO,
   ST.CLASS_ID,
   ST.PLACE_ID
   FROM STUDENT_TBL ST
   <where>
      <choose>
         <when test="studentName !=null ">
            ST.STUDENT_NAME LIKE CONCAT(CONCAT('%', #{studentName, jdbcType=VARCHAR}),'%')
         </when >
         <when test="studentSex != null and studentSex != '' ">
            AND ST.STUDENT_SEX = #{studentSex, jdbcType=INTEGER}
         </when >
         <when test="studentBirthday != null ">
            AND ST.STUDENT_BIRTHDAY = #{studentBirthday, jdbcType=DATE}
         </when >
         <when test="classId != null and classId!= '' ">
            AND ST.CLASS_ID = #{classId, jdbcType=VARCHAR}
         </when >
         <when test="classEntity != null and classEntity.classId !=null and classEntity.classId !=' ' ">
            AND ST.CLASS_ID = #{classEntity.classId, jdbcType=VARCHAR}
         </when >
         <when test="placeId != null and placeId != '' ">
            AND ST.PLACE_ID = #{placeId, jdbcType=VARCHAR}
         </when >
         <when test="placeEntity != null and placeEntity.placeId != null and placeEntity.placeId != '' ">
            AND ST.PLACE_ID = #{placeEntity.placeId, jdbcType=VARCHAR}
         </when >
         <when test="studentId != null and studentId != '' ">
            AND ST.STUDENT_ID = #{studentId, jdbcType=VARCHAR}
         </when >
         <otherwise>
         </otherwise>
      </choose>
   </where>
</select>
```

### （5）trim标签

trim元素的主要功能是可以在自己包含的内容前加上某些前缀，也可以在其后加上某些后缀，与之对应的属性是**prefix**和**suffix**；可以把包含内容的首部某些内容覆盖，即忽略，也可以把尾部的某些内容覆盖，对应的属性是**prefixOverrides**和**suffixOverrides**。正因为trim有这样的功能，所以我们也可以非常简单的利用trim来代替where/set标签的功能，示例代码如下：

**trim代替where标签：**

```sql
　select * from user 
　　<trim prefix="WHERE" prefixoverride="AND |OR">
　　　　<if test="name != null and name.length()>0"> AND name=#{name}</if>
　　　　<if test="gender != null and gender.length()>0"> AND gender=#{gender}</if>
　　</trim>
```

假如说name和gender的值都不为null的话打印的SQL为：select * from user where   name = 'xx' and gender = 'xx'

　　在红色标记的地方是不存在第一个and的，上面两个属性的意思如下：

　　prefix：前缀　　　　　　

　　prefixoverride：去掉第一个and或者是or

**trim代替set标签：**

update user

```sql
　　<trim prefix="set" suffixoverride="," suffix=" where id = #{id} ">
　　　　<if test="name != null and name.length()>0"> name=#{name} , </if>
　　　　<if test="gender != null and gender.length()>0"> gender=#{gender} ,  </if>
　　</trim>
```

假如说name和gender的值都不为null的话打印的SQL为：update user set name='xx' , gender='xx'   where id='x'

　　在红色标记的地方不存在逗号，而且自动加了一个set前缀和where后缀，上面三个属性的意义如下，其中prefix意义如上：

　　suffixoverride：去掉最后一个逗号（也可以是其他的标记，就像是上面前缀中的and一样）

　　suffix：后缀

### （6）foreach 标签

foreach的主要用在构建in条件中，它可以在SQL语句中进行迭代一个集合。**foreach元素的属性主要有item，index，collection，open，separator，close。**

- **item**表示集合中每一个元素进行迭代时的别名；
- **index**指定一个名字，用于表示在迭代过程中，每次迭代到的位置；
- **open**表示该语句以什么开始；
- **separator**表示在每次进行迭代之间以什么符号作为分隔符；
- **close**表示以什么结束；

在使用foreach的时候最关键的也是最容易出错的就是 **collection** 属性，该属性是必须指定的，但是在不同情况下，该属性的值是不一样的，主要有一下3种情况： 

- 如果传入的是单参数且参数类型是一个List的时候，collection属性值为list
- 如果传入的是单参数且参数类型是一个array数组的时候，collection的属性值为array
- 如果传入的参数是多个的时候，我们就需要把它们封装成一个Map了，当然单参数也可以封装成map，实际上如果你在传入参数的时候，在MyBatis里面也是会把它封装成一个Map的，map的key就是参数名，所以这个时候collection属性值就是传入的List或array对象在自己封装的map里面的key

#### 1）单参数List的类型：

```sql
<select id="dynamicForeachTest" resultType="Blog">  
    select * from t_blog where id in  
    <foreach collection="list" index="index" item="item" open="(" separator="," close=")">  
        #{item}  
    </foreach>  
</select>  
```

上述collection的值为list，对应的Mapper是这样的：

```sql
public List<Blog> dynamicForeachTest(List<Integer> ids); 
```

#### 2）单参数array数组的类型：

```sql
<select id="dynamicForeach2Test" resultType="Blog">  
    select * from t_blog where id in  
    <foreach collection="array" index="index" item="item" open="(" separator="," close=")">  
        #{item}  
    </foreach>  
</select>  
```

上述collection为array，对应的Mapper代码：

```java
public List<Blog> dynamicForeach2Test(int[] ids);  
```

#### 3）自己把参数封装成Map的类型

```sql
<select id="dynamicForeach3Test" resultType="Blog">  
    select * from t_blog where title like "%"#{title}"%" and id in  
    <foreach collection="ids" index="index" item="item" open="(" separator="," close=")">  
        #{item}  
    </foreach>  
</select>  
```

上述collection的值为ids，是传入的参数Map的key，对应的Mapper代码：

```java
public List<Blog> dynamicForeach3Test(Map<String, Object> params); 
```



