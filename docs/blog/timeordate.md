---
title: 时间和字符传的转化
date: 2020-04-13
banner_img: /img/java2.jpg
tags: 
 - date
categories:
 - 日志
---

###   时间和字符传的转化

1. 日期转为字符串

   ```java
   import java.text.SimpleDateFormat;
   import java.util.Date;
    
   public class Test01 {
       public static void main(String[] args) {
           Date date = new Date(); //获取当前时间
           System.out.println(date.getClass().getName());  //打印date数据类型
           System.out.println(date);           //打印当前时间
           SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
           String format = sdf.format(date);       //将Date类型转换成String类型   
           System.out.println(format.getClass().getName());//打印format数据类型
           System.out.println(format);　　　　　　　　　　　　//打印当前时间
       }
   }
   
   
   结果：
   java.util.Date
   Tue Dec 26 19:31:48 CST 2017
   java.lang.String
   2017-12-26 19:31:48
   ```

   2. 字符串转为日期
   
    ```java
   import java.text.ParseException;
   import java.text.SimpleDateFormat;
   import java.util.Date;
    
   public class Test01 {
       public static void main(String[] args) {
           String time = "1994-11-24 07:11:24";   
           SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
           try {
               Date date = sdf.parse(time);
               System.out.println(date);
           } catch (ParseException e) {
               // TODO Auto-generated catch block
               e.printStackTrace();
           }
       }
   }	
   
   结果：
   Thu Nov 24 07:11:24 CST 1994
    ```
   
   3. 对日期加减操作, 获得之前, 之后的时间
   
   ```java
   import java.text.SimpleDateFormat;
   import java.util.Date;
    
   public class DateTest {
       public static void main(String[] args) {
           SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
           Date date = new Date();
           long dateTime = date.getTime(); //将date类型转换成long类型进行计算
           System.out.println(sdf.format(date));   //以字符串打印当前时间
            
           long time = (60*60+5)*1000;     //60个60分钟加5分钟，乘以1000，一小时零五分转换成毫秒
           dateTime = dateTime + time;     //将当前时间加上一小时零五分
           System.out.println(sdf.format(new Date(dateTime))); //打印一小时零五分之后的时间
       }
    
   }
    
   结果：
   2018-01-07 08:52:21
   2018-01-07 09:52:26	
   ```
   
   ### 时间和数字的转化
   
   ```java
   package com.drew.utils;
    
   import java.text.SimpleDateFormat;
   import java.util.Date;
    
   /**
    * long类型数字转换成时分秒毫秒格式
    *
    * @author Iszychen 2020/02/19
    */
   public class ConvertorTime {
    
       public static void main(String[] args) {
           int seconds = 17854, msec = 360000;// 秒，毫秒
           System.out.println(secToTime(seconds));
           System.out.println(msec + "毫秒转换格式时间：\t" + msecToTime(msec));
           System.out.println("当前时间（时:分：秒.毫秒）\t" + new SimpleDateFormat("HH:mm:ss.SSS").format(new Date()));
       }
    
       /**
        * 秒转换小时-分-秒analytics/util/DateUtil.java
        *
        * @param seconds 秒为单位 比如..600秒
        * @return 比如...2小时3分钟52秒
        */
       public static String secToTime(int seconds) {
           int hour = seconds / 3600;
           int minute = (seconds - hour * 3600) / 60;
           int second = (seconds - hour * 3600 - minute * 60);
    
           StringBuffer sb = new StringBuffer();
           if (hour > 0) {
               sb.append(hour + "小时");
           }
           if (minute > 0) {
               sb.append(minute + "分");
           }
           if (second > 0) {
               sb.append(second + "秒");
           }
           if (second == 0) {
               sb.append("<1秒");
           }
           return sb.toString();
       }
    
       /**
        * 将int类型数字转换成时分秒毫秒的格式数据
        *
        * @param time long类型的数据
        * @return HH:mm:ss.SSS
        * @author Iszychen 2020/02/19
        */
       public static String msecToTime(int time) {
           String timeStr = null;
           int hour = 0;
           int minute = 0;
           int second = 0;
           int millisecond = 0;
           if (time <= 0)
               return "00:00:00.000";
           else {
               second = time / 1000;
               minute = second / 60;
               millisecond = time % 1000;
               if (second < 60) {
                   timeStr = "00:00:" + unitFormat(second) + "." + unitFormat2(millisecond);
               } else if (minute < 60) {
                   second = second % 60;
                   timeStr = "00:" + unitFormat(minute) + ":" + unitFormat(second) + "." + unitFormat2(millisecond);
               } else {// 数字>=3600 000的时候
                   hour = minute / 60;
                   minute = minute % 60;
                   second = second - hour * 3600 - minute * 60;
                   timeStr = unitFormat(hour) + ":" + unitFormat(minute) + ":" + unitFormat(second) + "."
                       + unitFormat2(millisecond);
               }
           }
           return timeStr;
       }
    
       public static String unitFormat(int i) {// 时分秒的格式转换
           String retStr = null;
           if (i >= 0 && i < 10)
               retStr = "0" + Integer.toString(i);
           else
               retStr = "" + i;
           return retStr;
       }
    
       public static String unitFormat2(int i) {// 毫秒的格式转换
           String retStr = null;
           if (i >= 0 && i < 10)
               retStr = "00" + Integer.toString(i);
           else if (i >= 10 && i < 100) {
               retStr = "0" + Integer.toString(i);
           } else
               retStr = "" + i;
           return retStr;
       }
    
   }	
   ```
   
   ###### 可转为工具类=>测试结果
   
   
   
   ![测试结果](https://img2018.cnblogs.com/blog/1301422/201904/1301422-20190411160134848-2110597655.png)