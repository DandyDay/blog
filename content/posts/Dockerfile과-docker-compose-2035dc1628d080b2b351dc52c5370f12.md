---
title: "Dockerfile과 docker-compose"
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
  id: "2035dc16-28d0-80b2-b351-dc52c5370f12"
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
            content: "Dockerfile과 docker-compose"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Dockerfile과 docker-compose"
          href: null
  url: "https://www.notion.so/Dockerfile-docker-compose-2035dc1628d080b2b351dc52c\
    5370f12"
  public_url: null
MANAGED_BY_NOTION_HUGO: true

---


42 Seoul의 Inception 과제는 Dockerfile과 docker-compose를 이용해서 wordpress 서버를 구축하는 과제이다. 이 과제를 하면서 배운 Docker 관련 내용을 정리해보았다.


## **Docker Container**


도커 컨테이너는 소프트웨어들의 표준화된 묶음이다. 이 안에는 모든 dependencies와 code가 포함되어 있어 Docker Engine만 있으면 어떤 환경에서든 Container를 쉽게 실행할 수 있다. Docker가 독립된 환경을 보장하기 때문에 Docker를 사용하여 애플리케이션을 개발하면 환경에 구애받지 않고 실행될 수 있다. 그렇다면 Docker Container는 어떻게 만들까? 바로 Docker Image를 통해서 만들게 된다.


## **Docker Image**


도커 이미지는 실행할 애플리케이션의 코드와 환경을 모두 포함한 파일이다. 이 이미지를 도커 엔진에서 실행시키면 도커 컨테이너가 된다. 따라서 어떤 애플리케이션을 배포하거나 전달할 때, Docker Image를 전달하면 받은 사람도 동일한 환경에서 실행해볼 수 있게 된다. 쉽게 말해 도커 컨테이너는 도커 이미지의 인스턴스인 셈이다. 이미지는 [Dockerhub](https://hub.docker.com/)에서 다운받아서 사용할 수도 있고, 직접 만들어서 사용할 수도 있다. 물론 다운받은 이미지를 기반으로 수정을 가해서 쓸 수도 있다. 이미지는 만드는 방법이 두 가지가 있는데, 하나는 도커 컨테이너로부터 커밋하는 방법이고, 하나는 `Dockerfile`로부터 빌드하는 방법이다.


## **Dockerfile**


Dockerfile을 이용해서 도커 이미지를 만드는 방법에 대해서 알아보자. 우선 이름이 Dockerfile인 파일을 만든다. 그리고 코드에 다음을 참고해서 명령어를 작성해주면 된다. 더 자세한 정보는 [Dockerfile Reference](https://docs.docker.com/reference/dockerfile/)에서 찾아볼 수 있다.


| Instruction  | Description                  |
| ------------ | ---------------------------- |
| `ARG`        | 빌드타임에서 쓸 변수를 선언합니다.          |
| `CMD`        | 기본적으로 실행할 커맨드를 지정합니다.        |
| `COPY`       | 파일 또는 디렉토리를 컨테이너 내로 복사합니다.   |
| `ENTRYPOINT` | 기본적으로 실행할 executable을 지정합니다. |
| `ENV`        | 환경변수를 설정합니다.                 |
| `EXPOSE`     | 애플리케이션이 듣고 있을 포트를 지정합니다.     |
| `FROM`       | 베이스 이미지로부터 새로운 이미지를 빌드합니다.   |
| `MAINTAINER` | 이미지를 만든 사람을 지정합니다.           |
| `RUN`        | 빌드 시에 커맨드를 실행합니다.            |
| `VOLUME`     | 볼륨 마운트를 생성합니다.               |
| `WORKDIR`    | 작업중인 디렉토리를 변경합니다.            |


이 명령어들이 어떻게 사용되는지 예시를 통해 살펴보자. 아래는 직접 만든 nginx 이미지를 위한 도커파일이다.


```docker
# Dockerfile

FROM debian:bullseye

RUN apt-get update -y && \
	apt-get upgrade -y && \
	apt-get install -y nginx openssl

COPY conf/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
```


### **Docker와 PID 1**


여기서 주의깊게 봐야할 점은, ENTRYPOINT로 그냥 nginx 바이너리를 실행하는 것이 아닌, `daemon off` 옵션을 주어서 실행한다는 것이다. 일반적으로 UNIX 운영체제는 PID 1로 `init`이라는 프로세스를 실행시켜 어떤 다른 프로세스가 켜지면 이 프로세스의 자식 프로세스가 되는 방식으로 프로세스를 관리한다. 그리고 이 프로세스가 종료되면 시스템이 종료된다.


도커는 PID 1로 `init`이 실행되지 않고, 바로 ENTRYPOINT의 프로세스가 실행된다. 따라서 ENTRYPOINT의 프로세스가 꺼지면 컨테이너가 꺼진다. 이를 방지하기 위해 nginx가 백그라운드로 실행되지 않도록 `daemon off` 옵션을 주도록 하면 계속 켜져있게 된다.


또한 PID 1인 프로세스는 기본적으로 `SIGTERM`을 핸들링하지 않는다. 따라서 시그널을 핸들링하지 않고 무한정 돌아가는 프로세스인 tail -f 같은 명령어를 입력하게 되면 종료 신호를 주어도 정상적으로 종료되지 않고 10초 뒤 `SIGKILL`신호를 받고 종료된다. 따라서 시그널을 제대로 핸들링할 수 있는 프로세스를 실행시켜 주는 것도 중요하다.


### **도커 이미지 레이어**


RUN 커맨드를 여러번 실행하지 않고 한번에 묶어서 실행했다. 도커 이미지는 하나의 독립적인 환경을 구성하기 때문에 용량이 꽤나 큰 편에 속한다. 이 큰 이미지가 조금 수정될 때 마다 이를 모두 다운받는 것은 효율적이지 못하다. 따라서 도커 이미지는 레이어라는 개념을 사용하는데, 도커파일의 한 명령어가 실행될 때 마다 레이어가 하나씩 생기게 되고, 한 레이어가 수정될 때 이미 캐시된 레이어의 수정사항은 그대로 두고 수정된 명령어의 레이어부터 다시 만들게 된다. 따라서 RUN 명령어를 적게 쓸수록 도커 이미지의 용량을 줄일 수 있다.


![Docker layers](https://dandyday.github.io/blog/inception/layers.png)


### **도커 이미지로 빌드하기**


이렇게 만든 도커파일을 이미지로 빌드할 때는 `docker build [OPTIONS] PATH | URL | -` 명령어를 통해 빌드한다.


```bash
$ docker build -t nginx-image:1.0 .
```


`-t` 옵션은 생성될 이미지의 이름과 Tag를 지정할 수 있는 옵션이다. 자세한 정보는 [docker image build](https://docs.docker.com/reference/cli/docker/image/build/)에서 찾아볼 수 있다.


## **Docker compose**


Inception 과제에서는 이렇게 만든 이미지 3개(nginx, mariadb, wordpress)를 이용해서 하나의 통합된 서비스를 구축하는 과제이다. 이 이미지 3개를 각각의 컨테이너로 만들어서 돌리고, 같은 네트워크 내에서 돌아가도록 하는 등의 설정을 하려면 명령어를 꽤나 많이 입력해야 한다. Docker compose는 이 과정을 한 번의 명령어로 할 수 있도록 설정을 저장하는 파일이다. 사용자는 설정파일을 만든 뒤에 단순히 `docker compose up`이라는 명령어만 실행하면 된다. 이를 위해서는 먼저 `compose.yaml` 또는 `docker-compose.yaml`파일을 만들어준다. 이후 적절한 설정들을 써주어 각각의 서비스가 의도한 설정대로 실행될 수 있도록 한다.


```yaml
# docker-compose.yaml

version: '3.8'

networks:
  inception:
services:
  nginx:
    image: nginx
    container_name: nginx
    build: requirements/nginx
    volumes:
      - "volume_wp:/var/www/html"
    ports:
      - "443:443"
    env_file:
      - .env
    restart: always
    networks:
      - inception
    depends_on:
      - wordpress
```


`services`내에 만들 서비스의 이름을 하나 명시해주고, 그에 대한 설정들을 적어준다. `image`와 `container_name`은 각각 만들어질 이미지와 컨테이너의 이름을 특정해 주는 명령어이다. `build`는 이미지를 빌드할 때 쓰일 Dockerfile의 경로를 적어줄 수 있다. 그 외에도 `volumes`를 통해 도커 볼륨을 주고, `ports`를 통해 포트 포워딩을 하고, `env_file`을 통해 컨테이너에서 사용할 환경변수들을 제공할 수도 있다. 이렇게 docker compose파일을 작성하고 `docker compose up` 명령어를 입력하면 손쉽게 서비스를 구동할 수 있고, `docker compose down`을 통해 그 서비스를 다시 내릴 수도 있다.

