---
title: "Page Table과 TLB"
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
  id: "2035dc16-28d0-80ef-8d01-d25a4dbba5fa"
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
            content: "Page Table과 TLB"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Page Table과 TLB"
          href: null
  url: "https://www.notion.so/Page-Table-TLB-2035dc1628d080ef8d01d25a4dbba5fa"
  public_url: null
MANAGED_BY_NOTION_HUGO: true

---


[Virtual Memory](https://jinhochoi.vercel.app/virtual-memory)에서 OS가 Virtual Memory를 제공하는 방법에 대해서 알아보았다. 현대의 OS는 대부분 Paging 기법을 이용한다. 이번에는 Paging을 위해서 꼭 필요한 Page Table의 단점을 보완하는 방법에 대해서 알아보자.


### **Paging의 단점**


Paging을 위해서는 OS가

1. Page Table을 가지고 있을 공간이 필요하고(**Space overhead**)
1. Address translation을 위해 메모리에 한 번 더 접근해야 한다(**Time overhead**)

는 단점이 있다. 이 두 가지 단점을 해결하는 방법을 알아보자.


### **Space overhead**


64bit 시스템의 virtual address space를 생각해보자. 한 페이지의 크기가 8KB라면 offset으로 13비트, Virtual Page Number(VPN)으로 51비트를 사용할 수 있다. 이 시스템에서 한 Page Table Entry(PTE)의 크기는 8바이트 일 것이므로, Page Table 전체를 저장하기 위해 필요한 메모리는


251×8bytes=16PB


이다. 한 프로세스의 페이지 테이블을 저장하는데 어마어마한 크기의 메모리가 필요하다. 배보다 배꼽이 더 큰 셈이다. 이제부터 이 space overhead를 줄여보자.


64bit 시스템에서 한 프로세스는 264 bytes 의 Virtual Memory를 가진다. 그러나 실질적으로 프로세스가 사용하는 메모리의 영역은 얼마 되지 않는다. 따라서 사용하는 영역만 페이지 테이블에 저장하면 Space overhead를 크게 줄일 수 있다.


### **Paging with Segmentation**


페이지 테이블의 양을 줄이기 위한 첫 번째 방법은 **Paging with Segmentation**이다. 우리는 이미 메모리 공간을 Segmentation 단위로 나누고 있다. 따라서 Virtual address에 Seg #를 저장하는 공간을 따로 두어 각 세그멘테이션마다 Page Table을 따로 두면 공간 낭비를 크게 줄일 수 있다.


![Paging with Segmentation](https://dandyday.github.io/blog/page-table-and-tlb/paging-with-segmentation.png)


위 그림은 | s | p | d’ | 과 같이 생긴 virtual address로부터 s로 세그먼트를 매칭하고, p로 page number를 매칭하여 physical address를 가져오는 예이다. 이런 과정을 거쳐 Paging with Segmentaion을 구현할 수 있다.


### **Multi-level Page Table**


두 번째 방법은 Multi-level Page Table이다. 말 그대로 페이지테이블에 레벨을 두어 순차적으로 찾는 것이다. Virtual address의 구역을 나누어 여러 테이블로부터 Physical address를 찾을 수 있다. 아래 그림은 Intel 64 아키텍쳐의 멀티 레벨 페이지 테이블 예시이다.


![Multi-level Page Table](https://dandyday.github.io/blog/page-table-and-tlb/multi-level-page-table.png)


위 예시를 보면, 한 페이지가 4KB이므로 offset에 12비트를 사용한다. 그리고 각 PTE의 크기가 8byte이므로 각 레벨의 페이지 테이블을 한 페이지에 넣기 위해 각 페이지 테이블에는 512개의 PTE가 들어갈 수 있도록 한다.


\(512×8bytes=4KB\)


이렇게 Virtual address를 4개의 구역으로 나누어서 각 구역이 다음 페이지테이블의 index가 되도록 하는 구조이다. 구조를 이렇게 만들면 페이지 테이블이 차지하는 공간이 줄어들지만 한 번의 address translation을 할 때 여러 번의 메모리 액세스가 필요하다는 단점이 생긴다. 이 문제는 밑에서 다뤄볼 TLB로 해결할 수 있다.


### **Time overhead**


Virtual Memory를 사용하게 되면, 어떤 메모리에 접근할 때 Address Translation을 위해 메모리에 한 번 더 접근해야 한다. 위에서 소개한 Multi-level Page Table을 쓴다면 한 번이 아닌 여러 번 접근해야 하는 문제가 생긴다. 메모리에 접근하는 것은 CPU의 속도에 비해 엄청나게 느리므로 이러한 Time overhead를 해결하여야 한다.


그렇다면 이 time overhead는 어떻게 해결할 수 있을까? 자주 사용하는 페이지 테이블을 캐싱하면 훨씬 빠르게 Address translation을 수행할 수 있을 것이다. 하지만 CPU의 캐시를 사용하면 다른 데이터를 캐시에 올릴 때 페이지 테이블의 정보가 쫓겨날 수 있으므로 우리는 Translation Lookaside Buffer(TLB)라는 것을 사용한다. 이제부터 TLB에 대해서 알아보자.


### **Translation Lookaside Buffer(TLB)**


TLB는 페이지 테이블 전용 캐시라고 볼 수 있다. 한 번의 Address translation을 하기 위해 여러 번의 메모리 접근이 필요하다. 이 overhead를 줄이기 위해 MMU는 Address translation을 할 때, 먼저 TLB를 찾아보게 된다. TLB를 사용하는 데에는 _**locality**_ 라는 가정이 깔려있다.


**Temporal locality**최근에 접근한 instruction이나 data에 또 접근할 확률이 높다.**Spatial locality**최근에 접근한 메모리 근처에 있는 메모리를 다시 접근할 확률이 높다.


따라서 어떤 Page Table Entry(PTE)를 TLB에 캐싱하면 다시 이용할 확률이 높다. TLB는 속도를 위해 하드웨어로 구현되어 있고, MMU가 OS의 도움 없이 읽을 수 있다. TLB는 다음 그림처럼 생겼다.


![TLB](https://dandyday.github.io/blog/page-table-and-tlb/tlb.png)


각 엔트리가 valid한 지를 valid bit로 체크한 뒤에, VPN을 통해서 PTE를 찾을 수 있는 구조이다. PFN만 저장하는 것이 아니라 PTE를 모두 저장해서 Address translation과정에서 사용하거나, 나중에 TLB를 flush할 때 다시 메모리에 써주어야 하는지 여부를 확인하는 데에 사용한다.


![Address Translation with TLB](https://dandyday.github.io/blog/page-table-and-tlb/translation-with-tlb.png)


위 그림을 보면 원래 바로 페이지 테이블을 확인하던 것과 달리, TLB를 먼저 확인해서 TLB hit이 나면 바로 physical address로 바꾸어 줄 수 있어 메모리에 접근하는 시간을 줄일 수 있다는 것을 확인할 수 있다.


그렇다면 TLB Miss가 난 경우에는 어떻게 해야 할까? MMU가 페이지 테이블을 읽어와서 채우면 된다. 이 과정을 MMU가 하기 때문에 OS는 TLB Miss가 났는지 알 수 없다. 따라서 OS는 페이지 테이블을 가리키는 레지스터만 잘 관리해주고, MMU가 하드웨어적으로 읽어와서 TLB를 채우게 된다. 페이지 테이블을 하드웨어가 읽을 수 있어야 하므로 페이지 테이블의 구조도 아키텍쳐의 일부가 된다.


### **마무리**


실제로 Intel, RISC-V 등의 아키텍쳐에서는 글에서 소개한 Multi-level Page Table과 TLB를 사용하고 있다. 이로써 페이지 테이블의 단점인 Space overhead와 Time overhead를 어느 정도 해결할 수 있다.

