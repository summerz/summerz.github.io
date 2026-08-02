---
slug: 2005/11/16-2
title: "국민은행 인터넷뱅킹 보안프로그램 문제시 해결법"
date: 2005-11-16T13:42:22
authors: summerz
tags:
  - "something useful"
  - "국민은행"
  - "정보"
  - "인터넷뱅킹"
  - "문제해결"
---

[**국민은행**](http://www.kbstar.com) 인터넷 뱅킹은 2005년 11월 현재 XecureWeb Control을 설치해야 가능하다.  

<!-- truncate -->

보안 프로그램과 공인인증서, 윈도 XP에 관련된 문제 등에 관련되서 문제 발생시 해결법에 대해서 국민은행 사이트는 상담 페이지를 제공하고 있다.  
  
**국민은행 공인인증서 상담 페이지 가기 : http://inf.kbstar.com/quics?page=A005102**  
  
  
그러나, 위의 페이지에 나오지 않는 경우가 있는데 다음과 같다.  
  

인증서창에서 인증서를 선택한 후 비밀번호를 입력하여 로그인을 시도할 때 **"Client Session manager에 문제가 있어서 프로그램을 종료해야 합니다"** 라고 나오며 XecureWeb ClientSM 프로그램이 강제종료되는 경우이다. (XecureWeb ClientSM 버전 : 3.4.5.0 (현재)  
  
만약 오류창에서 자세히 보기 버튼을 누르면 다음과 같이 표시된다.  
  

**AppName:Clientsm.exe AppVer:3.4.5.0  
ModName:unknown ModVer : 0.0.0.0 offset:018518a0**

  
또한 이렇게 강제종료 되고 난 후 바로 아래와 같은 문구가 표시된다.  
  

**에러코드 : SM00905  
보안프로그램 등록이 올바르지 못하거나 잘못되었습니다.  
재설치 하시기 바랍니다.**

  
이것은 아무리 해당 프로그램 (**XecureWeb Control**)을 **[제어판]**의 **[프로그램 추가/삭제]**에 가서 삭제하고 재설치를 해도 풀리지 않는데 해결방법은 의외로 간단하다.  
  

1) [**http://www.kings.co.kr/k/kp.exe**](http://www.kings.co.kr/k/kp.exe) 를 클릭하여 다운을 받는다.  
2) 모든 인터넷 익스플로러 창을 닫고 다운 받은 프로그램을 찾아서 실행시킨다.  
3) 실행시킨 프로그램 창의 우측에 있는 **[장애해결 1]**과 **[장애해결 2]**를 차례로 실행시킨다.  
4) 위와 같이 한 후 다시 인터넷 익스플로러를 실행시켜 국민은행 사이트에 접속하면 해결된다.

  
  
  
**참고사항 1)**  
현재 사용하고 있는 운영체제 : 윈도 XP + 서비스팩 2  
인터넷 익스플로러 버전 : 6.0  
XecureWeb Control 버전 : 5.4  
Xecure ClientSM 버전 : 3.4.5.0  
  
**참고사항 2)**  
위에서 다운받는 프로그램 [**kp.exe**](http://www.kings.co.kr/k/kp.exe)는 [**킹스정보통신(주)**](http://www.kings.co.kr)의 키로깅 방지프로그램 [**k-Defense**](http://www.kings.co.kr/solution.htm)의 장애지원 프로그램이다.
