---
title: DateUtils方法
date: 2020-05-18
banner_img: /img/commons-logo.png
tags: 
 - date
categories:
 - 日志
---

```java
 
    /**
     * 以秒为标准时间的毫秒数
     */
    public static final long MILLIS_PER_SECOND = 1000
    /**
     *以分钟为标准时间的毫秒数
     */
    public static final long MILLIS_PER_MINUTE = 60 * MILLIS_PER_SECOND
    /**
     *以小时为标准时间的毫秒数
     */
    public static final long MILLIS_PER_HOUR = 60 * MILLIS_PER_MINUTE
    /**
     * 以天为标准时间的毫秒数
     */
    public static final long MILLIS_PER_DAY = 24 * MILLIS_PER_HOUR
    /**
     * 这个类型是半个月， 所以这可以代表日期是上还是下半个月 。
     */
    public static final int SEMI_MONTH = 1001
    /**
     * 周范围， 从星期日开始 。
     */
    public static final int RANGE_WEEK_SUNDAY = 1
    /**
     * 周范围，从星期一开始 。
     */
    public static final int RANGE_WEEK_MONDAY = 2
    /**
     * 周范围，从关注的那天开始。
     */
    public static final int RANGE_WEEK_RELATIVE = 3
    /**
     * 周范围，以关注的天为中心。
     */
    public static final int RANGE_WEEK_CENTER = 4
     /**
     * 月范围，从星期日开始 。
     */
    public static final int RANGE_MONTH_SUNDAY = 5
    /**
     * 月范围，从星期一开始 。
     */
    public static final int RANGE_MONTH_MONDAY = 6
     /**
     * 不应在标准编成构造获取实列， 而应该直接使用类中的静态方法，如：DateUtils.parseDate(str) 。
     * 此构造函数意在允许需要一个javabeen实列的工具中使用 。  
     */
    public DateUtils()
    /**
     * 判断两个日期时间是否是同一天 。
     *
     * @param date1  第一个日期，不可修改，非null
     * @param date2  第二个日期，不可修改，非null
     */
    public static boolean isSameDay(final Date date1, final Date date2)
    /**
     * 判断两个日历时间是否是同一天 。   
     *
     * @param cal1  第一个日历，不可修改，非null
     * @param cal2  第二个日历，不可修改，非null
     */
    public static boolean isSameDay(final Calendar cal1, final Calendar cal2)
    /**
     * 判断两个日期是否相同
     * 这种方法比较两个对象的毫秒时间 
     *
     * @param date1  第一个日期，不可修改，非null
     * @param date2  第二个日期，不可修改，非null
     */
    public static boolean isSameInstant(final Date date1, final Date date2)
    /**
     * 判断两个日历是否相同
     * 这种方法比较两个对象的毫秒时间 
     *
     * @param cal1  第一个日历，不可修改，非null
     * @param cal2  第二个日历，不可修改，非null
     */
    public static boolean isSameInstant(final Calendar cal1, final Calendar cal2)
    /**
     * 判断两个日历本地时间是否相同
     * 除了比较数值外两个日历对象的类型还要相同
     *
     * @param cal1  第一个日历，不可修改，非null
     * @param cal2  第二个日历，不可修改，非null
     */
    public static boolean isSameLocalTime(final Calendar cal1, final Calendar cal2)
    /**
     * 尝试用parsePatterns中各种不同的日期格式解析代表时间的字符串str 。
     * 
     * 解析时会逐个使用parsePatterns中的格式，如果都没有匹配上， 则抛出异常ParseException 。
     * 
     * @param str  被解析的时间字符串，非null
     * @param parsePatterns  用于解析str的时间格式，有一个或几个，非null
     */
    public static Date parseDate(final String str, final String... parsePatterns) throws ParseException
    /**
     * 尝试用parsePatterns中各种不同的日期格式解析代表时间的字符串str 。
     * 解析时会使用给定的日期格式符locale 。
     * 
     * 解析时会逐个使用parsePatterns中的格式，如果都没有匹配上， 则抛出异常ParseException 。
     * 
     * @param str  被解析的时间字符串，非null
     * @param locale 使用locale中的日期格式符，如果为null，则使用系统默认的locale
     * @param parsePatterns  用于解析str的时间格式，有一个或几个，非null
     */
    public static Date parseDate(final String str, final Locale locale, final String... parsePatterns) throws ParseException
    /**
     * 尝试用parsePatterns中各种不同的日期格式解析代表时间的字符串str 。
     *
     * 解析时会逐个使用parsePatterns中的格式，如果都没有匹配上， 则抛出异常ParseException 。
     * 解析器解析严格不允许的日期， 如："February 942, 1996" 。
     * 
     * @param str  被解析的时间字符串，非null
     * @param parsePatterns  用于解析str的时间格式，有一个或几个，非null
     */
    public static Date parseDateStrictly(final String str, final String... parsePatterns) throws ParseException
    /**
     * 尝试用parsePatterns中各种不同的日期格式解析代表时间的字符串str 。
     * 解析时会使用给定的日期格式符locale 。
     *
     * 解析时会逐个使用parsePatterns中的格式，如果都没有匹配上， 则抛出异常ParseException 。
     * 解析器解析严格不允许的日期， 如："February 942, 1996" 。
     * 
     * @param str  被解析的时间字符串，非null
     * @param locale 使用locale中的日期格式符，如果为null，则使用系统默认的locale
     * @param parsePatterns  用于解析str的时间格式，有一个或几个，非null
     */
    public static Date parseDateStrictly(final String str, final Locale locale, final String... parsePatterns) throws ParseException
    /**
     * 在日期date上增加amount年 。
     *
     * @param date  处理的日期，非null
     * @param amount  要加的年数，可能为负数
     */
    public static Date addYears(final Date date, final int amount)
    /**
     * 在日期date上增加amount月 。
     *
     * @param date  处理的日期，非null
     * @param amount  要加的月数，可能为负数
     */
    public static Date addMonths(final Date date, final int amount)
    /**
     * 在日期date上增加amount周 。
     *
     * @param date  处理的日期，非null
     * @param amount  要加的周数，可能为负数
     */
    public static Date addWeeks(final Date date, final int amount)
    /**
     * 在日期date上增加amount天 。
     *
     * @param date  处理的日期，非null
     * @param amount  要加的天数，可能为负数
     */
    public static Date addDays(final Date date, final int amount)
    /**
     * 在日期date上增加amount小时 。
     *
     * @param date  处理的日期，非null
     * @param amount  要加的小时数，可能为负数
     */
    public static Date addHours(final Date date, final int amount)
    /**
     * 在日期date上增加amount分钟 。
     *
     * @param date  处理的日期，非null
     * @param amount  要加的分钟数，可能为负数
     */
    public static Date addMinutes(final Date date, final int amount)
    /**
     * 在日期date上增加amount秒 。
     *
     * @param date  处理的日期，非null
     * @param amount  要加的秒数，可能为负数
     */
    public static Date addSeconds(final Date date, final int amount)
    /**
     * 在日期date上增加amount 毫秒 。
     *
     * @param date  处理的日期，非null
     * @param amount  要加的毫秒数，可能为负数
     */
    public static Date addMilliseconds(final Date date, final int amount)
     /**
     * 给日期data设置一个新的年份 。
     *
     * @param date 处理的日期，非null
     * @param amount 要设置的年份
     */
    public static Date setYears(final Date date, final int amount)
     /**
     * 给日期data设置一个新的月份 。
     *
     * @param date 处理的日期，非null
     * @param amount 要设置的月份
     */
    public static Date setMonths(final Date date, final int amount)
    /**
     * 给日期data设置一个新的天 。
     *
     * @param date 处理的日期，非null
     * @param amount 要设置的天
     */
    public static Date setDays(final Date date, final int amount)
    /**
     * 给日期data设置一个新的小时 。
     *
     * @param date 处理的日期，非null
     * @param amount 要设置的小时
     */
    public static Date setHours(final Date date, final int amount)
     /**
     * 给日期data设置一个新的分钟 。
     *
     * @param date 处理的日期，非null
     * @param amount 要设置的分钟
     */
    public static Date setMinutes(final Date date, final int amount)
    /**
     * 给日期data设置一个新的秒 。
     *
     * @param date 处理的日期，非null
     * @param amount 要设置的秒
     */
    public static Date setSeconds(final Date date, final int amount)
    /**
     * 给日期data设置一个新的毫秒 。
     *
     * @param date 处理的日期，非null
     * @param amount 要设置的毫秒
     */
    public static Date setMilliseconds(final Date date, final int amount)
    /**
     * 将一个日期放到日历中 。
     */
    public static Calendar toCalendar(final Date date)
    /**
     * 根据阈值field四舍五入日历date 。
     *
     * 例如， 如果你的时间是 28 Mar 2002 13:45:01.231，
     * 如果field为HOUR，它将返回 28 Mar 2002 14:00:00.000；
     * 如果field为MONTH，它将返回 1 April 2002 0:00:00.000 。
     * 
     * @param date  处理的日期，非null
     * @param field  阈值
     */
    public static Date round(final Date date, final int field)
    /**
     * 根据阈值field四舍五入日历date 。
     *
     * 例如， 如果你的时间是 28 Mar 2002 13:45:01.231，
     * 如果field为HOUR，它将返回 28 Mar 2002 14:00:00.000；
     * 如果field为MONTH，它将返回 1 April 2002 0:00:00.000 。
     * 
     * @param date  处理的日期，非null
     * @param field  阈值  
     */
    public static Calendar round(final Calendar date, final int field)
    /**
     * 根据阈值field四舍五入日历date 。
     *
     * 例如， 如果你的时间是 28 Mar 2002 13:45:01.231，
     * 如果field为HOUR，它将返回 28 Mar 2002 14:00:00.000；
     * 如果field为MONTH，它将返回 1 April 2002 0:00:00.000 。
     * 
     * @param date  处理的日期，非null
     * @param field  阈值 
     */
    public static Date round(final Object date, final int field)
    /**
     * 根据阈值field截取日期date 。
     *
     * 例如， 如果你的时间是 28 Mar 2002 13:45:01.231，
     * 如果field为HOUR，它将返回 28 Mar 2002 13:00:00.000；
     * 如果field为MONTH，它将返回 1 Mar 2002 0:00:00.000 。
     * 
     * @param date  处理的日期，非null
     * @param field  阈值 
     */
    public static Date truncate(final Date date, final int field)
     /**
     * 根据阈值field截取日历date 。
     *
     * 例如， 如果你的时间是 28 Mar 2002 13:45:01.231，
     * 如果field为HOUR，它将返回 28 Mar 2002 13:00:00.000；
     * 如果field为MONTH，它将返回 1 Mar 2002 0:00:00.000 。
     * 
     * @param date  处理的日期，非null
     * @param field  阈值
     */
    public static Calendar truncate(final Calendar date, final int field)
    /**
     * 根据阈值field截取日期date 。
     *
     * 例如， 如果你的时间是 28 Mar 2002 13:45:01.231，
     * 如果field为HOUR，它将返回 28 Mar 2002 13:00:00.000；
     * 如果field为MONTH，它将返回 1 Mar 2002 0:00:00.000 。
     * 
     * @param date  处理的日期，非null
     * @param field  阈值
     */
    public static Date truncate(final Object date, final int field)
    /**
     * 根据阈值field向上舍入日期date 。
     *
     * 例如， 如果你的时间是 28 Mar 2002 13:45:01.231，
     * 如果field为HOUR，它将返回 28 Mar 2002 14:00:00.000；
     * 如果field为MONTH，它将返回 1 Apr 2002 0:00:00.000 。
     * 
     * @param date  处理的日期，非null
     * @param field  阈值
     */
    public static Date ceiling(final Date date, final int field)
    /**
     * 根据阈值field向上舍入日期date 。
     *
     * 例如， 如果你的时间是 28 Mar 2002 13:45:01.231，
     * 如果field为HOUR，它将返回 28 Mar 2002 14:00:00.000；
     * 如果field为MONTH，它将返回 1 Apr 2002 0:00:00.000 。
     * 
     * @param date  处理的日期，非null
     * @param field  阈值
     */
    public static Calendar ceiling(final Calendar date, final int field)
    /**
     * 根据阈值field向上舍入日期date 。
     *
     * 例如， 如果你的时间是 28 Mar 2002 13:45:01.231，
     * 如果field为HOUR，它将返回 28 Mar 2002 14:00:00.000；
     * 如果field为MONTH，它将返回 1 Apr 2002 0:00:00.000 。
     * 
     * @param date  处理的日期，非null
     * @param field  阈值
     */
    public static Date ceiling(final Object date, final int field)
    /**
     * 根据指定的时间focus和范围类型rangeStyle构建一个时间范围迭代器 。
     *
     * 如传入的时间是Thursday, July 4, 2002，范围类型是RANGE_MONTH_SUNDAY，
     * 则返回迭代器的范围是从Sunday, June 30, 2002 到 Saturday, August 3, 2002
     *
     * @param focus  指定的时间
     * @param rangeStyle  范围类型，值必须是如下之一：
     * DateUtils.RANGE_MONTH_SUNDAY， 
     * DateUtils.RANGE_MONTH_MONDAY，
     * DateUtils.RANGE_WEEK_SUNDAY，
     * DateUtils.RANGE_WEEK_MONDAY，
     * DateUtils.RANGE_WEEK_RELATIVE，
     * DateUtils.RANGE_WEEK_CENTER
     */
    public static Iterator<Calendar> iterator(final Date focus, final int rangeStyle)
    /**
     * 根据指定的时间focus和范围类型rangeStyle构建一个时间范围迭代器 。
     *
     * 如传入的时间是Thursday, July 4, 2002，范围类型是RANGE_MONTH_SUNDAY，
     * 则返回迭代器的范围是从Sunday, June 30, 2002 到 Saturday, August 3, 2002
     *
     * @param focus  指定的时间
     * @param rangeStyle  范围类型，值必须是如下之一：
     * DateUtils.RANGE_MONTH_SUNDAY， 
     * DateUtils.RANGE_MONTH_MONDAY，
     * DateUtils.RANGE_WEEK_SUNDAY，
     * DateUtils.RANGE_WEEK_MONDAY，
     * DateUtils.RANGE_WEEK_RELATIVE，
     * DateUtils.RANGE_WEEK_CENTER
     */
    public static Iterator<Calendar> iterator(final Calendar focus, final int rangeStyle)
    /**
     * 根据指定的时间focus和范围类型rangeStyle构建一个时间范围迭代器 。
     *
     * 如传入的时间是Thursday, July 4, 2002，范围类型是RANGE_MONTH_SUNDAY，
     * 则返回迭代器的范围是从Sunday, June 30, 2002 到 Saturday, August 3, 2002
     *
     * @param focus  指定的时间
     * @param rangeStyle  范围类型，值必须是iterator(Calendar, int)方法注释中列出的
     */
    public static Iterator<?> iterator(final Object focus, final int rangeStyle)
 
/**
     * 返回指定分段内的毫秒数 。 所有大于分段的DateFields将被忽略 。
     *
     * 请求任何日期毫秒，将返回当前秒的毫秒数 (返回一个数字在0和999之间) 。
     * 有效的分段值是： Calendar.YEAR、Calendar.MONTH、Calendar.DAY_OF_YEAR、
     * Calendar.DATE、Calendar.HOUR_OF_DAY、Calendar.MINUTE、
     * Calendar.SECOND 和 Calendar.MILLISECOND
     * 分段值小于或等于MILLISECOND，将返回0 。
     * 
     *  January 1, 2008 7:15:10.538 with Calendar.SECOND as fragment will return 538
     *  January 6, 2008 7:15:10.538 with Calendar.SECOND as fragment will return 538
     *  January 6, 2008 7:15:10.538 with Calendar.MINUTE as fragment will return 10538
     *  January 16, 2008 7:15:10.538 with Calendar.MILLISECOND as fragment will return 0
     *   (a millisecond cannot be split in milliseconds)
     * 
     * @param calendar 获取值得日历对象，非null
     * @param fragment 分段值
     */
  public static long getFragmentInMilliseconds(final Calendar calendar, final int fragment)
    /**
     * 返回指定分段内的秒数 。 所有大于分段的DateFields将被忽略 。
     *
     * 请求任何日期秒，将返回当前的分钟的秒数 (返回一个数字在0和59之间) 。
     * 有效的分段值是： Calendar.YEAR、Calendar.MONTH、Calendar.DAY_OF_YEAR、
     * Calendar.DATE、Calendar.HOUR_OF_DAY、Calendar.MINUTE、
     * Calendar.SECOND 和 Calendar.MILLISECOND
     * 分段值小于或等于SECOND，将返回0 。
     * 
     *  January 1, 2008 7:15:10.538 with Calendar.MINUTE as fragment will return 10
     *  January 6, 2008 7:15:10.538 with Calendar.MINUTE as fragment will return 10
     *  January 6, 2008 7:15:10.538 with Calendar.DAY_OF_YEAR as fragment will return 26110
     *   (7*3600 + 15*60 + 10)</li>
     *  January 16, 2008 7:15:10.538 with Calendar.MILLISECOND as fragment will return 0
     * 
     * @param calendar 获取值得日历对象，非null
     * @param fragment 分段值
     */
    public static long getFragmentInSeconds(final Calendar calendar, final int fragment)
    /**
     * 返回指定分段内的分钟数 。 所有大于分段的DateFields将被忽略 。
     *
     * 请求任何日期分钟，将返回当前的小时的分钟数 (返回一个数字在0和59之间)
     * 有效的分段值是： Calendar.YEAR、Calendar.MONTH、Calendar.DAY_OF_YEAR、
     * Calendar.DATE、Calendar.HOUR_OF_DAY、Calendar.MINUTE、
     * Calendar.SECOND 和 Calendar.MILLISECOND
     * 分段值小于或等于MINUTE，将返回0 。
     * 
     *  January 1, 2008 7:15:10.538 with Calendar.HOUR_OF_DAY as fragment will return 15
     *  January 6, 2008 7:15:10.538 with Calendar.HOUR_OF_DAY as fragment will return 15
     *  January 1, 2008 7:15:10.538 with Calendar.MONTH as fragment will return 15
     *  January 6, 2008 7:15:10.538 with Calendar.MONTH as fragment will return 435 (7*60 + 15)
     *  January 16, 2008 7:15:10.538 with Calendar.MILLISECOND as fragment will return 0
     * 
     * @param calendar 获取值得日历对象，非null
     * @param fragment 分段值
     */
    public static long getFragmentInMinutes(final Calendar calendar, final int fragment)
    /**
     * 返回指定分段内的小时数 。 所有大于分段的DateFields将被忽略 。
     *
     * 请求任何日期小时，将返回当前的天的小时数 (返回一个数字在0和23之间) 。
     * 有效的分段值是： Calendar.YEAR、Calendar.MONTH、Calendar.DAY_OF_YEAR、
     * Calendar.DATE、Calendar.HOUR_OF_DAY、Calendar.MINUTE、
     * Calendar.SECOND 和 Calendar.MILLISECOND
     * 分段值小于或等于HOUR_OF_DAY，将返回0 。
     *  
     *  January 1, 2008 7:15:10.538 with Calendar.DAY_OF_YEAR as fragment will return 7
     *  January 6, 2008 7:15:10.538 with Calendar.DAY_OF_YEAR as fragment will return 7
     *  January 1, 2008 7:15:10.538 with Calendar.MONTH as fragment will return 7
     *  January 6, 2008 7:15:10.538 with Calendar.MONTH as fragment will return 127 (5*24 + 7)
     *  January 16, 2008 7:15:10.538 with Calendar.MILLISECOND as fragment will return 0
     *  
     * @param calendar 获取值得日历对象，非null
     * @param fragment 分段值
     */
    public static long getFragmentInHours(final Calendar calendar, final int fragment)
    /**
     * 返回指定分段内的天数 。 所有大于分段的DateFields将被忽略 。
     *
     * 请求任何日期天数，将返回当前的月的天数 (返回一个数字在1和31之间) 。
     * 有效的分段值是： Calendar.YEAR、Calendar.MONTH、Calendar.DAY_OF_YEAR、
     * Calendar.DATE、Calendar.HOUR_OF_DAY、Calendar.MINUTE、
     * Calendar.SECOND 和 Calendar.MILLISECOND
     * 分段值小于或等于DATE，将返回0 。
     * 
     *  January 28, 2008 with Calendar.MONTH as fragment will return 28
     *  February 28, 2008 with Calendar.MONTH as fragment will return 28
     *  January 28, 2008 with Calendar.YEAR as fragment will return 28
     *  February 28, 2008 with Calendar.YEAR as fragment will return 59
     *  January 28, 2008 with Calendar.MILLISECOND as fragment will return 0
     * 
     * @param calendar 获取值得日历对象，非null
     * @param fragment 分段值
     */
    public static long getFragmentInDays(final Calendar calendar, final int fragment)
    /**
     * 截取比较两个日历对象的field处的值是否相同 。
     * 
     * @param cal1 第一个日历对象，非null
     * @param cal2 第二个日历对象，非null
     * @param field Calendar中的阈值
     */
    public static boolean truncatedEquals(final Calendar cal1, final Calendar cal2, final int field)
    /**
     * 截取比较两个日期对象的field处的值是否相同 。
     * 
     * @param date1 第一个日期对象，非null
     * @param date2 第二个日期对象，非null
     * @param field Calendar中的阈值
     */
    public static boolean truncatedEquals(final Date date1, final Date date2, final int field)
    /**
     * 截取比较两个日历对象的field处的值 。
     * 如果第一个日历小于、等于、大于第二个，则对应返回负整数、0、正整数
     * 
     * @param cal1 第一个日历对象，非null
     * @param cal2 第二个日历对象，非null
     * @param field Calendar中的阈值
     */
    public static int truncatedCompareTo(final Calendar cal1, final Calendar cal2, final int field)
    /**
     * 截取比较断两个日期对象的field处的值 。
     * 如果第一个日期小于、等于、大于第二个，则对应返回负整数、0、正整数
     * 
     * @param date1 第一个日期对象，非null
     * @param date2 第二个日期对象，非null
     * @param field Calendar中的阈值
     */
    public static int truncatedCompareTo(final Date date1, final Date date2, final int field)
```

