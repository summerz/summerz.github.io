---
slug: 2010/03/06
title: "[팁] 티스토리 블로그에 모바일 브라우저를 감지하는 자바스크립트 넣기"
date: 2010-03-06T11:00:00
authors: summerz
tags:
  - "media & world"
  - "자바스크립트"
  - "티스토리"
  - "스킨"
  - "모바일"
  - "브라우저"
---

티스토리 블로그는 모바일 페이지를 지원합니다. **http://블로그주소/m** 을 하면 됩니다. 예를 들어 블로그 주소가 blog.summerz.pe.kr 이라면 blog.summerz.pe.kr/m 으로 접속하면 모바일 브라우저에서 보기 좋은 형태의 페이지가 나오는 거죠.

<!-- truncate -->

하지만 현재는 방문자가 알아서 뒤에 /m 을 붙여야 합니다. 기본 주소로 들어갔는데 브라우저에 따라 자동으로 모바일 페이지가 표시되지는 않는다는 거죠.

이 글은 티스토리 블로그를 사용하시는 분들 중에 아이폰이나 아이팟 터치 등의 있는 모바일 브라우저로 접속하는 방문자들에게 자동으로 모바일 페이지를 보내주는 팁입니다.

매우 쉽습니다. 한번 따라해 보세요.

<script type="text/javascript">

var mydomain = "**www.your-domain-name.com**";

var b = location.href.split(mydomain).join(mydomain + "/m");

(function(a,b){if(/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile|o2|opera mini|palm( os)?|plucker|pocket|pre\/|psp|smartphone|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce; (iemobile|ppc)|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|\_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |\_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) location.href = b;}) (navigator.userAgent||navigator.vendor||window.opera, b);

</script>

※ 모바일 페이지에서 보면 위의 코드가 보이지 않더군요. **[[http://blog.summerz.pe.kr/1519](http://blog.summerz.pe.kr/1519 "[http://blog.summerz.pe.kr/1519]로 이동합니다.")](http://blog.summerz.pe.kr/1519  "[http://blog.summerz.pe.kr/1519 ]로 이동합니다.")** 에서 확인하면 코드를 볼 수 있습니다.

일단 위의 내용을 확인하셨으면 아래의 방법을 따르기만 하면 됩니다.

**모바일 브라우저 접속자를 모바일 페이지로 보내는 방법**

1. 위의 노란 박스 안의 모든 내용을 복사한다.

2. 티스토리 관리자 페이지에서 [스킨] -> [HTML/CSS 편집]을 선택한다.

3. skin.html 안에서 </head>를 찾아서 바로 그 위에 붙여넣기를 한다.

4. 붙여넣은 내용 중 두번째 줄의 **www.your-domain-name.com** 대신 자신의 블로그 주소를 입력한다.

5. 제일 아래로 내려가서 저장 버튼을 눌러서 완료.

정말 쉽죠? 스킨 파일의 images 폴더에 업로드 시키면 스킨이 깔끔해보일 것 같았는데 그렇게 하니 이상하게 작동이 안되더군요; 귀찮아서 이유를 찾아보지는 않았습니다; -\_-a

팁은 이걸로 끝입니다. ^^ 아래는 이것 저것 부가 설명.

* * *

별게 없으니 설치형 텍스트큐브에서도 적용이 가능할 겁니다. (하지만 텍스트큐브 쪽에서의 /m 페이지는 예쁘지 않아요) 원래 설치형 텍스트큐브는 /i 를 통해 깔끔한 모바일 페이지를 지원하지만 딥링크를 지원에 문제가 있어왔죠. 최근에 배포된 버전에서야 모바일 페이지의 딥링크 문제가 해결된 것 같더군요.

아, 구글이 운영하는 텍스트큐브닷컴 쪽은 현재까지 모바일 페이지가 아예 없습니다.

참, 티스토리의 모바일 페이지는 독립 도메인을 사용할 때 단점이 한 가지 있는데, 모바일 페이지로 이동하면 주소가 무조건 티스토리 주소로 변경됩니다. 무슨 뜻이냐면 예를 들어 현재 제 블로그 주소는 blog.summerz.pe.kr 이지만 /m 을 붙이면 summerz.tistory.com/m 으로 이동해버립니다. 도착은 잘 했으니 문제는 없지만 독립 도메인이 사라져버리니 좋지 않죠; 이건 이 스크립트와는 별개로 티스토리 자체의 문제이긴 하죠;

※ 위의 소스는 <http://detectmobilebrowser.com/> 에서 가져왔습니다. (라이센스가 free 네요 ^^)

이 스크립트와 반대의 역할을 하는 스크립트 - 일반 데스크탑이나 랩탑의 브라우저에서 모바일 페이지로 접근했을 때 원래 페이지로 보내주는 스크립트도 만들어 붙이고 싶었으나 /m 쪽 스킨은 공개되어 있지 않아서 불가능했습니다.

이번 기회에 아예 티스토리 쪽에서 브라우저에 따른 페이지 분기 쪽에 손을 좀 봐주든가 아니면 모바일 페이지도 스킨을 수정할 수 있게 해주면 좋겠다는 생각입니다.
