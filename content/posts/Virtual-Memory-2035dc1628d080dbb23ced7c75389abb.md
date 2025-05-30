---
title: "Virtual Memory"
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
  id: "2035dc16-28d0-80db-b23c-ed7c75389abb"
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
            content: "Virtual Memory"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Virtual Memory"
          href: null
  url: "https://www.notion.so/Virtual-Memory-2035dc1628d080dbb23ced7c75389abb"
  public_url: null
MANAGED_BY_NOTION_HUGO: true

---


OS가 제공하는 기능 중 하나인 Virtual Memory에 대해서 정리해보았다.


### **Virtual Memory**


컴퓨터에는 메모리가 있다. 이 메모리에 실행되는 프로세스들을 올리고, 프로세스가 필요로 하는 정보를 저장해두었다가 프로세스에 제공하는 역할을 한다. OS는 Virtual Memory라는 기능을 제공하는데, OS가 Virtual Memory를 제공함으로써 이루고자 하는 목표는 다음과 같다.

- **Transparency**
	- 한 프로세스는 메모리가 공유되고 있는지 모른다. 자신이 메모리를 독점하고 있다고 생각한다.
	- 연속된 메모리공간을 사용하고 있다고 생각한다.
- **Efficiency**
	- Fragmentation 최소화 (space)
	- 빠른 속도를 위해 하드웨어 지원을 받음 (time)
- **Protection**
	- 어느 프로세스가 다른 프로세스 또는 OS의 메모리에 접근하지 못하도록 보호
	- 어느 프로세스가 다른 프로세스에 영향을 끼치지 못하도록 보호
	- 메모리를 공유하는 것을 지원

각 프로세스는 위의 세가지를 보장받기 위해 **virtual address space**를 가진다. 이 덕분에 연속된 주소의 메모리를 제공받은 것처럼 사용할 수 있고, private한 메모리 공간을 보장받을 수 있다.


이를 위해 각 프로세스는 **Address translation**이라는 과정을 거쳐 메모리에 접근하게 된다.


![Virtual Memory](https://dandyday.github.io/blog/virtual-memory/virtual-memory.png)


이 Virtual Memory를 구현하는 방법들에 대해 알아보자.


### **Static Relocation**


프로그램을 메모리에 올릴 때, 메모리의 주소들에 시작주소를 더하는 방법이다. 예를 들어 프로세스에서 `0x00f0` 주소에 접근해야 한다고 가정하자. 이 프로세스는 `0x0500` 위치에 올라간다. 그러면 이 프로세스를 메모리에 올릴 때 `0x00f0` 주소에 접근하는 코드를 `0x05f0(0x0500 + 0x00f0)`에 접근하는 코드로 수정해 주는 방법이다.


이 방법은 별도의 하드웨어가 필요없다는 장점이 있지만, 다른 프로세스의 메모리에 접근하는 것을 막을 수 없고, 변수에 저장된 주소로 접근하는 것이 불가능하다.


### **Dynamic Relocation**


따라서 요즘은 Address Translation을 할 수 있는 하드웨어인 MMU(Memory Management Unit)를 두고 MMU를 이용한 Dynamic relocation을 이용한다. 이 Dynamic relocation도 방법이 여러 가지가 있다.

- Partitions
- Segmentation
- Paging

요즘은 Paging 기법을 활용하지만, 위의 두 기법도 간단하게 살펴보자.


### **Partitions**


파티션을 나누는 방법에는 Fixed Partition과 Variable Partition이 있다. Fixed Partition은 고정된 크기의 파티션으로 Physical Memory를 나누는 것으로, 각각의 파티션에 프로세스의 메모리를 올려 사용할 수 있다. 파티션의 개수만큼만 프로세스를 돌릴 수 있고, MMU는 프로세스의 시작주소인 Base register에 Virtual address를 더해 Physical address를 구하게 된다.


이 방식은 구현하기 굉장히 쉽고, Base register를 바꾸는 것으로 context switching이 굉장히 쉽지만, 파티션 사이즈가 고정되어 있어 internal fragmentation이 생기거나 메모리가 부족한 문제가 생길 수 있다.


![Fixed Partition](https://dandyday.github.io/blog/virtual-memory/fixed-partition.png)


Variable Partition은 파티션의 크기를 프로세스마다 다르게 해서 Physical Memory에 올리는 방식이다. Base register를 사용하는 것은 같지만, Limit(Bound) register를 이용해서 한 프로세스가 이용할 수 있는 메모리의 크기를 정해주고, 그 범위를 벗어난 요청을 하는 경우 protection fault를 일으킬 수 있다.


Fixed Partition과 다르게 프로세스마다 메모리의 크기를 맞추어 줄 수 있어서 internal fragment가 생기지 않지만, 프로세스를 메모리에 올리는 과정에서 external fragment가 발생할 수 있다.


![Variable Partition](https://dandyday.github.io/blog/virtual-memory/variable-partition.png)


### **Segmentation**


아직까지는 한 프로세스에 연속적인 메모리 공간을 부여했다. 하지만 이 방법은 한 프로세스가 사용할 수 있는 큰 크기의 연속적인 메모리 공간이 없다면 프로세스를 더 이상 실행할 수 없게 된다. 따라서 프로세스의 메모리 공간을 사용 용도별로 쪼개어 메모리에 올리는 방법이 **Segmentation** 방법이다. 사용 용도는 보통 code, data, stack, heap등으로 나눌 수 있고, 나눈 segment마다 offset 주소를 부여하여 <Segment #, Offset>의 형태인 Virtual address를 사용한다. 이렇게 나누는 기술을 사용하면 프로세스간 특정 영역을 공유하는 것도 가능해지고, 다른 프로세스의 메모리에 접근하는 것을 막을 수 도 있다. 하지만 각각의 segment는 여전히 연속된 공간에 할당되어야 하기 때문에, external fragmentation 문제가 발생할 수 있고, 각각의 segment가 다른 곳에 저장되기 때문에 이를 저장하는 segment table이 space overhead를 유발한다.


![Segmentation](https://dandyday.github.io/blog/virtual-memory/segmentation.png)


### **Paging**


요즘에는, segmentation의 단점도 보완하기 위해 페이징이라는 기법을 사용한다. Physical Memory를 약 4KB정도의 크기인 frame들로 나누고, 이를 Virtual Memory의 page에 할당한다. 전체 메모리를 약 4KB단위로 자르기 때문에 OS는 메모리를 관리하기 쉽고, external fragmentation이 발생하지 않는다. 또한 n pages 크기의 프로세스를 메모리에 올리기 위해서는 이제 연속된 공간이 아니어도 n개의 free frames만 찾으면 된다.


![Paging](https://dandyday.github.io/blog/virtual-memory/paging.png)


페이징 기법을 이용하기 위해, OS는 virtual address를 physical address로 변환하는 address translation 과정을 거친다. virtual address space는 프로세스마다 독립적으로 가지기 때문에, 이를 translation하는데 필요한 Page Table도 프로세스마다 가지게 된다. 한 페이지의 사이즈가 4KB인 64bit Machine의 VA는 다음과 같이 변환된다.


![Virtual address & Physical address](https://dandyday.github.io/blog/virtual-memory/va-to-pa.png)


한 페이지의 사이즈가 4KB이기 때문에, 마지막 12비트는 offset으로 사용한다. 한 페이지의 사이즈가 8KB라면 마지막 13비트를 사용할 것이다. OS는 VPN, Virtual Page Number를 Page Table에서 PFN, Physical Frame Number로 변환하여 Physical address를 얻어낸다. 그림으로 그려보면 다음과 같은 과정이 매 address translation마다 일어난다. p는 VPN, f는 PFN이 이고, v는 바로 다음에 살펴볼 valid bit이다.


![Address Translation](https://dandyday.github.io/blog/virtual-memory/address-translation.png)


위 그림에서, 각 PTE (Page Table Entry)에는 valid bit라는 비트가 존재하는 것을 볼 수 있다. valid bit는 **Protection**을 위해 존재한다. 각 프로세스마다 페이지 테이블을 따로 두는 것으로 프로세스 간의 메모리 프로텍션은 구현할 수 있다. PTE의 Protection 비트를 활용하면 페이지 단위로도 프로텍션을 구현할 수 있다. PTE에는 이외에도 해당 페이지에 대한 정보를 담는 비트를 가지고 있다.


PTE의 대략적인 구조를 보면, Valid bit, Reference bit, Modify bit, Protection bits 등과 함께 PFN이 저장되어 있다. 각각은 다음과 같은 용도로 사용된다.

- Valid bit: PTE를 사용할 수 있는지에 대해 저장한다. 0이면 PTE가 가리키고 있는 곳에 접근할 수 없다.
- Reference bit: PTE가 가리키고 있는 페이지에 접근을 했는지에 대해 저장한다. 접근했으면 이 비트가 1이 되는데, OS가 주기적으로 0으로 바꾼다.
- Modify bit: Dirty bit이라고도 하는데, 해당 페이지에 write가 일어났는 지에 대해 저장한다. 만약 Modify bit이 1이라면 메모리를 정리할 때 Disk에 써주어야 할 수도 있다.
- Protection bits: 2비트로 구성되며 어떤 operation을 할 수 있는지에 대해 저장한다. 예를 들면 Read-only, Read-write, user/kernel 등의 정보를 저장해 메모리를 보호한다.

### **Page Fault**


어떤 페이지에 접근하려고 하는데 valid bit이 0이거나, protection bit에 막혀 접근할 수 없을 때가 있다. 그럴 때 MMU는 Page Fault를 일으킨다. Page fault는 다음과 같은 상황에서 일어난다.

- Major page faults
	- 페이지가 valid하지만 아직 메모리에 올라와있지 않은 경우 (Demand Paging을 했을 경우)
	- disk I/O를 통해 데이터를 읽어와야 하므로 시간이 오래걸린다. 따라서 context switch가 일어난다.
- Minor page faults
	- lazy allocation (`malloc()`을 하면 OS는 우선 virtual address만 할당한다. 그리고 처음으로 사용하려고 할 때 fault를 내고 physical address를 할당한 뒤에 돌려준다.)
	- 금방 할 수 있는 작업이므로 context switch가 일어나지 않는다.
- Invalid page faults
	- segmentation violation과 같은 실제로 사용하면 안되는 페이지에 접근하려고 했을 경우

### **Paging의 장단점**


장점

- external fragmentation이 없다.
- 할당/해제가 빠르다
- 메모리가 부족하면 잘 사용하지 않는 페이지를 통째로 디스크로 뺄 수 있다.
- 페이지 단위로 관리하기 때문에 프로세스 간에 Protection, Sharing이 용이하다.

단점

- 메모리를 고정 크기로 자르기 때문에 internal fragmentation이 생긴다
- address translation을 위해 메모리에 여러 번 접근해야 해서 느리다.
- 페이지 테이블을 저장할 공간이 필요하다.

### **정리**


OS가 Virtual Memory를 제공하는 방법에 대해서 알아보았다. 현재는 paging을 가장 많이 사용하기 때문에, paging의 단점을 없애려는 노력이 많이 진행되었다. 메모리를 여러 번 접근해야 하는 문제는 TLB(Translation Lookaside Buffer)로, 페이지 테이블을 저장할 공간이 많이 필요하다는 문제는 Multi-level Page Table 등으로 단점을 보완한다. 이러한 내용들에 대해서는 다음 포스트에서 다뤄보도록 하겠다.

