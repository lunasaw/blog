---
title: 逻辑运算符
date: 2020-11-28
banner_img: /img/java2.jpg
index_img: /img/java.png
tags: 
 - logic
categories:
 - java

---

## 逻辑运算符(and, or, nor)

and & 

规则: 1&1 = 1; 1&0 = 0; 0&1 = 0; 0&0 =0

运用：and al, 10111111B

将0位对应的数值置为0

将1位对应的数值保持不变

 

or |

规则：1|1 = 1； 1|0 = 1； 0|1 = 1； 0|0 = 0

运用：or al， 10111111B

将0位对用的数值保持不变

将1位对应的数值置为1

 

xor ^

异或，英文为exclusive OR，缩写成xor

异或（eor）是一个数学运算符。它应用于[逻辑运算](https://baike.baidu.com/item/逻辑运算/7224729)。异或的数学符号为“⊕”，计算机符号为“eor”。其运算法则为：

a⊕b = (¬a ∧ b) ∨ (a ∧¬b)

规则：1^1 = 0; 1^0 = 1; 0^1 = 1; 0^0 = 0

运用：a^b^b == a;

小技巧：不用第三个变量交换变量内容

a = a^b; 

b = a^b;  //此时 b = a0; 

a = a^b;  //此时 a = (a0^b0)^a0 = b0;



nor

同或运算 = 异或运算  ^  1

​           (A  ^  B)  ^  1 

相同出1，不同出0

&&  

并且

|| 

或者

！

非 取反