---
slug: 2026/09/04
title: gh auth switch 없이 GitHub 계정 두 개 동시에 쓰기
authors: summerz
tags:
  - "something useful"
  - 개발
  - GitHub
  - Git
  - 터미널
---
회사와 개인 GitHub 계정을 오가며 쓰고 있는데요. 리포를 옮길 때마다 `gh auth switch`를 해야 하는 것도 귀찮지만, 더 큰 문제는 **두 계정을 동시에 쓸 수 없다는 것**이었습니다. 터미널 A에서 계정을 바꾸면 터미널 B도 같이 바뀌죠.

<!-- truncate -->

이유는 단순합니다. `gh auth switch`는 `~/.config/gh/hosts.yml`이라는 공용 파일을 고칩니다. 프로세스별 상태가 아니라 머신 전체가 공유하는 상태인 거죠.

계정을 바꾸지 않고, 현재 들어와 있는 리포의 `origin`에 따라 알아서 올바른 계정을 쓰게 만들기로 했습니다.

---

## `GH_TOKEN` 하나로 gh와 git을 함께 바꾸기

`gh`는 `GH_TOKEN` 환경 변수가 설정돼 있으면 현재 활성 계정 대신 그 토큰을 씁니다. 여기까지는 문서에 나오는 내용인데, 놓치기 쉬운 부분이 하나 있습니다. **git도 함께 따라옵니다.**

`gh auth login`을 하면 gitconfig에 다음과 같은 설정이 들어갑니다.

```ini
[credential "https://github.com"]
	helper = !gh auth git-credential
```

git 인증을 gh가 대신한다는 뜻입니다. 따라서 `GH_TOKEN`을 바꾸면 `gh`의 API 호출뿐 아니라 `git push`에 쓰이는 계정도 함께 바뀝니다.

그리고 환경 변수는 프로세스마다 독립적입니다. 터미널 세 개를 열어 각각 다른 계정으로 작업해도 서로의 상태를 건드리지 않습니다. 제가 원하던 게 바로 이거였어요.

토큰은 이미 키링에 있으니 새로 만들 필요도 없습니다. `gh auth token -u <계정>`으로 가져오면 됩니다.

## zsh 의 chpwd 훅 이용하기

제 환경은 zsh라서 이 동작을 `~/.zshrc`에 넣었습니다. zsh는 시작될 때 `~/.zshrc`를 읽습니다. macOS에서는 Catalina부터 기본 셸로 쓰이고 있어서 별도로 바꾸지 않았다면 대부분 zsh를 사용하고 있을 겁니다.

여기서 이용한 `chpwd`는 zsh가 **현재 작업 디렉터리가 바뀔 때마다 호출하는 훅**입니다. `cd`뿐 아니라 `pushd`, `popd` 등으로 디렉터리를 옮겨도 실행됩니다. 여기에 계정을 고르는 함수를 연결하면 리포에 들어가는 순간 그 리포의 `origin`을 읽고 `GH_TOKEN`을 바꿀 수 있습니다.

GitHub 리포의 remote URL은 보통 `https://github.com/OWNER/PROJECT.git` 또는 `git@github.com:OWNER/PROJECT.git` 형태입니다. 따라서 URL에서 `OWNER` 부분만 꺼내면 어느 개인이나 조직의 리포인지 알 수 있습니다. 아래 코드는 이 `OWNER`를 실제 로그인할 GitHub 계정으로 매핑합니다. 조직이 소유한 리포라도 그 조직에 접근하는 개인 계정의 토큰을 써야 하기 때문에 이 매핑 단계가 필요합니다.

```bash
# ~/.zshrc — cd 할 때마다 origin 소유자로 계정을 고른다
typeset -gA _gh_tok_cache

# 리포 OWNER를 로그인할 GitHub 계정으로 매핑한다
_gh_owner_account() {
  case $1 in
    work) print workaccount ;;
    summerz|myteam) print summerz ;;
  esac
}

_gh_use_project_account() {
  local u url
  url=$(git config --get remote.origin.url 2>/dev/null)

  # HTTPS의 /와 SSH의 : 다음에 오는 OWNER를 꺼내 계정을 고른다
  [[ $url =~ 'github\.com[:/]([^/]+)/' ]] && u=$(_gh_owner_account ${match[1]})

  if [[ -n $u ]]; then
    [[ -n ${_gh_tok_cache[$u]-} ]] || \
      _gh_tok_cache[$u]=$(gh auth token -u "$u" 2>/dev/null)
  fi

  if [[ -n $u && -n ${_gh_tok_cache[$u]-} ]]; then
    export GH_TOKEN=${_gh_tok_cache[$u]}
  else
    unset GH_TOKEN
  fi
}

autoload -Uz add-zsh-hook
add-zsh-hook chpwd _gh_use_project_account
_gh_use_project_account
```

맨 아래 세 줄이 훅을 연결하는 부분입니다. `autoload -Uz add-zsh-hook`으로 zsh가 제공하는 훅 등록 함수를 불러오고, `add-zsh-hook chpwd _gh_use_project_account`로 디렉터리가 바뀔 때 실행할 함수를 등록합니다.

마지막의 `_gh_use_project_account` 직접 호출도 중요합니다. `chpwd`는 디렉터리가 **바뀌어야** 실행되므로, 이미 리포 디렉터리에서 시작한 터미널에는 훅만으로 적용되지 않습니다. IDE에서 새 터미널을 열 때가 대개 그렇죠. 시작하자마자 함수를 한 번 직접 실행해두면 이 경우까지 처리됩니다.

---

## 계정과 커밋 신원은 다른 문제

여기까지 하면 인증에 쓰이는 계정은 해결됩니다. 하지만 커밋에 기록되는 이름과 이메일은 별개입니다. GitHub 계정을 제대로 골라도 커밋에는 엉뚱한 신원이 들어갈 수 있습니다.

실제로 제 글로벌 설정에는 `Copilot <copilot@github.com>`이 들어 있었습니다. 언젠가 GitHub Copilot이 써놓고 간 모양인데, 로컬 설정이 없는 리포에서는 커밋이 전부 이 이름으로 찍히고 있었을 거라는 거죠. 매번 수동으로 등록을 해서 몰랐어요. ㄷㄷㄷ

계정별 gitconfig를 디렉터리 기준으로 나누는 `includeIf gitdir:`가 흔한 해법입니다. 하지만 제 컴퓨터에 깔린 리포들은 특정 디렉토리 아래에 평평하게 섞여 있어서, 이 방법을 쓰려면 폴더부터 재편해야 했습니다.

다행히 git에는 remote URL을 기준으로 설정을 불러오는 조건이 있습니다. 이런 식으로 하면 특정 gitconfig 를 찾을 수 있습니다.

```ini
[includeIf "hasconfig:remote.*.url:https://github.com/myteam/**"]
	path = ~/.gitconfig-acoountforteam
```

이제 리포가 디스크 어디에 있든, 새로 클론한 리포든 상관없이 `origin` 소유자에 따라 올바른 신원을 씁니다. 인증 계정과 커밋 신원이 **같은 기준**, 즉 remote의 소유자에서 파생되니 둘이 어긋날 일도 줄어듭니다.

---

## 덤으로 발견한 평문 토큰

리포를 훑는 김에 remote URL도 확인했더니, 9개 리포의 `.git/config`에 클래식 PAT가 평문으로 들어 있었습니다. 예전에 `https://TOKEN@github.com/...` 형식으로 클론했던 흔적입니다.

```bash
find ~ -name config -path "*/.git/config" | \
  xargs grep -l "ghp_\|github_pat_"
```

URL에 들어 있는 자격증명 부분만 걷어내면 gh credential helper가 인증을 맡습니다.

```bash
git remote set-url origin "$(git remote get-url origin | \
  sed -E 's#https://[^@/]+@#https://#')"
```

여기서 `gho_` 토큰을 없애겠다고 GitHub 설정에서 **GitHub CLI 앱 권한 자체를 revoke하면 안 됩니다.** gh가 쓰는 여러 계정의 토큰이 같은 OAuth 앱에서 발급된 것이어서, 방금 만든 설정까지 한꺼번에 깨질 수 있습니다. remote URL에 남아 있는 로컬 사본만 제거하면 됩니다.

---

이번에 정리하며 제대로 인지하게 된 건, 제가 리포 설정을 다 제각각으로 해두고 쓰고 있었다는 점이었습니다. 클론 방식도, 리포 설정도, 커밋 신원도요. 얼떨결에 한번에 정리하는 계기가 됐습니다.

- 인증 계정은 `GH_TOKEN`과 `chpwd` 훅으로 터미널마다 독립적으로 선택하기.
- 커밋 신원은 `includeIf "hasconfig:remote.*.url:..."`로 리포 위치와 무관하게 선택하기.
- 기존 remote URL에 평문 토큰이 남아 있지 않은지 확인하기.

계정을 바꾸는 명령 하나 없앴을 뿐인데, 오래된 설정과 토큰까지 줄줄이 딸려 나왔습니다. 귀찮아서 미루던 자동화가 가끔은 보안 점검도 해줍니다. 이것도 뭔가 위험한 케이스가 있겠죠...? 그건 또 그것대로 잡아봐야겠네요.
