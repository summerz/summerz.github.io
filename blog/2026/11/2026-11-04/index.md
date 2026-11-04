---
slug: 2026/11/04
title: 아이폰 홈 화면 앱 위의 그림자, 이번에는 시스템 블러였다
authors: summerz
tags:
  - "something useful"
  - 아이폰
  - PWA
  - WebKit
---

[지난번에는 아이폰 홈 화면 앱 위의 흰 띠를 잡았습니다.](https://www.summerz.net/blog/2026/10/20) 문서 전체가 아래로 밀려 있던 문제였죠. 그런데 다른 앱을 만들다가 또 비슷한 걸 만났습니다. 다크 테마에서 앱 제목과 프로필 아이콘 윗부분이 뿌옇게 보이는 거예요.

한 번 겪었으니 이번엔 금방 끝나겠거니 했습니다. 화면이 비슷하게 망가졌다고 원인까지 같지는 않더군요.

<!-- truncate -->

## 같은 처방으로 남은 그림자

이번 앱은 `에브리 머니`입니다. `Expo`와 `React Native Web`으로 만들었고, 아이폰 `Safari`에서 홈 화면에 추가해 설치형 웹 앱(`PWA`)으로 사용하고 있습니다.

다크 테마에서 상단의 ‘에브리 머니’라는 제목 윗부분과 프로필 아이콘 상단이 흐려졌습니다. 라이트 테마에서는 같은 흰 그림자가 보이지 않았고요. 하단 안전 여백(`safe area`) 문제는 이미 따로 해결한 상태였습니다.

기존 글에서 쓴 복구 로직도 적용했습니다. `scrollY`가 음수이거나 문서가 아래로 밀렸을 때 `window.scrollTo(0, 0)`으로 되돌리는 방식이요. 그런데 이번 블러는 그대로 남았습니다.

지난 글의 흰 띠는 문서가 64px 아래로 밀리면서 드러난 빈 영역이었고, 좌표를 복구하자 사라졌습니다. 이번 증상에도 같은 설명을 붙이려면, 우선 문서가 실제로 밀려 있어야겠죠.

## 이번에도 아이폰에서 숫자부터

`0.2.4`에 로컬 테스트 서버에서만 쓰는 레이아웃 진단을 넣었습니다. 화면 요소의 좌표와 CSS 페인트 속성을 수집하는 진단입니다. 가계부 기록이나 입력값, 화면 텍스트, 저장소는 읽지 않았습니다. 제목이 흐린 이유를 찾는 데 지출 내역까지 볼 필요는 없으니까요.

홈 화면에 설치한 앱을 실제 아이폰에서 열어 확인한 값은 이랬습니다. 좌표와 크기는 CSS 픽셀 기준입니다.

| 항목 | 측정값 |
| --- | --- |
| 기기 화면 | 375×812 |
| 웹 콘텐츠 영역 | 375×768 |
| `window.scrollY` | 0 |
| `visualViewport.offsetTop` | 0 |
| `html`, `body`, `root`의 y 좌표 | 모두 0 |
| 제목 영역 | y=16, 높이 44 |
| 하단 메뉴의 아래 끝 | 768 |
| 하단 안전 여백 | 31px |

문서는 제자리에 있었습니다. 하단 메뉴도 웹 콘텐츠 높이인 768px 안에 들어와 있었고요. 지난번처럼 문서 전체가 밀려서 위쪽에 빈 공간이 생긴 상황으로는 설명되지 않았습니다.

제목을 감싸는 레이어와 그 조상들도 확인했습니다. `filter`, `backdrop-filter`, `box-shadow`, `text-shadow`가 전부 `none`이었습니다. 상태표시줄 설정인 `apple-mobile-web-app-status-bar-style`도 `default`였고요. 조사한 앱 레이어에는 저 그림자를 그릴 속성이 없었습니다.

이 값들만으로 운영체제 내부의 원인까지 확정할 수는 없습니다. 다만 문서를 더 끌어올리거나 CSS 그림자를 지우는 쪽에서 계속 답을 찾을 근거는 없어졌죠.

## 이번에는 시스템이 그리는 블러

단서가 된 건 [Zenn의 실기기 실험과 WebKit 소스 분석 글](https://zenn.dev/uakihir0/articles/260920-ios27-pwa-blur)이었습니다. 화면 가장자리에 운영체제가 그리는 효과인 `scroll edge effect`를 다루는데, 상단 고정 요소의 배경색을 이용해 시스템 블러에 대응하는 방법이 나옵니다. [OJapp의 실험 글](https://tips.ojapp.app/en/ios-27-pwa-top-blur-workaround-2/)에서도 헤더까지 번지는 블러와 상단 고정 요소를 이용한 우회를 확인할 수 있었습니다.

지난 글에서 의심했다가 그때의 원인은 아니라고 판단했던 바로 그 계열의 동작입니다. 겉보기만으로 구분하기 어려운 두 문제가 있었던 거죠.

핵심은 화면 위에 불투명한 띠를 덧그리는 데 있지 않았습니다. `WebKit`이 상단 고정 요소의 배경색을 읽도록 하되, 그 요소 자체는 아무것도 칠하지 않게 만드는 방식이었습니다. 빈 요소에 배경색을 주고, 배경을 글자 모양으로 잘라 내는 `background-clip: text`를 적용합니다. 글자가 없으니 실제로 칠해지는 부분도 없습니다.

여기서 높이가 하필 11px인 이유도 나옵니다. [WebKit의 `LocalFrameView::fixedContainerEdges` 소스](https://raw.githubusercontent.com/WebKit/WebKit/main/Source/WebCore/page/LocalFrameView.cpp)에는 `thinBorderWidth = 10`이라는 경계가 있습니다. 배경색을 읽는 경로에서 너비나 높이가 이 값 이하이면 제외합니다. 11px는 그 경계를 넘기려는 값입니다. 앱 제목 위에 여백 11px를 추가하자는 뜻이 아니었어요.

색을 가져올 때도 화면에 칠해진 픽셀을 읽는 대신 렌더러의 스타일에서 배경색을 얻습니다. 배경색을 갖고 있지만 눈에는 보이지 않는 요소를 두는 방식이 가능한 이유입니다.

## 보이지 않는 고정 요소 하나

수정은 `public/index.html`에 넣었습니다. 우선 첫 페인트 전에 홈 화면에서 실행한 앱인지 판별해 `html`에 속성을 붙입니다. 아래 스크립트는 `head` 안에 둡니다.

```html
<script>
  if (
    navigator.standalone === true ||
    matchMedia("(display-mode: standalone)").matches
  ) document.documentElement.setAttribute("data-standalone", "");
</script>
```

그리고 `body` 안에서 앱 루트 앞에 빈 요소를 하나 둡니다. 화면 읽기 프로그램이 읽을 내용도 없으니 `aria-hidden`을 붙였습니다.

```html
<div id="ios-status-background" aria-hidden="true"></div>
<div id="root"></div>
```

스타일은 이렇습니다. 기본적으로 숨겨 두고, iOS용 CSS 기능 검사와 설치형 실행 조건을 함께 만족할 때만 적용합니다.

```css
#ios-status-background {
  display: none;
}

@supports (-webkit-touch-callout: none) {
  html[data-standalone] #ios-status-background {
    display: block;
    position: fixed;
    inset: 0 0 auto;
    height: 11px;
    z-index: 2147483647;
    pointer-events: none;
    background-color: inherit;
    -webkit-background-clip: text;
    background-clip: text;
  }
}
```

`position: fixed`이므로 본문 공간을 차지하지 않고, `pointer-events: none`이므로 아래 버튼을 누르는 데도 끼어들지 않습니다. 높은 `z-index`는 상단 배경색을 샘플링할 때 이 요소를 후보로 잡도록 하려는 설정입니다.

배경색은 별도로 하드코딩하지 않았습니다. 기존 `AppearanceProvider`가 테마에 따라 `html`과 `body`의 배경색을 설정하고 있어서, `inherit`로 그 색을 받으면 됩니다. 다크는 `#0A1118`, 라이트는 `#F3F6F9`입니다. CSS 배경색은 기본적으로 상속되지 않으니 여기서는 `inherit`를 명시했습니다.

실제 화면에 검은 띠나 흰 띠를 얹어 가리는 방식은 아닙니다. 요소의 사각형은 존재하지만, 빈 텍스트로 배경을 잘라 놓아서 색 띠는 그리지 않습니다. 보이는 그림자를 없애려고 보이지 않는 요소를 넣는다니, 설명하면서도 좀 이상하긴 합니다(...).

## 브라우저에서 확인한 것과 아이폰에서 확인한 것

앱 쪽 타입 검사와 기존 테스트 55개는 통과했습니다. 다만 이것으로 아이폰의 시스템 블러가 없어졌다고 말할 수는 없죠.

데스크톱의 `Playwright WebKit`에서는 테스트 중에만 iOS 전용 CSS 조건을 강제로 활성화했습니다. 거기서 확인한 건 다크·라이트 배경색 상속, 높이 11px의 고정 위치, `pointer-events: none`입니다. 보정 요소를 표시했을 때와 숨겼을 때 상단 11px의 스크린샷 픽셀도 같았습니다. 실제 색 띠를 덧그리지 않는다는 확인까지 한 겁니다. 이 테스트 브라우저의 너비는 402px로, 실기기의 375px와 구분했습니다.

최종 확인은 홈 화면에 설치한 아이폰 앱에서 했습니다. `0.2.5`, 빌드 `c260f47ce9805983`으로 업데이트한 뒤 다크 테마에서 제목과 프로필 아이콘 위의 그림자가 사라졌습니다.

실기기 진단에서도 보정 요소가 `x=0`, `y=0`, 너비 375px, 높이 11px로 잡혔습니다. 배경색은 `rgb(10, 17, 24)`, 위치는 `fixed`, 배경 클립은 `text`, 포인터 이벤트는 `none`이었고요. 문서 좌표와 `scrollY`는 여전히 0이었습니다. 문서를 움직여서 증상을 가린 결과가 아니라는 것도 확인했습니다.

이건 시스템 블러를 끄는 공식 CSS API가 아닙니다. 특정 iOS와 WebKit의 상단 배경색 판별 동작을 이용한 우회라서, 운영체제가 바뀌면 다시 확인해야 합니다. 이번에 해결을 확인한 범위도 실제 테스트한 설치형 아이폰 PWA입니다. 다크에서만 그림자가 보였던 내부 이유까지 밝혀낸 것은 아니고요.

다음에 또 비슷한 띠가 나타나면 적어도 `scrollY`부터 보게 되겠죠. 이제 의심할 원인도 두 개가 됐습니다.

## 관련 링크

- [이전 글: 아이폰 홈 화면 앱 위의 흰 띠, 범인은 블러가 아니었다](https://www.summerz.net/blog/2026/10/20)
- [Zenn: iOS 27 PWA 상단 블러의 실기기 실험과 WebKit 소스 분석](https://zenn.dev/uakihir0/articles/260920-ios27-pwa-blur)
- [OJapp: iOS 27 PWA 상단 블러를 피하는 실험적 방법](https://tips.ojapp.app/en/ios-27-pwa-top-blur-workaround-2/)
- [WebKit LocalFrameView.cpp 원문: fixedContainerEdges](https://raw.githubusercontent.com/WebKit/WebKit/main/Source/WebCore/page/LocalFrameView.cpp)
