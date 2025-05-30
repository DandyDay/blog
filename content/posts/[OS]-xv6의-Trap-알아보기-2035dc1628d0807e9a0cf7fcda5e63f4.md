---
title: "[OS] xv6의 Trap 알아보기"
date: "2025-05-30T15:10:00.000Z"
lastmod: "2025-05-30T15:21:00.000Z"
draft: false
series: []
authors:
  - "Jinho"
tags: []
categories: []
summary: "xv6 Chapter 4 일부 정리"
NOTION_METADATA:
  object: "page"
  id: "2035dc16-28d0-807e-9a0c-f7fcda5e63f4"
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
      rich_text:
        - type: "text"
          text:
            content: "xv6 Chapter 4 일부 정리"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "xv6 Chapter 4 일부 정리"
          href: null
    Name:
      id: "title"
      type: "title"
      title:
        - type: "text"
          text:
            content: "[OS] xv6의 Trap 알아보기"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "[OS] xv6의 Trap 알아보기"
          href: null
  url: "https://www.notion.so/OS-xv6-Trap-2035dc1628d0807e9a0cf7fcda5e63f4"
  public_url: null
MANAGED_BY_NOTION_HUGO: true

---


학교 운영체제 과목의 과제를 하기 위해 [xv6: a simple, Unix-like teaching operating system](https://pdos.csail.mit.edu/6.S081/2020/xv6/book-riscv-rev1.pdf)의 Chapter 4 일부를 읽고 정리한 문서이다.


## **Chapter 4. Traps and system calls**


CPU가 하던 일을 잠깐 멈추고 다른 일을 하도록 하는 방법에는 3가지가 있다.

1. 시스템 콜을 부를 때 (`ecall` instruction을 실행할 때)
1. _Exception_ (divide by zero, invalid virtual address와 같은 illegal instruction)
1. _Interrupt_ (I/O가 끝나서 디바이스가 처리를 부탁할 때)

이 책에서는 위 세가지 경우를 모두 통틀어 _trap_이라고 한다. 이 트랩이 실행될 때 실행되고 있던 코드는 trap에서 다시 돌아왔을 때 아무 일도 없었던 것처럼 실행되어야 한다. 따라서 커널은 실행되고 있던 코드의 상태와 레지스터들을 어딘가에 백업해두고 trap에서부터 돌아올 때 이것들을 다시 복원한다.


> 💡 책에서는 trap을 이 세 가지로 분류하고 있지만, 사실 `ecall`은 Exception의 한 종류이다. 따라서 `ecall`을 supervisor mode로 delegate하는 것을 막고 싶다면, `medeleg` 레지스터를 수정하면 된다. 어떤 bit를 수정해야 할 지는 `mcause`를 참고하면 된다. (i.e. 비트 8을 1로 set하면 u-mode에서의 ecall이 supervisor mode로 delegate된다.)


Xv6는 모든 trap을 커널에서 처리한다. System call을 커널에서 처리하는 것은 자연스러운 일이고, interrupt를 커널에서 실행하는 것은 커널이 유일하게 장치를 동작시킬 수 있고, 많은 프로세스들 사이에서 장치를 공유할 수 있는 간편한 메커니즘이 있기 때문이다. exception을 커널에서 실행하는 이유는 xv6가 exception을 일으킨 유저 프로그램을 kill하는 방식으로 처리하기 때문이다.


Xv6 trap 핸들링 프로세스는 4가지 스테이지를 거친다.

1. RISC-V CPU에서의 하드웨어 동작
1. 커널의 C 코드를 준비하기 위한 어셈블리 instruction
1. trap을 어떻게 처리할 것인지 결정할 C 함수
1. 시스템콜 또는 장치 드라이버 서비스 루틴

이 모든 trap을 하나의 code path로 처리하는 것이 가능하지만, 세 가지로 나누어 처리해야 편리하다: user space에서 발생한 trap, kernel space에서 발생한 trap, 그리고 timer interrupt이다. trap을 처리하는 커널 코드는 _handler_라고 불리고, 첫 handler instruction은 주로 C보다는 어셈블리어로 구현되어 있으며 _vector_라고 불리기도 한다.


### **4.1 RISC-V trap machinery**


각각의 RISC-V CPU는 커널이 CPU에게 어떻게 trap을 처리해야 하는지 알려주는 레지스터가 있다. 다음은 이 상황에서 xv6에서 사용하는 가장 중요한 레지스터들이다:

- `stvec`: 커널은 여기에 trap handler의 주소를 적는다. RISC-V는 trap을 처리하기 위해 여기로 점프한다.
- `sepc`: trap이 발생했을 때의 pc(Program Counter)를 여기에 저장한다. (`pc`에 `stvec`를 적어야 하기 때문이다.) trap에서 빠져나오는 `sret` instruction은 이 `sepc`를 다시 `pc`에 쓴다.
- `scause`: trap이 어떤 이유로 일어났는지에 대한 정보가 적힌다.
- `sscratch`: trap handler가 시작할 때 유용한 값을 적는다.
- `sstatus`: `sstatus`의 SIE 비트는 디바이스 interrupt가 활성화 되었는지를 나타낸다. 이 비트가 꺼져있으면 RISC-V는 커널이 다시 이 비트를 켤 때 까지 interrupt를 받지 않는다. SPP 비트는 trap이 supervisor mode 또는 user mode 중 어디에서 왔는지 나타낸다. 따라서 `sret`할 곳을 제어한다.

위의 레지스터들은 trap이 supervisor mode에서 처리될 때 사용된다. user mode에서는 접근할 수 없다. machine mode일 때 접근할 수 있는 레지스터가 또 따로있는데, xv6는 timer interrupt의 특별한 경우에만 이를 사용한다.


timer interrupt가 아닌 모든 trap에 대해서 RISC-V는 다음과 같이 처리한다.

1. 만약 trap이 device interrupt이고, `sstatus`의 SIE 비트가 꺼져있다면, 아무 것도 하지 않는다.
1. SIE를 꺼서 interrupt를 끈다.
1. `pc`를 `sepc`에 복사한다.
1. 현재의 모드(user 또는 supervisor)를 `sstatus`의 SPP 비트에 저장한다.
1. `scause`에 무슨 trap인지 저장한다.
1. 모드를 supervisor mode로 변경한다.
1. `stvec`를 `pc`에 복사한다.
1. 새로운 `pc`를 실행한다.

CPU가 커널 페이지 테이블을 커널에 있는 스택으로 바꾸지 않았다. 또한 `pc`이외의 모든 레지스터들도 저장하지 않았다. 이는 커널 소포트웨어가 모두 수행해야 한다. 이는 소프트웨어의 유연성을 위해서 CPU가 최소한의 작업만 하기 때문이다.


CPU가 더 최소한의 작업만 하지 않고 이 작업은 꼭 해야 하는 이유는 user/kernel isolation 때문이다.


### **4.2 Trap from user space**


user space에서의 trap은 실행하는 user program에서 시스템 콜을 하거나(`ecall` instruction), 잘못된 것을 하거나(illegal instruction), device interrupt가 발생한 경우에 발생한다. 이 트랩은 `uservec` -> `usertrap` -> `usertrapret` -> `userret`의 순서대로 진행된다.


RISC-V 하드웨어는 trap이 발생되었을 때 page table을 바꾸지 않으므로, user page table의 `stvec` 레지스터는 `uservec`함수를 제대로 가리키고 있어야 한다. 그리고 `uservec`에서는 page table을 user page table에서 kernel page table로 바꾸어주어야 한다. 그리고 이 바꾸는 과정을 제대로 하기 위해서는, `uservec`함수가 kernel page table과 user page table에서 각각 같은 위치에 매핑되어 있어야 한다.


이를 위해서 xv6에서는 _trampoline_ 페이지가 `uservec`을 가지고 있게 한다. 그리고 이 trampoline 페이지가 kernel과 user page table 모두에서 같은 위치에 있도록 한다.


`uservec`이 실행되면, 모든 레지스터는 trap이 소유하게 되므로 프로세스의 trapframe에 레지스터를 모두 백업해둔다. 그리고 `usertrap`함수를 실행시킨다. `usertrap`에서는 trap이 왜 일어났는지 알아내서, 처리하고, 돌려준다. `usertrap`에서 가장 먼저 하는 일은, 커널에서 받는 trap을 uservec이 아닌 kernelvec으로 보내야 하기 떄문에 `stvec`를 kernelvec으로 바꿔준다. 그리고 `sepc` 레지스터를 저장한다. trap이 system call일 경우에는 `syscall()`이 처리하도록 하고, device interrupt인 경우에는 `devintr()`이 처리하도록 한다. exception이라면 프로세스를 kill한다. system call의 경우에는 user program counter에 4를 더하는데, 이는 system call이 끝난 후에 `ecall` instruction의 다음 instruction을 실행해야 하기 때문이다. `usertrap` 함수 마지막에서는 프로세스가 kill되었는지, CPU를 yield해야 하는지 확인한다.


> ℹ️ 여기서 system call의 경우 pc에 4를 더해주는 연산이 있는데, 과제에서 machine mode trap handler를 수정할 때 고려해야 하는 부분 중 하나였다.


trap에서 user space로 돌아오는 첫 과정은 `usertrapret`이다. 이 함수는 `stvec`를 다시 uservec으로 바꿔주고, 저장해둔 `sepc` 값을 읽어와서 다시 바꿔준다. 마지막에는 trampoline page에 있는 `userret`을 불러준다.


`userret`을 부를 때 `a0` 레지스터에 프로세스의 user page table을 넘겨준다. `userret`이 이를 받아서 kernel page table을 가리키고 있던 `satp`를 user page table을 다시 가리킬 수 있도록 한다. 이후 trapframe에서 모든 레지스터 값을 복구해주고 `sret`을 실행해 user space로 돌아온다.

