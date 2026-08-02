---
slug: 2006/02/26-4
title: "인터넷 익스플로러에서 퀵타임 무비가 안보일 때"
date: 2006-02-26T23:42:42
authors: summerz
tags:
  - "something useful"
  - "정보"
  - "퀵타임"
  - "ActiveX"
  - "문제해결"
---

브라우저로 인터넷 익스플로러 (Internet Explorer)를 사용하는 분 중에 애플사의 퀵타임 (Quicktime)을 제대로 설치했는데도 브라우저 상에서 퀵타임 무비가 제대로 보이지 않는 경우가 있습니다.  

<!-- truncate -->

이 경우엔 대부분 파이어폭스 등 다른 브라우저에서는 제대로 보이지만, 유독 인터넷 익스플로러에서만 이 퀵타임 무비가 보이지 않는 경우가 많습니다.  
  
[killbit-0.gif](./killbit-0.gif)  
그럴 때는 대부분 킬빗 (Killbit)에 퀵타임까지 설정되어 있기 때문이라고 하는군요. 이 킬빗 (Killbit)이란 쉽게 말하면 인터넷 익스플로러를 통해 특정 액티브엑스 컨트롤 ((ActiveX Control) 이 실행되는 걸 막아주는 것을 뜻합니다. 바이러스로 말하자면 예방 백신(?) 정도 되겠군요. 즉, 킬빗 설정에 들어있는 이 퀵타임의 CLSID (class id)를 빼주면 됩니다.  
  
**퀵타임의 CLSID는 {02BF25D5-8C17-4B23-BC80-D3488ABDDC6B} 입니다.**  
  
분명 자신의 시스템에 이 CLSID를 관리(?)하는 프로그램이 깔려있을 것입니다. (혹은 예전에 그런 프로그램을 수행한 적이 있든지) 따라서, 그 프로그램의 설정에서 위의 CLSID를 삭제해 주면 (차단된 걸 풀어 주면) 됩니다.  
  
본인의 예를 들면 지금은 업데이트가 중지된 **애드프리**를 사용하고 있는데, 이 애드프리의 ActiveX 차단 메뉴를 열어서 확인해보면 다음과 같은 부분이 있는 걸 확인할 수 있습니다.  
  
[killbit-1.gif](./killbit-1.gif)  
분명 여기에 체크가 되어 있을 것입니다. 모든 인터넷 익스플로러 창을 닫은 후 **이 체크를 해지**합니다. (다른 프로그램을 사용하고 있더라도 비슷한 과정으로 찾으세요.) 그런 후 다시 인터넷 익스플로러를 열어서 확인해보면 퀵타임이 제대로 재생되고 있는 걸 확인할 수 있을 것입니다.  
  
[killbit-2.gif](./killbit-2.gif)  
레지스트리를 직접 만져서 할 수 있는 방법도 있을 것 같은데, 그건 제가 몰라서 프로그램을 이용하는 방법으로 설명하였습니다.  
  

**참고사항**  
  
즉, 이와 같은 사항은 웹페이지에 퀵타임 무비를 올릴 때 사용하는 코드에서도 확인될 수 있습니다.  
  

포스터무비가 없는 경우(일반적인 경우)의 코드 보기

<object classid="**clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B**" codebase="http://www.apple.com/qtactivex/qtplugin.cab" width="무비의폭" height="무비의높이" hspace="가로여백" vspace="세로여백">  
<param name="src" value="파일명.mov" />  
<param name="controller" value="false" />  
<param name="pluginspage" value="http://www.apple.com/QuickTime/download/" />   
  
<embed src="파일명.mov" width="무비의폭" height="무비의높이" hspace="가로여백" vspace="세로여백" controller="false" autoplay="false" pluginspage="http://www.apple.com/QuickTime/download/">   
</embed>   
</object>

  

포스터무비가 있는 경우의 코드 보기

<object classid="**clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B**" codebase="http://www.apple.com/qtactivex/qtplugin.cab" width="무비의폭" height="무비의높이" hspace="가로여백" vspace="세로여백">  
<param name="src" value="포스터무비.mov" />  
<param name="controller" value="false" />  
<param name="target" value="myself" />  
<param name="href" value="파일명.mov" />  
<param name="pluginspage" value="http://www.apple.com/QuickTime/download/" />   
  
<embed src="포스터무비.mov" width="무비의폭" height="무비의높이" hspace="가로여백" vspace="세로여백" controller="false" target="myself" href="파일명.mov" autoplay="false" pluginspage="http://www.apple.com/QuickTime/download/">   
</embed>   
</object>

  

**그리고**  
  
1. 애드프리의 업데이트가 중지된 후에는 (애드프리 제작자인 LOSER님이 [추천](http://loser.miniwini.com/wp/archives/25)하신) [**Spyware Blaster**](http://www.javacoolsoftware.com/spywareblaster.html)를 사용하고 있습니다.  
  
무료이며, 인터넷 익스플로러는 물론 파이어폭스까지 스파이웨어로부터 컴퓨터를 보호(예방)해줍니다. 단, DB의 업데이트는 수동으로 해야합니다.  
  
2. 애플의 퀵타임보다는 [**Quicktime Alternative**](http://www.free-codecs.com/QuickTime_Alternative_download.htm) 라는 프로그램이 훨씬 가볍고 좋습니다. 퀵타임 무비 보실 분들은 이 프로그램을 추천합니다.
