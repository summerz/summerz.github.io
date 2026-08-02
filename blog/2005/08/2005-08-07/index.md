---
slug: 2005/08/07
title: "mySQL에서 정렬(order by)이 안될 때."
date: 2005-08-07T22:13:12
authors: summerz
tags:
  - "something useful"
  - "정보"
  - "MYSQL"
  - "문제해결"
---

mySQL에서 varchar로 잡힌 필드를 정렬(order by)할 때 만약 원하는 값이 나오지 않는다면 BINARY()를 이용하는 것이 해결책이 될 수 있다.  

<!-- truncate -->

예를 들어,  
  

CREATE TABLE `my\_table` (  
`idx` mediumint(8) unsigned NOT NULL auto\_increment,  
`id` varchar(20) NOT NULL default '',  
`pass` varchar(20) NOT NULL default '',  
`name` varchar(20) NOT NULL default '',  
`email` varchar(35) NOT NULL default '',  
PRIMARY KEY (`idx`)  
)

  
일 때, 쿼리문이 다음과 같을 때,  
  

SELECT \* FROM `my\_table` ORDER BY name;

  
원하는 정렬 결과가 나오지 않는다면 다음과 같이 하면 된다.  
  

SELECT \* FROM `my\_table` ORDER BY **BINARY(**name**)**;

  
**이 방법은 varchar 등으로 정의된 필드에 한글이 입력되어 있고, order by로 정렬이 제대로 되지 않을 때 사용 가능하다.**  
  
감사합니다. [소프님](http://www.and.pe.kr), [드림님](http://dream.nmain.net/). :)
