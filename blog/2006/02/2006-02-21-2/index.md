---
slug: 2006/02/21-2
title: "태그 클라우드와 클래식의 태그 페이지의 css를 통일시키기"
date: 2006-02-21T21:55:39
authors: summerz
tags:
  - "something useful"
  - "정보"
  - "태터툴즈"
---

이 수정 방법은 태터툴즈 클래식 오피셜 릴리즈판을 대상으로 합니다.  

<!-- truncate -->

kebie님이 태터툴즈 클래식이 RC 버전일 때 [**관련 태그 클라우드를 표시해주는 방법**](http://kebie.linuxstudy.pe.kr/2005/blog/tt/index.php?pl=77)을 알려주셨습니다. 그런데, 그 이후 오피셜 릴리즈가 나오고 따로 태그 클라우드를 보여주는 페이지 (이하 태그 페이지)가 생겼더라고요. (index.php?mid=tag)  
  
하지만, 이 태그 페이지와 kebie님의 관련 태그 클라우드 보여주는 소스의 css가 일치하지 않아서 이를 일치시키기 위해 소스를 다시 한번 수정했습니다. (적용시켜 분들은 무슨 뜻인지 아시겠지요.) 이대로 하시면 별 문제 없을 듯 합니다만 책임은 못집니다. -\_-) 백업하세요.  
  
수정할 파일은 2개입니다. **inc\_presswork.php** 와 스킨의 **style.css**  
  
 **[수정 사항 보기]** 

[계속 보기] " tt\_lesstext=" **[그만 보기]** " tt\_id="1">   
  

**0** **시작하기 전에**  
  
반드시 [**kebie님의 태터툴즈에서 태그클라우드 사용하기 (버그수정)**](http://kebie.linuxstudy.pe.kr/2005/blog/tt/index.php?pl=77)이 먼저 적용이 되어 있어야 합니다. kebie님의 블로그에 있는 소스를 기준으로 설명합니다.  
  
또한 스킨 파일 (skin.html)에 태터툴즈 오피셜 릴리즈의 태그 페이지와 랜덤 태그 부분이 들어있어야 합니다. 이는 오피셜 릴리즈의 스킨 100\_quan을 참고하시면 되는데, 스킨을 열어서 확인해 보시면 태그 페이지는 스킨에서 [s\_tag] ~ [/s\_tag] 부분이고, 랜덤 태그는 [s\_random\_tags] ~ [/s\_random\_tags] 부분입니다.

  

**1** **get\_tags() 확인** (inc\_presswork.php)  
  
일단 **inc\_presswork.php**를 열어서 kebie님의 방법대로 추가한 **function get\_tags()** 안을 확인합니다. 살펴보면 아래의 두 부분이 있습니다. 잘 봐두시고.  
  

**kebie님 소스 A 부분**  
  
<style type="text/css">  
.mycloud1 { font-size: 88%; color:#c5c5c5; }  
.mycloud2 { font-size: 100%; color:#a2a2a2; }  
.mycloud3 { font-size: 112%; color:#a2a2a2; font-weight:bold; }  
.mycloud4 { font-size: 127%; color:black; font-weight:bold; }  
.mycloud5 { font-size: 130%; color:red; font-weight:bold; }  
</style>

  

**kebie님 소스 B 부분**  
  
if($pcnt>19) $font='mycloud5';  
elseif($pcnt>8) $font='mycloud4';  
elseif($pcnt>3) $font='mycloud3';  
elseif($pcnt>1) $font='mycloud2';  
else $font='mycloud1';

  
위 부분만 간단하게 설명하면, 태그가 전체 글 중에서 1번(혹은 0번) 나오면 mycloud1을 적용, 1번 이상 3번 이하 나오면 mycloud2을 적용, 3번 이상 8번 이하 나오면 mycloud3을 적용, 8번 이상 19번 이하 나오면 mycloud4을 적용, 19번 이상 나오면 mycloud5을 적용하겠다는 뜻입니다.

  

**2** **태그의 레벨을 정하는 함수 추가** (inc\_presswork.php)  
  
위의 1번 kebie님 소스 B 부분을 그대로 차용해서 함수를 하나 만듭니다. 위치는 kebie님의 function get\_tags() 바로 위나 아래에 하는 게 아무래도 편하겠죠.  
  
어쨌든 아래와 같은 함수를 **inc\_presswork.php**에 추가합니다.  
  

function get\_tags\_level($level) {  
if($level>19) $ret = 5;  
elseif($level>8) $ret = 4;  
elseif($level>3) $ret = 3;  
elseif($level>1) $ret = 2;  
else $ret = 1;  
  
return $ret;  
}

  

**3** **태그 페이지를 위한 수정** (inc\_presswork.php)  
  
inc\_presswork.php의 중간 부분을 보면 다음과 같은 소스가 있습니다.  
  

if (count($tag\_set)) foreach($tag\_set as $k => $v) {  
**$v = 6 - $v;  
if ($v < 1) $v = 1;**

  
이 부분을 다음과 같이 고칩니다. (굵은 글씨를 고칩니다.)  
  

if (count($tag\_set)) foreach($tag\_set as $k => $v) {  
**$v = get\_tags\_level($v);**

  
이 수정은 태그 페이지 (index.php?md=tag)를 위한 것입니다.

  

**4** **랜덤 태그를 위한 수정** (inc\_presswork.php)  
  
**inc\_presswork.php**의 가장 마지막 부분을 보면 역시 다음과 같은 소스가 있습니다.  
  

if (count($rand\_set)) foreach($rand\_set as $k => $v) {  
$i++;  
$tag = $v[0];  
$cnt = $v[1];  
**$cnt = 6 - $cnt;  
if ($cnt < 1) $cnt = 1;**

  
이 부분을 다음과 같이 고칩니다. (굵은 글씨를 고칩니다.)  
  

if (count($rand\_set)) foreach($rand\_set as $k => $v) {  
$i++;  
$tag = $v[0];  
$cnt = $v[1];  
**$cnt = get\_tags\_level($cnt);**

  
이 수정은 랜덤 태그 부분을 위한 것입니다.

  

**5** **스타일 수정** (해당 스킨의 style.css)  
  
해당 스킨 파일의 style.css 를 열면 태그메뉴 스타일이라고 .cloud1 ~ .cloud5가 적용이 되어 있을 것입니다.  
  
그럼 이것을 아까 위에서 봤던 kebie님 소스에서 봤던 스타일과 일치시키면 됩니다. 즉, cloud1을 mycloud1과 똑같이 정의하고 ... cloud5을 mycloud5와 똑같이 정의합니다.  
  
그러면 스킨의 style.css 속에서의 이 부분은 이렇게 정의 되겠지요.  
  

.cloud1 { font-size: 88%; color:#c5c5c5; }  
.cloud2 { font-size: 100%; color:#a2a2a2; }  
.cloud3 { font-size: 112%; color:#a2a2a2; font-weight:bold; }  
.cloud4 { font-size: 127%; color:black; font-weight:bold; }  
.cloud5 { font-size: 130%; color:red; font-weight:bold; }

  
만약 style.css에 위와 같은 부분이 없어서 수정할 수 없으면 그냥 추가해서 넣으시면 됩니다.

  

**6** **확인하기**  
  
소스 수정은 끝났습니다. 태그 클라우드와 태그 페이지가 제대로 적용되었는지 확인합니다. 위에서 설명했듯이 반드시 태터툴즈 클래식 오피셜 릴리즈의 버전의 100\_quan 스킨에서와 같이 태그 페이지와 랜덤 태그가 스킨에 적용되어 있어야 제대로 보일 것입니다.

  
**참고**  
  
이와 같은 방법 말고도 여러가지 방법이 있습니다만 설명은 이게 제일 간단하네요. 참고로 이 방법은 태터툴즈 클래식의 원소스가 글자크기가 큰 걸 cloud1에, 제일 작은 걸 cloud5에 있던 걸 정반대로 뒤집는 게 됩니다.  
  
소스는 조금 들여다보면 쉬운 편이니 이것 말고도 더 수정하실 수 있을 겁니다. 저는 클라우드를 5단계가 아니라 6단계로 바꾸었고, .mycloud와 .cloud를 하나로 통일했습니다. 글자의 색깔도 바꾸었지요.   
  
그리고, 특정 태그를 누르지 않았을 때도 태그 클라우드가 득실거리는 게 부담스러웠던 저는 kebie님의 index.php 수정 부분을 다시 한번 수정하여 태그를 클릭했을 때만 관련 태그 클라우드가 나오도록 수정했습니다. 다음과 같습니다.  
  
[#M\_ **[수정 사항 보기]**
