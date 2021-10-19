---
title: mall_attr
date: 2021-06-23 08:44:16
banner_img: /img/java.jpg
index_img: /img/java.png
sidebar: 'auto'
isShowComments: true
tags: 
 - mall
categories:
 - project
 - mall
---

# 商城业务流程分析

## SKU和SPU属性分析

#### iphone xs ｜ iphone xs max ｜ iphon x  ->SPU包括 每款机型的像素，尺寸，分辨率。。。。

#### 不同版本对应SKU，具体的某个版本-内存-颜色，即讲SPU的参数构建成一个机型

### 基本属性

![image-20210623092252195](https://tva1.sinaimg.cn/large/008i3skNgy1grrxujysilj30d90ayq48.jpg)

### 销售属性

#### 不同版本 销售属性不同

![image-20210623093716694](https://tva1.sinaimg.cn/large/008i3skNgy1grry9g6vozj30c6054ta0.jpg)

#### 左边参数名称为SPU，右边具体参数为SKU

- 同一个SPU商品，共享  商品介绍，规格于包装
- 属性都是与三级分类组织，每一个分类一个属性列表，列表包含许多组，每一个组包含具体某一个参数，例如，手机->iphonx->64G && 银色->{主芯片，存储}
- 规格参数中，部分属性提供检索

## 品牌关联分类

### 每新增一个品牌就会固定一个分类，或者多个分类，一次关联一次数据pms_category_brand_relation

## 物品属性

### 属性列表查询

##### 三级分类Id获取属性列表,如果Id为0表示查询所有

- 存在三级分类Id
- 每次点击三级分类的标签，动态更新物品属性信息
- 并且附带检索条件->描述或者组Id

### 新增属性组

- @JsonInclude——ALWAYS——NOT_EMPTY 字段根据条件判断是否返回数据

### 属性组列表查询

- attrGroupId 查询三级分类完整路径-> 查询该属性组是那个具体分类，根据分类Id查询父级

- 会有一个三级分类选择当前属性是那个三级分类的，需要用到三级选择器->根据组id查询三级完整路径

