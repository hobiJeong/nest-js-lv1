# Backend Engineer 소개

## Backend Engineer란?
-  `백엔드 엔지니어`란 서버 사이드(Server Side) 프로그램을 디자인하고, 개발하고, 유지보수 하는 역할을 한다.
### Frontend
- 사용자가 실제로 제일 먼저 마주치는, 우리 시스템과 interaction을 하는 부분이 Frontend
> Web / Mobile / Desktop
### Backend
- 백엔드는 프론트엔드가 통신을 하는 곳. 통신을 해서 정보를 요청, 생성, 삭제 등등의 기능을 요청할 수 있는 곳이 `백엔드(서버)`. 서버가 백엔드의 큰 부분중 하나.
> API Server / Database / Infrastructure

서로 REST API / GraphQL / gRPC 등의 프로토콜들을 통해 통신을 함.

## 백엔드의 구분

### API Server
- 프론트엔드와 백엔드 또는 백엔드끼리의 연결을 가능하게 해주는 영역
> **관련 키워드** <br/>
`FrameWork`: [NestJS / Django / Spring]<br/>
`Protocol`: [GraphQL / REST API / gRPC]

### DataBase
- 데이터 저장소
    - API Server에서 로직을 수행할 때 잊어버리면 안되는 정보들, 예를 들어 instagram에서 누가 글을 썼는지, 이미지, 좋아요 정보 등을 서버에서 기억을 해야 함.
    - 이러한 것들을 API Server에서 Database에 전송을 하고 입력하여 사리지지 않도록 오랫동안 저장할 수 있는 공간
> **관련 키워드** <br/>
Postgresql / MySQL / Oracle / MongoDB / DynamoDB

### Infrastructure 
- 백엔드를 실행하는 하드웨어를 관리하는 영역
    - 클라우드 엔지니어, 데브옵스 엔지니어들이 속하는 영역
- 비용을 많이 절감하고, 대용량의 트래픽들을 받을 수 있게 해주는 가장 큰 부분
> **관련 키워드** <br/>
Cloud / K8s / DevOps

