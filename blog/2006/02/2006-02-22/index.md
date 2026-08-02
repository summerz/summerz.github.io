---
slug: 2006/02/22
title: "[태터툴즈 클래식] 업데이트 및 소스를 수정한 부분 (계속 추가)"
date: 2006-02-22T00:12:09
authors: summerz
tags:
  - "for blah.blah.blog"
  - "정보"
  - "태터툴즈"
---

오피셜 릴리즈로의 업데이트 후 다른 사용자분들의 도움으로 그 동안 소스 수정한 부분들을 기록해둘 겸 적어봅니다.  

<!-- truncate -->


**1** **태터툴즈 0.95에서 사라진 제목표시기능 살리기**  
참고 링크 : http://www.firejune.com/index.php?pl=436  
수정한 파일 : index.php  
  
**2** **태그 클라우드 추가하기 (버그 수정판)**  
참고 링크 : http://kebie.linuxstudy.pe.kr/2005/blog/tt/index.php?pl=77  
수정한 파일 : index.php, inc\_presswork.php, 해당 스킨의 skin.html  
비고 : 글라우드 단계와 css등을 재수정  
  
**3** **태그 클라우드와 클래식의 태그 페이지의 css를 통일시키기**  
참고 링크 : http://summerz.pe.kr/blog/index.php?pl=533  
수정한 파일 : inc\_presswork.php (, 스킨의 style.css)  
  
**4** **태그 기능확장하기**  
참고 링크 : http://www.firejune.com/index.php?pl=735  
수정한 파일 : index.php  
  
**5** **통계보기에서 회색으로 처리된 리퍼러들 보지 않기**  
참고 링크 : http://www.firejune.com/index.php?pl=745  
수정한 파일 : admin/statistics\_log.php  
  
**6** **태터 툴즈 클래식 리퍼러 검색어를 한글로 표시하기**  
참고 링크 : http://mahodou.pe.kr/magical/?q=pl%3D175  
수정한 파일 : admin/statistics\_log.php  
  
**7** **태터툴즈에 Lightbox Plus 적용하기**  
참고 링크 : http://www.qnpfr.com/tt/index.php?pl=62  
수정한 파일 : inc\_funtion.php  
비고 : 해당 스킨의 폴더 아래 깔아서, 이미지의 경로는 재수정했다.  
  
**8** **태터툴즈에 1 Pixel Out 플레이어 설치**  
참고 링크 : http://rimy.ivyro.net/index.php?pl=509  
수정한 파일 : inc\_global.php  
추가한 이미지 : set\_embed\_player.gif  
비고 : 설치파일 위치 / 플레이어 색깔 / 소스 약간 수정, 편집창에 전용 버튼 추가  
비고2 : 소스는 [**원래 홈페이지**](http://www.1pixelout.net/code/audio-player-wordpress-plugin/)에서 다시 받음  
  
**9** **편집창에 JUST URL 버튼 추가**  
수정한 파일 : lib.js, admin/article\_edit.php  
추가한 이미지 : attach\_url.gif  
비고 : 첨부파일의 url만 편집창에 들어가도록 버튼을 추가  
  
**10** **글 보관함 (archive)의 제한 해지**  
수정한 파일 : inc\_presswork.php (, skin.html)  
수정한 부분 : function get\_archive() 의 $q\_limit = "limit 0, 5"; 부분을 삭제  
비고 : 제한을 해지하면서 글 보관함이 길어져서 목록을 select 메뉴로 변경  
  
**11** **편집창의 css를 위한 확장**  
추가한 파일 : ./skin/needed.css  
수정한 파일 : admin/style.css (스킨의 style.css)  
수정한 부분 : 글을 작성할 때와 실제 블로그에서 보여지는 화면을 최대한 동일하게 만들기 위해 위의 두 스타일시트에 각각 @import "적절한경로/skin/needed.css"; 를 추가  
  
**12** **트랙백, 댓글의 개수 표시 수정**  
수정한 파일 : index.php  
수정한 부분 : 트랙백이나 댓글이 없으면 아무 표시도 안되었는데, 트랙백이나 댓글이 없어도 0 이라고 표시되도록 수정  
  
**13** **링크용 퍼머링크 표시 변환자 추가**  
수정한 파일 : index.php  
추가한 부분 : 검색 중이거나 특정 카테고리를 보고 있는 중에도 퍼머링크가 index.php?pl=xxx 처럼 제대로 표시되게 하기 위해 ##\_article\_rep\_link\_real\_## 를 추가  
  
**14** **트랙백과 댓글 링크에 스팸 대비(?)용 rel="nofollow" 를 넣음**  
수정한 파일 : inc\_function.php, 해당 스킨의 skin.html  
추가한 부분 : 검색 중이거나 특정 카테고리를 보고 있는 중에도 퍼머링크가 index.php?pl=xxx 처럼 제대로 표시되게 하기 위해 ##\_article\_rep\_link\_real\_## 를 추가  
  

최종 수정일 2007.1.9

  
멀고 멀었던 RC의 길을 지나 드디어 정식버전으로 안착.  
  
이제 클래식 버전이 아닌 정식 버전으로의 업그레이드가 남았는데, 현재는 보류 중입니다. 아직 마이그레이터도 완성되지 않았고, (제가 보기엔) 아직 버그를 포함 불편한 부분들이 좀 있어 보이거든요. 좀 안정화가 되면 그 때 고려해보려고 합니다.
