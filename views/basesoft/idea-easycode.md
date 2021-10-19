---
title: easyCode 代码生成
date: 2020-09-13
banner_img: /img/easycode.jpg
index_img: /img/java.png
sidebar: 'auto'
isShowComments: true
tags: 
 - easyCode 
categories:
 - java
---

### easyCode 代码生成

##### dao

```java
##定义初始变量
#set($tableName = $tool.append($tableInfo.name, "Mapper"))
##设置回调
$!callback.setFileName($tool.append($tableName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/mapper"))

##拿到主键
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end

#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}mapper;

import $!{tableInfo.savePackageName}.entity.$!{tableInfo.name};
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import javax.validation.constraints.*;
import java.util.List;
/**
@Author: ${author}
@CreateTime: ${time.currTime("yyyy-MM-dd HH:mm:ss")}
*/
@Mapper
public interface $!{tableName} {

    /**
     * 通过主键查询数据
     *
     * @param $!pk.name 主键
     * @return 对象
     */
    $!{tableInfo.name} getById(@NotNull $!pk.shortType $!pk.name);

    /**
     * 通过实体不为空的属性作为筛选条件查询单个
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 条件
     * @return 对象
     */
    $!{tableInfo.name} getByEntity($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));

    /**
     * 通过实体不为空的属性作为筛选条件查询列表
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 条件
     * @return 对象列表
     */
    List<$!{tableInfo.name}> listByEntity($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
    
    /**
     * 通过Id列表作为筛选条件查询列表，列表长度不为0
     *
     * @param list 列表
     * @return 对象列表
     */
    List<$!{tableInfo.name}> listByIds(@NotEmpty List<$!pk.shortType> list);

    /**
     * 新增实体属性不为null的列
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例
     * @return 影响行数
     */
    int insert(@NotNull $!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));

    /**
     * 批量新增所有列，列表长度不能为0，且列表id统一为null或者统一不为null
     *
     * @param list 实例
     * @return 影响行数
     */
    int insertBatch(@NotEmpty List<$!{tableInfo.name}> list);

    /**
     * 通过主键修改实体属性不为null的列
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例
     * @return 影响行数
     */
    int update(@NotNull $!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));

    /**
     * 通过表字段修改实体属性不为null的列
     *
     * @param where 条件
     * @param where set
     * @return 影响行数
     */
    int updateByField(@NotNull @Param("where") $!{tableInfo.name} where, @NotNull @Param("set") $!{tableInfo.name} set);

    /**
     * 通过主键修改实体列表，列表长度不能为0，注意：当实体属性为null时，对应的列也会别更新为null
     *
     * @param list 列表
     * @return 影响行数
     */
    int updateBatch(@NotEmpty List<$!{tableInfo.name}> list);

    /**
     * 通过主键删除
     *
     * @param $!pk.name 主键
     * @return 影响行数
     */
    int deleteById(@NotNull $!pk.shortType $!pk.name);

    /**
     * 通过实体非空属性删除
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 实体
     * @return 影响行数
     */
    int deleteByEntity(@NotNull $!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
  
    /**
     * 通过主键列表删除，列表长度不能为0
     *
     * @param list 列表
     * @return 影响行数
     */
    int deleteByIds(@NotEmpty List<$!pk.shortType> list);
    
    /**
     * 查询行数
     *
     * @return 影响行数
     */
    int countAll();

    /**
     * 通过实体非空查询行数
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 实体
     * @return 影响行数
     */
    int countByEntity($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
    
}
```

##### mapper

```xml
##引入mybatis支持
$!mybatisSupport

##设置保存名称与保存位置
$!callback.setFileName($tool.append($!{tableInfo.name}, "Mapper.xml"))
$!callback.setSavePath($tool.append($modulePath, "/src/main/resources/mapper"))

##拿到主键
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="$!{tableInfo.savePackageName}.mapper.$!{tableInfo.name}Mapper">

    <resultMap type="$!{tableInfo.savePackageName}.entity.$!{tableInfo.name}" id="$!{tableInfo.name}ResultMap">
#foreach($column in $tableInfo.fullColumn)
        <result property="$!column.name" column="$!column.obj.name" jdbcType="$!column.ext.jdbcType"/>
#end
    </resultMap>

    <sql id="table_field">
      #allSqlColumn()
      
    </sql>
       
    <!--通过Id查询单个-->
    <select id="getById" resultMap="$!{tableInfo.name}ResultMap" parameterType="$pk.type">
        select
          <include refid="table_field" />
        from $!tableInfo.obj.name
        where $!pk.obj.name = #{$!pk.name,jdbcType=$!pk.ext.jdbcType}
    </select>


    <!--通过实体不为空的属性作为筛选条件查询列表-->
    <select id="listByEntity" resultMap="$!{tableInfo.name}ResultMap" parameterType="$!{tableInfo.savePackageName}.entity.$!{tableInfo.name}">
        select
          <include refid="table_field" />
        from $!tableInfo.obj.name
        <where>
#foreach($column in $tableInfo.fullColumn)
            <if test="$!column.name != null">
                and $!column.obj.name = #{$!column.name,jdbcType=$!column.ext.jdbcType}
            </if>
#end
        </where>
    </select>

    <!--通过实体不为空的属性作为筛选条件查询单个-->
    <select id="getByEntity" resultMap="$!{tableInfo.name}ResultMap" parameterType="$!{tableInfo.savePackageName}.entity.$!{tableInfo.name}">
        select
          <include refid="table_field" />
        from $!tableInfo.obj.name
        <where>
#foreach($column in $tableInfo.fullColumn)
            <if test="$!column.name != null">
                and $!column.obj.name = #{$!column.name,jdbcType=$!column.ext.jdbcType}
            </if>
#end
        </where>
    </select>

    <!--通过Id列表作为筛选条件查询列表，列表长度不为0-->
    <select id="listByIds" resultMap="$!{tableInfo.name}ResultMap" parameterType="list">
        select
          <include refid="table_field" />
        from $!tableInfo.obj.name
        where $!pk.obj.name in
        <foreach item="item" collection="list" separator="," open="(" close=")" index="index">
            #{item}
        </foreach>
    </select>

    <!--新增实体属性不为null的列-->
    <insert id="insert" keyProperty="$!pk.name" useGeneratedKeys="true" parameterType="$!{tableInfo.savePackageName}.entity.$!{tableInfo.name}">
        insert into $!{tableInfo.obj.name}
        <trim prefix="(" suffix=")" suffixOverrides=",">
#foreach($column in  $tableInfo.fullColumn)
          <if test="$!column.name != null">
             $!column.obj.name,
          </if>
#end          
        </trim>
        <trim prefix="values (" suffix=")" suffixOverrides=",">
#foreach($column in  $tableInfo.fullColumn)
          <if test="$!column.name != null">
             #{$!column.name,jdbcType=$!column.ext.jdbcType},
          </if>
#end
        </trim>
    </insert>

    <!--批量新增所有列，列表长度不能为0，且列表id统一为null或者统一不为null-->
    <insert id="insertBatch" keyProperty="$!pk.name" useGeneratedKeys="true" parameterType="list">
        insert into $!{tableInfo.obj.name}
         (#foreach($column in $tableInfo.fullColumn)$!{column.obj.name}#if($velocityHasNext), #end#end)
        values
        <foreach item="item" collection="list" separator="," open="" close="" index="index">
         (#foreach($column in $tableInfo.fullColumn)#{item.$!{column.name},jdbcType=$!column.ext.jdbcType}#if($velocityHasNext), #end#end)
        </foreach>
    </insert>

    <!--通过主键修改实体属性不为null的列-->
    <update id="update" parameterType="$!{tableInfo.savePackageName}.entity.$!{tableInfo.name}">
        update $!{tableInfo.obj.name}
        <set>
#foreach($column in $tableInfo.otherColumn)
            <if test="$!column.name != null#if($column.type.equals("java.lang.String")) and $!column.name != ''#end">
                $!column.obj.name = #{$!column.name,jdbcType=$!column.ext.jdbcType},
            </if>
#end
        </set>
        where $!pk.obj.name = #{$!pk.name,jdbcType=$!pk.ext.jdbcType}
    </update>

    <!--通过表字段修改实体属性不为null的列-->
    <update id="updateByField">
        update $!{tableInfo.obj.name}
        <set>
#foreach($column in $tableInfo.otherColumn)
            <if test="where.$!{column.name} == null and set.$!{column.name} != null#if($column.type.equals("java.lang.String")) and set.$!{column.name} != ''#end">
                $!column.obj.name = #{set.$!{column.name},jdbcType=$!column.ext.jdbcType},
            </if>
#end
        </set>
        <where>
#foreach($column in $tableInfo.fullColumn)
            <if test="where.$!{column.name} != null">
                and $!column.obj.name = #{where.$!{column.name},jdbcType=$!column.ext.jdbcType}
            </if>
#end
        </where>
    </update>

    <!--通过主键修改实体列表，列表长度不能为0，注意：当实体属性为null时，对应的列也会别更新为null-->
    <update id="updateBatch" parameterType="list">
        update $!{tableInfo.obj.name}
        <trim prefix="set" suffixOverrides=",">
#foreach($column in $tableInfo.otherColumn)
            <trim prefix="$!{column.obj.name} = case" suffix="end,">
                 <foreach collection="list" item="item" index="index">
                  when $!pk.obj.name = #{item.$!pk.name} then #{item.$!column.name}
                 </foreach>
            </trim>
#end
        </trim>
        where $!pk.obj.name in
        <foreach collection="list" index="index" item="item" separator="," open="(" close=")">
            #{item.$!pk.name,jdbcType=$!pk.ext.jdbcType}
        </foreach>
    </update>
    
    <!--通过主键删除-->
    <delete id="deleteById" parameterType="$pk.type">
        delete from $!{tableInfo.obj.name} where $!pk.obj.name = #{$!pk.name,jdbcType=$!pk.ext.jdbcType}
    </delete>

    <!--通过实体非空属性删除-->
    <delete id="deleteByEntity" parameterType="$!{tableInfo.savePackageName}.entity.$!{tableInfo.name}">
        delete from $!{tableInfo.obj.name}
        <where>
#foreach($column in $tableInfo.otherColumn)
            <if test="$!column.name != null">
                and $!column.obj.name = #{$!column.name,jdbcType=$!column.ext.jdbcType}
            </if>
#end
        </where>
    </delete>
    
    <!--通过主键列表删除，列表长度不能为0-->
    <delete id="deleteByIds" parameterType="list">
        delete from $!{tableInfo.obj.name} where $!pk.obj.name in
        <foreach item="item" collection="list" separator="," open="(" close=")" index="index">
            #{item}
        </foreach>
    </delete>
    
    <select id="countAll" resultType="int">
        select count($!pk.obj.name) from $!{tableInfo.obj.name}
    </select>
    
    <select id="countByEntity" parameterType="$!{tableInfo.savePackageName}.entity.$!{tableInfo.name}" resultType="int">
        select count($!pk.obj.name) from $!{tableInfo.obj.name}
        <where>
#foreach($column in $tableInfo.fullColumn)
            <if test="$!column.name != null">
                and $!column.obj.name = #{$!column.name,jdbcType=$!column.ext.jdbcType}
            </if>
#end
        </where>
    </select>
</mapper>
```

##### service

```java
##定义初始变量
#set($tableName = $tool.append($tableInfo.name, "Service"))
##设置回调
$!callback.setFileName($tool.append($tableName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/service"))

##拿到主键
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end

#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}service;

import $!{tableInfo.savePackageName}.mapper.$!{tableInfo.name}Mapper;
import $!{tableInfo.savePackageName}.entity.$!{tableInfo.name};
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
@Author: ${author}
@CreateTime: ${time.currTime("yyyy-MM-dd HH:mm:ss")}
*/
public interface $!{tableName} {
   
    /**
     * 通过主键查询数据
     *
     * @param $!pk.name 主键
     * @return 对象
     */
    $!{tableInfo.name} getById($!pk.shortType $!pk.name);

    /**
     * 通过实体不为空的属性作为筛选条件查询单个
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 条件
     * @return 对象
     */
    $!{tableInfo.name} getByEntity($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));

    /**
     * 通过实体不为空的属性作为筛选条件查询列表
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 条件
     * @return 对象列表
     */
    List<$!{tableInfo.name}> listByEntity($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
    
    /**
     * 条件分页查询
     *
     * @param $!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}) 查询条件
     * @param page 起始标号
     * @param pageSize 查询条目
     * @return 对象列表
     */
    PageInfo listPageByEntity(int page, int pageSize, $!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));

    /**
     * 条件分页查询
     *
     * @param page 起始标号
     * @param pageSize 查询条目
     * @return 对象列表
     */
    PageInfo listPage(int page, int pageSize);

    /**
     * Id列表查询对象列表
     *
     * @param ids Id列表
     * @return 对象列表
     */
    List<$!{tableInfo.name}> listByIds(List<$!pk.shortType> ids);

    /**
     * 插入
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 对象
     * @return 影响行数
     */
    int insert($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));

    /**
     * 列表插入
     *
     * @param list 列表对象
     * @return 影响行数
     */
    int insertBatch(List<$!{tableInfo.name}> list);

    /**
     * 更新
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 对象
     * @return 影响行数
     */
    int update($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));

    /**
     * 列表更新
     *
     * @param list 列表对象
     * @return 影响行数
     */
    int updateBatch(List<$!{tableInfo.name}> list);

    /**
     * 删除
     *
     * @param $!pk.name 主键
     * @return 影响行数
     */
    int deleteById($!pk.shortType $!pk.name);

    /**
     * 条件删除
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 对象
     * @return 影响行数
     */
    int deleteByEntity($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
 
     /**
     * 主键列表删除
     *
     * @param list 主键列表
     * @return 影响行数
     */ 
    int deleteByIds(List<$!pk.shortType> list);
    
     /**
     * 数据条目
     *
     * @return 影响行数
     */ 
    int countAll();

    /**
     * 条件查询数目
     *
     * @param $!tool.firstLowerCase($!{tableInfo.name}) 对象
     * @return 影响行数
     */
    int countByEntity($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
}
```

##### serviceImpl

```java
##定义初始变量
#set($tableName = $tool.append($tableInfo.name, "ServiceImpl"))
##设置回调
$!callback.setFileName($tool.append($tableName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/service/impl"))

##拿到主键
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end

#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}service.impl;

import $!{tableInfo.savePackageName}.mapper.$!{tableInfo.name}Mapper;
import $!{tableInfo.savePackageName}.service.$!{tableInfo.name}Service;
import $!{tableInfo.savePackageName}.entity.$!{tableInfo.name};
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import java.util.Date;
import java.util.List;

/**
@Author: ${author}
@CreateTime: ${time.currTime("yyyy-MM-dd HH:mm:ss")}
*/
@Service
public class $!{tableName} implements $!{tableInfo.name}Service {

    @Resource(type = $!{tableInfo.name}Mapper.class)
    private $!{tableInfo.name}Mapper $!tool.firstLowerCase($!{tableInfo.name})Mapper;

    @Override
    public $!{tableInfo.name} getById($!pk.shortType $!pk.name) {
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.getById($!{pk.name});
    }

    @Override
    public $!{tableInfo.name} getByEntity($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name})) {
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.getByEntity($!{tool.firstLowerCase($!{tableInfo.name})});
    }

    @Override
    public List<$!{tableInfo.name}> listByEntity($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name})) {
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.listByEntity($!{tool.firstLowerCase($!{tableInfo.name})});
    }
    
    @Override
    public PageInfo listPageByEntity(int page, int pageSize, $!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name})) {
        PageHelper.startPage(page,pageSize);
        List<$!{tableInfo.name}> list = $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.listByEntity($!{tool.firstLowerCase($!{tableInfo.name})});
        return new PageInfo(list);
    }
    
    @Override
    public PageInfo listPage(int page, int pageSize) {
        PageHelper.startPage(page,pageSize);
        List<$!{tableInfo.name}> list = $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.listByEntity(new $!{tableInfo.name}());
        return new PageInfo(list);
    }

    @Override
    public List<$!{tableInfo.name}> listByIds(List<$!pk.shortType> ids) {
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.listByIds(ids);
    }

    @Override
    public int insert($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name})) {
        Date date = new Date();
        $!{tool.firstLowerCase($!{tableInfo.name})}.setCreateTime(date);
        $!{tool.firstLowerCase($!{tableInfo.name})}.setUpdateTime(date);
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.insert($!{tool.firstLowerCase($!{tableInfo.name})});
    }
   
    @Override
    public int insertBatch(List<$!{tableInfo.name}> list) {
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.insertBatch(list);
    }

    @Override
    public int update($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name})) {
        $!{tool.firstLowerCase($!{tableInfo.name})}.setUpdateTime(new Date());
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.update($!{tool.firstLowerCase($!{tableInfo.name})});
    }

    @Override
    public int updateBatch(List<$!{tableInfo.name}> list) {
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.updateBatch(list);
    }

    @Override
    public int deleteById($!pk.shortType $!pk.name) {
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.deleteById($!pk.name);
    }

    @Override
    public int deleteByEntity($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name})) {
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.deleteByEntity($!{tool.firstLowerCase($!{tableInfo.name})});
    }
  
    @Override
    public int deleteByIds(List<$!pk.shortType> list) {
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.deleteByIds(list);
    }

    @Override
    public int countAll() {
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.countAll();
    }
    
    @Override
    public int countByEntity($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name})) {
        return $!{tool.firstLowerCase($!{tableInfo.name})}Mapper.countByEntity($!tool.firstLowerCase($!{tableInfo.name}));
    }

}

```

##### controller

```java
##定义初始变量
#set($tableName = $tool.append($tableInfo.name, "Controller"))
##设置回调
$!callback.setFileName($tool.append($tableName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/controller"))
##拿到主键
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end

#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}controller;

import $!{tableInfo.savePackageName}.entity.$!{tableInfo.name};
import $!{tableInfo.savePackageName}.service.$!{tableInfo.name}Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

/**
@Author: ${author}
@CreateTime: ${time.currTime("yyyy-MM-dd HH:mm:ss")}
*/
@RestController
@RequestMapping("/$!tool.firstLowerCase($tableInfo.name)")
public class $!{tableName} {
    
    @Autowired
    private $!{tableInfo.name}Service $!tool.firstLowerCase($tableInfo.name)Service;

    @GetMapping("/get/{$!pk.name}")
    public ResultDTO<$!{tableInfo.name}> getById(@PathVariable $!pk.shortType $!pk.name) {
        $tableInfo.name $!tool.firstLowerCase($tableInfo.name) = $!{tool.firstLowerCase($tableInfo.name)}Service.getById(id);
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, $!tool.firstLowerCase($tableInfo.name)!=null?$!tool.firstLowerCase($tableInfo.name):new $!{tableInfo.name}());
    }

    @GetMapping("/get")
    public ResultDTO<$!{tableInfo.name}> getByEntity($tableInfo.name $!tool.firstLowerCase($tableInfo.name)) {
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, $!{tool.firstLowerCase($tableInfo.name)}Service.getByEntity($!{tool.firstLowerCase($!{tableInfo.name})}));
    }

    @GetMapping("/list")
    public ResultDTO<List<$!{tableInfo.name}>> list($tableInfo.name $!tool.firstLowerCase($tableInfo.name)) {
        List<$tableInfo.name> $!{tool.firstLowerCase($tableInfo.name)}List = $!{tool.firstLowerCase($tableInfo.name)}Service.listByEntity($!{tool.firstLowerCase($!{tableInfo.name})});
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, $!{tool.firstLowerCase($tableInfo.name)}List);
    }
    
    @GetMapping("/pageListByEntity/{page}/{size}")
    public ResultDTO<PageInfo> listPageByEntity(@PathVariable(value = "page")int page, @PathVariable(value = "size")int size, $tableInfo.name $!tool.firstLowerCase($tableInfo.name)) {
        PageInfo pageInfo = $!{tool.firstLowerCase($tableInfo.name)}Service.listPageByEntity(page, size, $!{tool.firstLowerCase($!{tableInfo.name})});
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, pageInfo);
    }
    
    @GetMapping("/pageList/{page}/{size}")
    public ResultDTO<PageInfo> listPage(@PathVariable(value = "page")int page, @PathVariable(value = "size")int size) {
        PageInfo pageInfo = $!{tool.firstLowerCase($tableInfo.name)}Service.listPage(page, size);
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, pageInfo);
    }

    @PostMapping("/insert")
    public ResultDTO<$tableInfo.name> insert(@RequestBody $tableInfo.name $!tool.firstLowerCase($tableInfo.name)){
        $!{tool.firstLowerCase($tableInfo.name)}Service.insert($!tool.firstLowerCase($tableInfo.name));
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, $!tool.firstLowerCase($tableInfo.name));
    }
    
    @PostMapping("/insertBatch")
    public ResultDTO<List<$tableInfo.name>> insert(@RequestBody List< $tableInfo.name> $!tool.firstLowerCase($tableInfo.name)s){
        $!{tool.firstLowerCase($tableInfo.name)}Service.insertBatch($!tool.firstLowerCase($tableInfo.name)s);
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, $!tool.firstLowerCase($tableInfo.name)s);
    }

    @PutMapping("/update")
    public ResultDTO<Boolean> update(@RequestBody $tableInfo.name $!tool.firstLowerCase($tableInfo.name)){
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, $!{tool.firstLowerCase($tableInfo.name)}Service.update($!tool.firstLowerCase($tableInfo.name))==1);
    }
    
    @PutMapping("/updateBatch")
    public ResultDTO<Boolean> update(@RequestBody List<$tableInfo.name> $!tool.firstLowerCase($tableInfo.name)s){
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, $!{tool.firstLowerCase($tableInfo.name)}Service.updateBatch($!tool.firstLowerCase($tableInfo.name)s) == $!tool.firstLowerCase($tableInfo.name)s.size());
    }

    @DeleteMapping("/delete/{$!pk.name}")
    public ResultDTO<Boolean> deleteOne(@PathVariable $!pk.shortType $!pk.name){
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, $!{tool.firstLowerCase($tableInfo.name)}Service.deleteById($!pk.name)==1);
    }
    
    @DeleteMapping("/deleteByEntity/{$!pk.name}")
    public ResultDTO<Boolean> deleteOne(@RequestBody $tableInfo.name $!tool.firstLowerCase($tableInfo.name)){
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, $!{tool.firstLowerCase($tableInfo.name)}Service.deleteByEntity($!tool.firstLowerCase($tableInfo.name)) == 1);
    }

    @DeleteMapping("/delete")
    public ResultDTO<Integer> deleteBatch(@RequestBody List<$!pk.shortType> $!{pk.name}s){
        int result = 0;
        if ($!{pk.name}s!=null&&$!{pk.name}s.size()>0){ 
            result = $!{tool.firstLowerCase($tableInfo.name)}Service.deleteByIds($!{pk.name}s);
        }
        return new ResultDTO<>(true, ResultCode.SUCCESS, ResultCode.MSG_SUCCESS, result);
    }

}
```

##### entity

```java
##引入宏定义
$!init
$!define

##使用宏定义设置回调（保存位置与文件后缀）
#save("/entity", ".java")

##使用宏定义设置包后缀
#setPackageSuffix("entity")

##使用全局变量实现默认包导入
$!autoImport
import java.io.Serializable;
 
##使用宏定义实现类注释信息
#tableComment("实体类")
public class $!{tableInfo.name} implements Serializable {
    private static final long serialVersionUID = $!tool.serial();
#foreach($column in $tableInfo.fullColumn)
    #if(${column.comment})
    /**
      *${column.comment}
      */
    #end
 
    private $!{tool.getClsNameByFullName($column.type)} $!{column.name};
#end

#foreach($column in $tableInfo.fullColumn)
    ##使用宏定义实现get,set方法
    #getSetMethod($column)
#end
 
}
```

