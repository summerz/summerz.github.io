---
slug: 2009/04/11
title: "어쿠스틱 데일리 링크 #2"
date: 2009-04-11T00:19:57
authors: summerz
tags:
  - "media & world"
  - "유튜브"
  - "Air"
  - "미투데이"
  - "트위터"
  - "페이스북"
  - "크롬"
  - "북마클릿"
---

트위터는 사실 원래의 사이트 [twitter.com](http://twitter.com/) 에서 발생하는 트래픽은 전체 트위터 관련 트래픽의 절반도 차지하지 않는다고 합니다. 실제 사용자도 각종 써드파티 어플들이 아주 활발한 서비스라는 뜻이지요. 저도 파이어폭스의 애드온인 [트위터폭스](https://addons.mozilla.org/en-US/firefox/addon/5081)와 AIR 어플인 [twhirl](http://www.twhirl.org/)을 주력으로 사용하고 있습니다. [TweetDeck](http://www.tweetdeck.com/)이 좋다는 분들이 많은데, 저에게는 아직은 좀 과한 어플인 거 같아요.

<!-- truncate -->

아이팟 터치용 어플로는 [Twittelator Pro](http://www.stone.com/Twittelator/)를 사용합니다. 가격이 좀 쎈 유료 어플이라 좀 부담스럽긴 하지만 완성도가 높습니다. 보통은 무료 어플인 [TwitterFon](http://twitterfon.net/)과 조금 저렴한 유료 어플인 [Tweetie](http://www.atebits.com/tweetie-iphone/) 많이 사용하는 것 같아요.

#

신기해요. 트위터를 많이 제일 많이 사용하는 나이대가 어디인 줄 아세요? 10대? 20대? 아닙니다. [45 ~ 54세가 제일 많이 사용](http://www.theextraordinaries.org/2009/04/twitter-traffic-explodes-twitter-for-volunteers.html)한다는군요. 그 다음이 25 ~ 34세이고요. 대단하지 않나요?

#

요즘은 각종 SNS를 사용하기 위해 직접 웹사이트에 접속하는 대신에 데스크탑 어플들을 많이 사용하는 것 같아요. 이런 데스크탑 어플은 주로 [어도비사의 AIR 플랫폼](http://www.adobe.com/products/air/)을 사용하고요. ([마이크로소프트사의 Silverlight](http://www.microsoft.com/korea/silverlight/)를 사용하는 경우도 있지만 아직은 AIR가 많습니다.) AIR나 Silverlight가 플랫폼으로 인기 있는 이유는 어플을 구동하기 위해 별도의 액티브엑스를 깔지 않아도 되고, PC와 맥에서 공히 돌아가고, 웹에서 다운로드/설치도 매우 쉽기 때문이겠죠.

트위터는 저 위에 설명한 것처럼 [TweetDeck](http://www.tweetdeck.com/)이나 [twhirl](http://www.twhirl.org/) 같은 어플들이 있고, [미투데이](http://me2day.net/)는 미투데이 유저인 [준이아빠님](http://me2day.net/kkh1030)이 만드신 [me2DC](http://me2dayair.googlepages.com/)라는 어플이 있습니다. (다른 멤버에 의해 만들어진 [me2DC 시즌2](http://me2day.net/me2/app/view/a19)도 있지요.) 페이스북도 버전은 아직 낮지만 [Seesmic](http://www.seesmic.com/)에서 만든 [어플](http://www.facebook.com/apps/application.php?id=23723376453)이 있고, [Zebr](http://www.facebook.com/apps/application.php?id=2583021011)도 있고 [facedesk](http://www.robertnyman.com/facedesk/)도 있습니다.

#

몇 년 동안 [파이어폭스](http://www.mozilla.com/firefox/)만 써 왔는데, 몇 일 전부터 자꾸만 구글 [크롬](http://www.google.com/chrome/index.html?hl=ko)에 손이 갑니다. 초기 구동 속도도 빠르고 탭을 많이 띄워도 여전히 속도가 빨라요. [메모리는 더 잡아먹는 것 같은데](http://www.rainyst.com/26) 신기한 일이죠.

크롬은 그 외에도 치명적인 문제가 있더군요. 파이어폭스에 저장되어 있던 북마크를 모두크롬으로 불러들였는데, 주소창에 주소를 입력할 때마다 자동완성 기능이 작동할 때마다 버벅버벅 하더군요. 그래서, 북마크바에 위치하는 북마크들만 남기고 다 지워버렸어요.

#

그래서, 결국은 북마크 대신 여러 서비스를 적극적으로 이용해서 정보를 분산하기로 했어요. 북마크를 많이 쓰면 버벅이니 어쩔 수 있나요. 제가 선택한 방법은 [북마클릿](http://www.jungyunho.com/blog/128063)의 적극적인 활용입니다.

일단 [여기](http://www.labnol.org/internet/guide-to-useful-bookmarklets/7931/)에서 많은 북마클릿을 얻었어요. 제가 유용하게 쓰는 북마클릿들은 [딜리셔스에 저장하기](javascript:(function(){e ='' + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection()  : document.selection.createRange().text);open(' http://del.icio.us/post?v=4;noui=yes;jump=close;url='+encodeURIComponent(location.href)+';title='+encodeURIComponent(document.title)+';notes='+encodeURIComponent(e),'delicious','toolbar=no,width=700,height=400')})()), [스크린 캡쳐하기](javascript:void(window.open('http://kwout.com/grab?address='+document.location.href));), [PDF로 다운로드 하기](javascript:void(window.open('http://www.pdfdownload.org/web2pdf/Default.aspx?left=0&right=0&top=0&bottom=0&page=0&cURL='+document.location.href));), [지메일로 보내기](javascript:popw='';Q='';x=document;y=window;if(x.selection) {Q=x.selection.createRange().text;} else if (y.getSelection) {Q=y.getSelection();} else if (x.getSelection) {Q=x.getSelection();}popw = y.open('https://mail.google.com/mail?view=cm&tf=0&to=&su=' + escape(document.title) + '&body=' + escape(Q) + escape('\n') + escape(location.href),'gmailForm','scrollbars=yes,width=680,height=510,top=175,left=75,status=no,resizable=yes');if (!document.all) T = setTimeout('popw.focus()',50);void(0);), [구글 리더에 RSS 등록하기](javascript:var%20b=document.body;if(b){void(z=document.createElement('script'));void(z.src='http://www.google.com/reader/ui/subscribe-bookmarklet.js');void(b.appendChild(z));}else{location='http://www.google.com/reader/view/feed/'+encodeURIComponent(location.href)}), [구글에서 정의 (definition) 찾기](javascript:d=""+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text);d=d.replace(/\r\n|\r|\n/g," ,");if(!d)d=prompt("Enter the words:", "");if(d!=null)location="http://www.google.com/search?q=define:"+escape(d).replace(/ /g,"+");void(0);) 등입니다.

#

구글이 [유니버설 뮤직 그룹](http://ko.wikipedia.org/wiki/유니버설_뮤직_그룹)과 손을 잡고 [VEVO](http://www.vevo.com/)라는 프리미엄 뮤직 비디오 서비스를 할 예정이라고 하더군요. 유튜브 내에서도 [유료 다운로드 모델을 시험 중](http://futureproof.tistory.com/entry/YouTube-%EB%8F%99%EC%98%81%EC%83%81-%E2%80%98%EC%9C%A0%EB%A3%8C-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%E2%80%99-%EA%B0%9C%EC%8B%9C%E2%80%A6-%EC%88%98%EC%9D%B5%EB%AA%A8%EB%8D%B8-%ED%99%95%EB%B3%B4%EB%A5%BC-%EC%9C%84%ED%95%9C-%EB%AA%A8%EC%83%89)인 것 같던데, 하는 김에 제대로 키워보려는 것 같습니다.

국내 비디오 서비스들은 [수익모델이 없어서 결국 문을 닫거나](http://www.mncast.com/pages/helpdesk/notice_view.asp?seq=521&page=1) 결국은 [액티브엑스를 깔고 사용자 컴퓨터 자원을 사용](http://blog.daum.net/ahahvideo/17945693)하거나 하는 식으로 망가져 가는 반면 유튜브는 새끼를 쳐서 다른 서비스를 만들다니...
