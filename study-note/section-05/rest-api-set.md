# 일반적인 상황의 REST API 메서드 세트

## GET
- http://localhost:3000/posts 
>다수의 Post를 가져온다. `Query` 사용 <br>
다수의 데이터를 가져오는 API가 있는데 단일 Post 조회에 대한 API가 왜 필요하냐고 의문을 가질 수 있는데
우리가 다수의 데이터를 가져올 때에는 최소한의 데이터, 예를 들어 제목에 내용 3줄 정도만 보여준다고 하면 그런 최소한의 데이터만 붙여서 보내주는거다.
왜냐면 데이터를 하나하나 추가하는데 다 돈이 들기 때문. 전송하는데 비용이 든다.
클라우드 서비스는 다 그렇다.
그래서 다수의 정보를 보여줄 때에는 정보를 최소화 해서 보내주고 특정 데이터를 좀 더 상세한 정보를 가져오고 싶으면 아래의 상세 조회를 이용하면 된다.
- http://localhost:3000/posts/11 
>11이라는 ID를 갖고 있는 Post 하나를 가져온다. `Query` 사용

## POST
- http://localhost:3000/posts
>새로운 Post를 생성한다. `Body` 사용

## PATCH
- http://localhost:3000/posts/8
>8이라는 ID를 갖고 있는 Post를 부분 변경한다. `Body` 사용

## PUT
- http://localhost:3000/posts/8
>8이라는 ID를 갖고 있는 Post를 변경하거나 생성한다. `Body` 사용
>PATCH,PUT 둘 중 하나만 사용하는 상황이 굉장히 많음.
>둘 다 필요한 상황이 아니라면 둘 중 하나만 취향껏 사용하면 된다.

## DELETE
- http://localhost:3000/posts/3
>3이라는 ID를 갖고 있는 Post를 삭제한다. `Body` 사용