---
title: pyGetterSetter
date: 2020-04-13
banner_img: /img/python.jpg
tags: 
 - python
categories:
 - 日志
---

Java中我们在定义类的成员变量时，如果是私有属性，我们通过调用属性对应的set和get方法来获取和设置变量的值，如果我们将这种方式来用于python那么代码如下:
```# coding=utf-8
class Money(object):
    def __init__(self):
        self.money = 0
 
    def getMoney(self):
        return self.money
 
    def setMoney(self, value):
        if isinstance(value, int):
            self.money = value
        else:
            print("error：输入类型与预设类型不一致")
 
 
def main():
    money = Money()
    money.setMoney(10)
    print(money.getMoney())
 
 
if __name__ == '__main__':
    main()

```

但是在python中我们可以利用python属性来实现，代码如下：

```# coding=utf-8
class Money(object):
    def __init__(self):
        self.money = 0
 
    def getMoney(self):
        return self.money
 
    def setMoney(self, value):
        if isinstance(value, int):
            self.money = value
        else:
            print("error：输入类型与预设类型不一致")
 
    dealValue = property(getMoney, setMoney)
 
 
def main():
    money = Money()
    money.dealValue=100
    print(money.dealValue)
 
 
if __name__ == '__main__':
    main()

```

也使用property完全取代get/set

```# coding=utf-8
class Money(object):
    def __init__(self):
        self.__money = 0
 
    @property
    def money(self):
        return self.__money
 
    @money.setter
    def money(self, value):
        if isinstance(value, int):
            self.__money = value
        else:
            print("error：输入类型与预设类型不一致")
 
 
def main():
    a = Money()
    a.money = 10
    print(a.money)
 
 
if __name__ == '__main__':
    main()

```