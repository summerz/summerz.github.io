---
slug: 2006/04/13-2
title: "IE 주소바 위장 취약점이 발견되었다고 합니다."
date: 2006-04-13T18:15:53
authors: summerz
tags:
  - "something useful"
  - "정보"
  - "보안"
  - "피싱"
  - "취약점"
  - "인터넷 익스플로러"
---

출처는 [**시스템 관리자의 쉼터, 커피닉스**](http://coffeenix.net/)의 [**\*NIX / IT 정보 게시판의 글**](http://coffeenix.net/bbs/viewtopic.php?t=1193)입니다.  

<!-- truncate -->

간단하게 이야기하면 인터넷 익스플로러의 주소창의 주소와 실제 연결되는 주소가 다를 수 있는 취약점이라고 합니다. 꼼짝없이 낚시질 (피싱, pishing, **private data + fishing**)에 당할 수 있다는 뜻이지요.  
  

**이 취약점을 다음의 링크에서 확인할 수 있다고 합니다.**  
  
http://secunia.com/Internet\_Explorer\_Address\_Bar\_Spoofing\_Vulnerability\_Test/  
  
문제점이 있는 브라우저는 주소창의 주소가 http://www.google.com/ 이라고 표시되고,  
문제점이 없으면 secunia.com/ 이라고 표시될 거라고 합니다.

  
제 환경은 XP sp2 + IE 6.0 입니다. 제 인터넷 익스플로러에서도 http://www.google.com/ 로 표시됩니다. 현재 모든 보안 업데이트를 한 상태인데 말이죠. 어떻게 해야 하는지 모르겠습니다. @.@
