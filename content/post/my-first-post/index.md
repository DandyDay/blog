+++
author = "Hugo Authors"
title = "Rich Content"
date = "2019-03-10"
description = "A brief description of Hugo Shortcodes"
tags = [
    "shortcodes",
    "privacy",
]

+++

Hugo ships with several [Built-in Shortcodes](https://gohugo.io/content-management/shortcodes/#use-hugo-s-built-in-shortcodes) for rich content, along with a [Privacy Config](https://gohugo.io/about/hugo-and-gdpr/) and a set of Simple Shortcodes that enable static and no-JS versions of various social media embeds.
<!--more-->
---

## YouTube Privacy Enhanced Shortcode

{{< youtube ZJthWmvUzzc >}}

<br>

---

## Twitter Simple Shortcode

{{< twitter_simple user="DesignReviewed" id="1085870671291310081" >}}

<br>

---

## Vimeo Simple Shortcode

{{< vimeo_simple 48912912 >}}

## bilibilibi Shortcode

{{< bilibili av498363026 >}}

## Gist Shortcode

{{< gist spf13 7896402 >}}

## Gitlab Snippets Shortcode

{{< gitlab 2349278 >}}

## Quote Shortcode

Stack adds a `quote` shortcode.  For example:

{{< quote author="A famous person" source="The book they wrote" url="https://en.wikipedia.org/wiki/Book">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{< /quote >}}

{{< quote source="Anonymous book" url="https://en.wikipedia.org/wiki/Book">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{< /quote >}}

{{< quote source="Some book">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{< /quote >}}

{{< quote author="Somebody">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{< /quote >}}


## pipex

[Subject](https://www.notion.so/Subject-17460ca7563842beaff12badf61a79f0?pvs=21)

https://cdn.intra.42.fr/pdf/pdf/67971/en.subject.pdf

---

## What is Process?

프로세스는 **실행중인 프로그램**이다.

프로그램을 작동할 때는 메모리에 프로세스 메모리라는 영역을 로드하는데, 이 프로세스 메모리는 스택, 힙, 데이터, 텍스트 영역으로 구분된다.

1. 스택 영역(Stack) - 함수 파라미터, 반환 주소값, 지역 변수 등의 일시적 데이터를 저장
2. 힙 영역(Heap) - 프로세스가 돌아가는 동안 동적으로 할당되는 메모리
3. 데이터 영역(Data) - global, static 변수를 저장
4. 텍스트 영역(Text) - 프로그램이 시작될 때 비휘발성 메모리에서 읽어오는 컴파일된 프로그램 코드를 저장

![R1280x0.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e13318e-17d4-449e-ab55-7a7bab57a3cc/R1280x0.png)

## Process Life Cycle

1. New/Start - 프로세스가 시작되는 상태
2. Ready - 프로세스가 프로세서에 할당되기를 기다리는 상태
3. Running - 프로세스가 OS 스케쥴러에 의해 프로세서를 할당 받고 실행되는 상태
4. Waiting - 자원이 필요하거나, User의 input, 파일이 사용가능한 상태가 될 때 까지 기다리는 상태
5. Terminated/Exit - 프로세스가 실행을 마치거나 OS가 프로세스를 종료한 상태

![R1280x0-2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fc8eceba-e731-4297-b0a7-baea129e7a70/R1280x0-2.png)

## Process Control Block (PCB)

각 프로세스의 정보는 운영체제에서 PCB에 담긴다.

![R1280x0-3.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d125e86d-79f3-4b1f-8abb-d0097da88dba/R1280x0-3.png)

file descriptor는 프로세스마다 다르게 가진다!

## 고쳐야 하는 파트

상대경로 바이너리 파일이 들어올 경우

