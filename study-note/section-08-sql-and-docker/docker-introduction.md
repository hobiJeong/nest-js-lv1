# Docker Introduction

## 과거의 협업
- 모든 프로그램은 여러개의 컴퓨터에서 구동할 수 있어야 함.
    - 여기서 항상 문제가 되는 부분은 다른 컴퓨터에서 프로젝트가 실행이 안되는 경우가 빈번함. ex) `잉 제 컴퓨터에선 되는데요?`

### Multi Platform
- 해당 문제가 발생하는 이유는 Multi Platform
    - Windows, macOS, Linux 등
- 전부 다 환경이 다 다름. 애초에 무언가를 호환되게 만들지를 않음.
    - 이것만이 큰 문제는 아님.
        - nodeJS, yarn, NestJS, 환경변수 등등 설치를 다 해줘야 함.


### Dockerfile
- 위의 꼭 지켜야 하는 설치 절차들을 정의할 수 있는게 Dockerfile
- 위 절대적으로 지켜야 하는 설치 절차들을 Dockerfile로 작성하고 도커에서 실행을 하면 알아서 도커가 실행해줌.
    - 도커를 실행하고 있는 플랫폼 기반이 어떤 것이든 항상 똑같은 환경에서 똑같은 조건대로 프로그램을 실행할 수 있음.
        - `잉 제 컴퓨터에선 안되는데요?`를 해결
- 쿠버네티스도 도커(컨테이너)의 개념에 기반이 되어 있음.

#### 내가 대충 아는 정보 사실
- 원래는 VMWare같은 가상 환경에 OS(GuestOS)를 구동하는 가상 머신을 사용했음.
- 하지만 Docker의 컨테이너는 GuestOS를 설치하지 않음.
    - 자원의 효율성 측면에서 차이가 난다.
    - VM은 하나씩 늘 때마다 OS를 위한 자원 할당이 필수.
    - 도커는 어플리케이션 구동에 필요한 모든 패키지만 있으면 구동이 가능.
- 이와 같은 것들이 가능한 이유는 Docker는 호스트 OS(서버의 OS)의 커널을 공유함.
    - 커널: 하드웨어 자원을 관리하고 하드웨어와 프로세스 사이의 인터페이스 역할을 수행하는 OS의 핵심 구성 요소 중 하나
    - 커널을 컴퓨팅 자원을 가상화하고 이를 프로세스에 할당
    - > Redhat: 커널은 강력한 경영진(하드웨어)를 위해 일하는 바쁜 비서입니다. 비서의 할 일은 직원 및 대중(사용자)으로부터 수신되는 메세지 및 요청(프로세스)을 경영진에게 전달하고, 어디에 무엇이 저장되어 있는지 기억(메모리)하고, 특정한 시간에 누가 경영진을 얼마 동안 만날 수 있는지 결정하는 것입니다.
- 이 외에는 [참조 링크](https://velog.io/@kdaeyeop/%EB%8F%84%EC%BB%A4-Docker-%EC%99%80-VM%EC%9D%98-%EC%B0%A8%EC%9D%B4)에서 확인

## Docker
- Infrastructure
    - 하드웨어. CPU, 그래픽카드, 네트워크 카드 등등
- Host OS (macOS, Windows, Linux)
- Docker Engine
    - Docker Engine을 올리는 순간 각각의 플랫폼 별 신경 써야할 요소들은 도커 엔지니어들만 신경 쓰면 됨.
        - 도커 프로그램을 개발하는 개발자들이 이 도커 엔진이 각 OS와 어떻게 연동이 될 지를 신경만 써주면 됨.
    - 우리는 이제 도커 엔진과 연동만 하면 됨.
        - `Dockerfile`을 사용해서.
        - Dockerfile을 작성하는 방법만 알면 됨.
- NestJS, Postgresql, MongoDB, Bins/Libs * 3
    - 이제 개발자 입장에선 어떤 프로그램이든 컨테이너(Dockerfile로 하나하나 생성하는 프로그램들)를 자유롭게 배포할 수 있음.
    - `NestJS를 배포할 때 어떤 것들이 필요한지, 어떤 것들을 정의해야 하는지를 정해놓고 컨테이너로 패키징하고 도커엔진에 실행해.`라고 하면 어떤 환경에서든 똑같은 환경으로 실행이 됨.
    - 그 외에 Postgresql, MongoDB 등등도 마찬가지.
- 이런 것들을 가능하게 해주는게 Docker.

### VM(Virtual Machine), Docker의 차이
- Docker는 Docker Engine을 통해 컨테이너를 올림.
- 가상화를 할 경우엔 Hypervisor라는게 올라감.
- 중간중간에 Guest OS가 있음.
- Hypervisor를 통해 각각의 환경에서 프로그램을 실행할 OS를 따로 설치해야 함.
    - 굉장히 Heavy
- Docker의 경우엔 그냥 native하게 Host OS 커널이랑 소통을 함.
    - 굉장히 빠르고 효율적.
- Docker는 한마디로 특정 프로그램을 실행을 할 때 필요한 환경과 패키지들 그리고 명령어들을 하나의 도커파일이라는 컨테이너로 묶어서 그 어떤 환경에서든 도커만 설치가 되어 있으면 똑같은 조건속에서 해당 컨테이너를 실행할 수 있도록 해주는 것.

    