---
slug: 2011/09/29
title: 아이폰 앱 스토어 링크에 달린 mt=8
authors: summerz
tags:
  - media & world
  - 애플
  - 링크
  - 아이튠즈
---

잘 아시겠지만 아이폰 (아이팟, 아이패드) 앱들은 아이튠즈 안에서 검색하거나 정보를 확인할 수도 있지만 웹 브라우저에서도 확인할 수 있습니다. 대부분 아래와 같은 이미지로 링크를 걸죠.

<!-- truncate -->

![](iphone-store-icon.png)

그리고 링크의 형태는 다음과 같습니다.

```
http://itunes.apple.com/{종류 - 여기서는 앱}/{앱 이름]/{앱의 고유 ID}?mt=8
```

- [http://itunes.apple.com/app/facebook/id284882215?mt=8](http://itunes.apple.com/app/facebook/id284882215?mt=8) (페이스북 앱)
- [http://itunes.apple.com/app/skype/id304878510?mt=8](http://itunes.apple.com/app/skype/id304878510?mt=8) (스카이프 앱)
- [http://itunes.apple.com/app/twitter/id333903271?mt=8](http://itunes.apple.com/app/twitter/id333903271?mt=8) (트위터 앱)

참고로 .com과 app 사이에  국가 코드가 들어갈 수 있습니다. ...com/kr/app/... 이나 ...com/us/app/... 처럼 말이죠.
그렇다면 한번쯤 mt=8 이 뭘 뜻하는지 궁금하신 적이 있지 않나요? 주소창에 ?mt=8 을 빼고 입력해도 페이지는 제대로 뜨거든요. 저 쓸데없는 것 같은 mt=8 은 뭘 뜻하는 걸까요?

- mt=8
- media type = 8th
- 미디어 타입 = 8번째

즉, 애플에서 지정한 8번째 미디어 타입이라는 뜻입니다.  그리고 8번은 바로 모바일 소프트웨어 어플리케이션이죠. 그럼 나머지 번호들은 뭘 나타낼까요? 다음과 같습니다.

- 1 - Music
- 2 - Podcasts
- 3 - Audiobooks
- 4 - TV Shows
- 5 - Music Videos
- 6 - Movies
- 7 - iPod Games
- 8 - Mobile Software Applications
- 9 - Ringtones
- 10 - iTunes U
- 11 - E-Books
- 12 - Desktop Apps

예를 들어 이번에 맥 앱 스토어에 입성한 맥 사용자들의 필수 동영상 재생기 [무비스트](http://cocoable.tistory.com/)의 링크는 다음과 같고요,

- [http://itunes.apple.com/app/id461788075?mt=12](http://itunes.apple.com/app/id461788075?mt=12)

iBooks를 설치하면 자동으로 들어있는 Winnie-the-Pooh 의 링크는 다음과 같죠.

- [http://itunes.apple.com/book/winnie-the-pooh/id356883079?mt=11](http://itunes.apple.com/book/winnie-the-pooh/id356883079?mt=11)

그 외 더 복잡한 형태들의 링크가 있지만 일단 여기까지만.