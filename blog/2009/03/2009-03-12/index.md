---
slug: 2009/03/12
title: "경향닷컴 - 장도리 RSS / 위젯 만들다가..."
date: 2009-03-12T10:30:59
authors: summerz
tags:
  - "media & world"
  - "자바스크립트"
  - "만화"
  - "에러"
  - "feedburner"
  - "경향신문"
  - "만평"
  - "Sprout Builder"
---

[민노씨](http://minoci.net/769)의 글 [언론사(닷컴) 만평 위젯](http://minoci.net/769)을 읽고, "오- 짜잘하지만 (민노씨의 표현^^) 재밌는 아이디어네" 싶은  생각이 들었습니다.  

<!-- truncate -->

그래서, [만화공학자](http://bbs1.agora.media.daum.net/gaia/do/debate/read?bbsId=D003&articleId=2356171&hisBbsId=best&pageIndex=1&sortKey=agreeCount&limitDate=-30&lastLimitDate=)이신 [capcold님](http://capcold.net/blog/)이 인정한 [현존 최강의 만평](http://minoci.net/769#comment17413)인 [경향신문](http://www.khan.co.kr/)의 [장도리](http://news.khan.co.kr/kh_cartoon/khan_index.html?mode=list&code=361102)를 위젯으로 만들어 보려고 시도를 했습니다.  
  
결론부터 말하자면 rss 생성 - 성공 (아싸!) / 위젯 생성 - 실패 (ㅠ.ㅠ) capcold님 도움으로 어쨌거나 성공 (^^)  
  

(1) 장도리의 RSS 만들기 - 성공  
  
링크 : [경향닷컴 - 장도리 RSS](http://feeds2.feedburner.com/khan_jangdori)  
  
많이들 사용하시는 [feed43](http://feed43.com/)로 만들어서 [feedburner](http://feedburner.google.com/)로 구웠습니다.  
feed43을 통해 배달된다는 문구를 제외하고는 심플하게 잘 나옵니다.

  

(2) 내용까지 보여주는 RSS 리더 위젯 찾기 - 못찾음 orz  
  
rss의 내용까지 보여주는 rss 리더 위젯만 찾으면 끝- 할 것 같았는데, 도무지 찾을 수가 없더군요. 구글신에게 부탁하면 바로 나올 줄 알았는데 허무하게 막혀 버리다니... orz  
  
혹시 이런 위젯 아시는 분 계신가요?

  

(3) 그런 위젯 없으면 그냥 만들기 - 잘 안됨 orz  
  
그런 위젯이 없으면 한번 만들어볼까 싶던 차에 [위자드웍스](http://wzdworks.com/)의 [WZDAPI](http://www.wzdapi.com/) 가 있는 걸 기억하고는 테스트라도 해볼까 싶어서 [확인해 봤는데](http://www.wzdapi.com/specification), [예제부터 에러가 나서](http://tutorial.wzdapi.com/preview/03/1) 좌절... orz  
  
... 하다가 실제로 계정에 올려서 해보니 어느 정도는 돌아가는 것 같아서, 자바스크립트, css를 모두 로컬로 가져와서 최대한 원본 파일들에서 삭제 및 주석처리만 하는 수준으로 조물딱 거렸는데...  
  
글쎄, [IE에서는 잘 나오는데](http://summerz.pe.kr/widget/jangdori.html) FF에서는 잘 안나오는군요. DOM 때문에 그런 거 같은데 안본지가 백만년이라 깨작깨작 보는 걸로는 못 고치겠어요. ㅜ.ㅜ (게다가 [프로토타입](http://www.prototypejs.org/)에 소스를 추가해서 확인까지는 너무 어렵다능)  
  
FF에서도 로컬에 있는 XML을 부르면 [인코딩은 깨지지만 내용은 잘 나오는 걸](http://summerz.pe.kr/widget/jangdori.xml.html)로 보아 조금만 고치면 될 건데 말이죠;  
  
요거 되면 이제 자바스크립트로 아이프레임이나 뭐 그런 걸로 씌우면 될 건데 말이죠. =.=  
  
링크 : [테스트해보기 (IE에서는 나오고, FF에서는 안나옵니다 ㄷㄷㄷ)](http://summerz.pe.kr/widget/jangdori.html)

  
저처럼 까막눈이 해도 이 정도 되는 걸로 보아 잘 하시는 분들이 뚝딱 손대면 금방 나올 거 같습니다.  
  
누군가 만들어 주시길... ^^)/  
  

추가)  
  
아래 [capcold님의 말씀](http://blog.summerz.pe.kr/1390#comment1433542)대로 [Sprout Builder](http://sproutbuilder.com/)에 가서 만들어 봤습니다.  
  
아래처럼 까지는 만들 수 있군요. 사이즈가 커서 가로 300px 짜리 이하로는 못 만들겠어요. (실제 만평 가로 사이즈는 226px 인데, 각종 마진과 스크롤바를 맘대로 처리할 수가 없더군요.)  
  
250px 짜리로 만들었습니다. ^^   
  
![](http://counters.gigya.com/wildfire/IMP/CXNID=2000002.11NXC/bT*xJmx*PTEyMzY5MDU2MDk1OTMmcHQ9MTIzNjkwNTYxMTQwNSZwPTEyMDc*MSZkPWFnRHJ4SjM4RTIxdE42TC*mZz*xJnQ9.gif)

  
흐... 좀 뚱뚱한 위젯이긴 하지만 어쨌든 만들긴 만들었군요. :)  
  
원래 의도는 저렇게 스크롤바가 나오는 게 아니라 만평의 일부가 보이게 하는 거였습니다. 즉. 스크롤바는 아예 없고, 만평은 1-2컷만 보이니까 전체를 보고 싶으면 클릭을 해서 해당 신문사 페이지로 가게 하는 겁니다.  
  
그러면 일부를 인용한 게 되고 전체를 보기 위해 자연스럽게 신문사 홈페이지에 방문하게 되고... 저작권 문제도 해결이 될 것 같고... 하지만 Sporut Builder에는 스크롤바를 없애지 못하더군요. (아쉽)
