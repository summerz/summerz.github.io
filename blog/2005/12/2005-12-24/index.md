---
slug: 2005/12/24
title: "Adobe Acrobat Reader 로딩 속도를 빠르게."
date: 2005-12-24T13:38:39
authors: summerz
tags:
  - "something useful"
  - "정보"
  - "Acrobat"
---

1. Adobe Acrobat Reader가 설치된 폴더를 찾아 들어간다.  
(예: C:\Program Files\Adobe\Acrobat 6.0\Reader\)  

<!-- truncate -->

2. EWH32.api, printme.api, and search.api를 제외한 plug\_ins 폴더 안의 모든 파일/폴더를 Optional 폴더로 옮긴다.  
  
3. 끝-

  
이 동작은 리더가 로딩될 때 모든 플러그인들이 동시에 로딩되는 게 아니라 필요할 때마다 불러들이게 하여 최초 로딩 시간이 줄어들게 되는 거라고 한다.  
  
+ 만약 Optional 폴더가 없으면 만들어서 옮기면 된다고 한다.  
++ 기능상의 문제가 생기면 당연히 파일을 원래 위치로 가져다 놓으면 원래대로 돌아온다.  
  
출처 : [Sanjay's Coding Tips](http://sastools.com/b2/post/79394202) 등 여러 사이트
