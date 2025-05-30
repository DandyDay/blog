---
title: "Git Hooks로 linter 자동화하기"
date: "2025-05-30T15:10:00.000Z"
lastmod: "2025-05-30T15:21:00.000Z"
draft: false
series: []
authors:
  - "Jinho"
tags: []
categories: []
NOTION_METADATA:
  object: "page"
  id: "2035dc16-28d0-800f-8c0c-f889f9277b3d"
  created_time: "2025-05-30T15:10:00.000Z"
  last_edited_time: "2025-05-30T15:21:00.000Z"
  created_by:
    object: "user"
    id: "64cc0929-298f-463f-924a-1a4d671958eb"
  last_edited_by:
    object: "user"
    id: "64cc0929-298f-463f-924a-1a4d671958eb"
  cover: null
  icon: null
  parent:
    type: "database_id"
    database_id: "2035dc16-28d0-812e-aa7f-fc90b2270c90"
  archived: false
  in_trash: false
  properties:
    series:
      id: "B%3C%3FS"
      type: "multi_select"
      multi_select: []
    draft:
      id: "JiWU"
      type: "checkbox"
      checkbox: false
    authors:
      id: "bK%3B%5B"
      type: "people"
      people:
        - object: "user"
          id: "64cc0929-298f-463f-924a-1a4d671958eb"
          name: "Jinho"
          avatar_url: null
          type: "person"
          person:
            email: "dandyday31@snu.ac.kr"
    custom-front-matter:
      id: "c~kA"
      type: "rich_text"
      rich_text: []
    tags:
      id: "jw%7CC"
      type: "multi_select"
      multi_select: []
    categories:
      id: "nbY%3F"
      type: "multi_select"
      multi_select: []
    Last edited time:
      id: "vbGE"
      type: "last_edited_time"
      last_edited_time: "2025-05-30T15:21:00.000Z"
    summary:
      id: "x%3AlD"
      type: "rich_text"
      rich_text: []
    Name:
      id: "title"
      type: "title"
      title:
        - type: "text"
          text:
            content: "Git Hooks로 linter 자동화하기"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Git Hooks로 linter 자동화하기"
          href: null
  url: "https://www.notion.so/Git-Hooks-linter-2035dc1628d0800f8c0cf889f9277b3d"
  public_url: null
MANAGED_BY_NOTION_HUGO: true

---


Unity 프로젝트에서 Git Hooks를 활용하여 linter를 자동화하는 방법을 소개합니다.


## **0. 배경**


이번 학기 수업에서 진행되는 Unity 프로젝트에서 PM을 맡게 되어, 프로젝트의 전반적 진행을 관리하고 있습니다. 코드를 자동으로 Linting하는 작업은 프로젝트를 진행하기 전 가장 먼저 해야 했습니다. 그러나 Git Hooks를 처음 써보기 때문에 어려움을 겪었고, 따라서 이 과정을 공유하고자 합니다.


## **1. Git Hooks?**


우선, Git Hooks를 통해 코드 Linter가 커밋 전에 코드를 자동으로 린팅할 수 있도록 설정하였습니다. Unity 프로젝트를 위한 Git Hooks는 [Unity 프로젝트를 위한 Git Hooks 활용](https://tech.devsisters.com/posts/unity-githooks/)을 참고하여 설정하였습니다.


Git Hooks는 기본적으로 `.git/hooks/` 경로에 위치합니다. 이 경로에 있는 파일들은 각각 커밋 전, 커밋 후, 머지 등의 이벤트에 따라 실행됩니다. Git 프로젝트에서 해당 경로에 가보면 여러 이벤트에 실행될 파일들의 예시가 있는데, 이를 참고하여 작성하면 됩니다. 저는 프로젝트에 코드가 커밋되기 전에 코드를 자동으로 린팅하는 작업을 추가해야 했기 때문에, C# 코드 린팅을 자동으로 해주는 `dotnet format` 등의 명령어를 실행하는 `pre-commit` 파일을 작성하였습니다.


## **2. 프로젝트에 적용**


프로젝트를 진행하는 모든 사람들이 commit을 하기 전에 `pre-commit`이 실행되어야 하는데, `.git/` 디렉토리는 Git이 버전관리를 해주지 않습니다. 따라서 프로젝트의 root에 `.githooks/` 디렉토리를 설정하고, 이 디렉토리에 `pre-commit`을 두어 Github을 통해 공유할 수 있도록 했습니다. 하지만 이 폴더에 있는 `pre-commit`는 커밋을 할 때 자동으로 실행되지 않기 때문에 이를 위한 설정이 필요합니다.


프로젝트 root에 `.gitconfig` 파일을 만들어 다음과 같은 내용을 작성합니다.


```text
# .gitconfig
[core]
	hooksPath = .githooks

```


이후 이 `.gitconfig` 파일을 git이 사용하도록 하려면, 다음과 같은 명령어를 입력해야 합니다.


```bash
$ git config --local include.path ../.gitconfig
```


여기까지 완료한다면 우리가 만든 custom Git Hooks가 정상적으로 실행되는 것을 확인할 수 있습니다.


## **3. 편법을 이용한 자동화**


하지만 위 모든 조원의 컴퓨터 로컬에서 실행하는 것은 프로젝트의 단위가 커질수록 귀찮은 일이 될 것입니다. 따라서 편법을 이용해서 해당 Unity 프로젝트를 Unity Editor로 열었을 때 위 명령어가 실행되도록 한다면 config를 적용하는 것 또한 자동화 할 수 있습니다.


프로젝트의 `Assets/Editor/` 디렉토리에 `InstallGitHooks.cs`를 작성합니다


```c#
using System.Diagnostics;

public class InstallGitHooks {
    [UnityEditor.InitializeOnLoadMethod]
    private static void Install() {
        Process.Start("git", "config --local include.path ../.gitconfig");
    }
}
```


UnityEditor의 `InitializeOnLoadMethod` 어트리뷰트는 Unity Editor가 해당 메서드를 어셈블리에서 불러올 때마다 실행된다고 합니다. 따라서 위와 같이 작성해두면 UnityEditor가 프로젝트를 로드할 때 마다 실행되고, 해당 명령어는 여러 번 실행되어도 괜찮고 시간도 얼마 걸리지 않으므로 편리하게 자동화할 수 있습니다.


## **4. Github Actions**


프로젝트에서 특정 feature을 개발하고 나면 Github에 push를 하게 됩니다. 이 과정에서 혹시 Lint가 되지 않은 코드가 Github에 올라가지 않게 하기 위해서, Github Actions를 통해 한 번 더 검사할 수 있습니다. Github에는 [super-linter](https://github.com/super-linter/super-linter)라는 Github action이 있습니다. 이를 이용해서 우리의 Unity 프로젝트의 C# 코드가 린팅되었는지 다시 한 번 확인할 수 있습니다.


```yaml
name: Lint

on: [pull_request]

jobs:
  build:
    name: Lint
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: read
      statuses: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Super-linter
        uses: super-linter/super-linter@v7.1.0
        env:
          VALIDATE_ALL_CODEBASE: true
          VALIDATE_CSHARP: true     # check C# files
          DEFAULT_BRANCH: develop
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          FILTER_REGEX_INCLUDE: "Assets/Scripts/.*\\.cs$"
```


위는 ChatGPT를 활용하여 만든 `Lint.yml` 파일입니다. 이런식으로 작성한 파일을 `.github/workflows/` 디렉토리에 넣어주면 Github에서는 자동으로 이 파일을 인식하고 Github action으로 실행해주게 됩니다. super-linter는 많은 언어들의 lint 체크를 도와줄 수 있는데, C# 코드의 경우에는 `dotnet format` 명령어를 통해 lint 체크를 진행하게 됩니다. 이 파일까지 프로젝트에 작성하게 되면, 저희가 하고자 했던 lint와 lint check를 Git이 자동으로 해주기 때문에 편리하게 프로젝트를 관리할 수 있습니다.

