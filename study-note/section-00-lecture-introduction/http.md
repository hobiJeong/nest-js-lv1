# HTTP

## HTTP란?
- 클라이언트, 서버가 통신하는 방법 중 하나. 프로토콜
- 클라이언트가 요청을 보내면 서버는 응답을 반환
- 요청과 응답의 구조화된 데이터를 보낼 때 일반적으로 JSON 구조를 사용

### JSON
- JS 객체 또는 여타 언어의 Map과 구조가 매우 비슷
- 요청과 응답 body에 사용되는 구조.
- 보낼 때 String으로 변환하고 받으면 다시 JSON으로 변환.
- Key / Value 짝으로 이루어져 있고 콜론을 기준 왼쪽이 Key, 오른쪽이 Value
- Key는 String만 허용
- Value는 숫자, String, 중첩된 JSON 그리고 List 등이 허용됨.

### HTTP 요청의 구성 요소
- URL: 요청을 보내는 주소
- Method: 요청의 종류/타입 (GET/POST/PUT/PATCH/DELETE)
- Header: 요청의 메타데이터
    - 데이터에 관련된 데이터
    - 즉 우리가 보내는 HTTP 요청의 정보를 헤더에 넣게 됨.
    - Host, Cookie, User-Agent, Accept 등
    - String: String 으로 입력이 됨.
- Body: 요청에 관련된 데이터

https(Scheme(Protocol))://blog.code-factory.ai(Host(흔히 Domain이라고도 부르는 영역))/javascript(Path(요청하는 리소스))?page=1(Query Parameter(일반적으로 필터링에 많이 사용됨))

#### Method
- 같은 URL에 여러개의 Method가 존재 할 수 있다.
- GET 요청은 데이터를 조회할때 사용.
- POST 요청은 데이터를 생성할때 사용.
- PUT 요청은 데이터를 업데이트 또는 생성 할때 사용.
- PATCH 요청은 데이터를 업데이트 할때 사용.
    - PATCH 요청과 PUT 요청의 차이는 PUT 요청은 데이터가 존재하지 않으면 생성함.
    - PATCH 요청은 데이터가 존재하지 않으면 에러를 던지는게 정석.
- DELETE 요청은 데이터를 삭제할때 사용.

#### Header?
- Header는 메타데이터를 정의한다.
- 메타데이터는 데이터에 대한 데이터 즉, 요청에 대한 정보를 정의한다.
- 흔한 예제로 Cookie, 인증 토큰, 요청의 바이트 길이, 요청/응답을 보낸 Host, 요청할 때 사용된 클라이언트 타입과 버전 등을 정의한다.
- Key / Value 형태로 정의되고 Key Value 모두 String
- 라이브러리/프레임워크/환경에 의해 자동 생성되는 값들이 많고 직접 값을 변경하는 경우는 Body보단 상대적으로 적다.
Accept: application/json

#### Body?
- Body는 요청에 대한 로직 수행에 직접적으로 필요한 정보를 정의한다.
- 만약에 새로운 블로그 글을 생성하는 POST 요청을 한다면 이 글을 생성할때 필요한 제목, 내용등의 모든 데이터를 Body에 입력하게 된다.
- 일반적으로 JSON 구조를 사용한다.
- Header와 가장 큰 차이점은 Header는 요청 자체에 대한 정보를 담고 있고 Body는 요청을 수행하는데 필요한 데이터를 담고 있다는 것이다.

### HTTP 응답의 구성 요소
- Status Code: 응답의 종류
- Header: 응답의 메타데이터
- Body: 응답에 관련된 데이터

#### Status Code
- Status Code는 응답 상태를 분류해줌.
- 100~599
- 100-199 Informational Response(정보 응답)
- 200-299 Successful Response(성공 응답)
- 300-399 Redirection Message (리다이렉션 메세지)
- 400-499 Client Error Response(클라이언트 에러 응답)
- 500-599 Server Error Response(서버 에러 응답)

#### 주요 Status Code 정리
- 200(OK) - 문제 없이 요청이 잘 실행됨.
- 201(Created) - 문제없이 데이터 생성이 잘 됨(POST 요청에서 많이 사용)
- 301(Moved Permanently) - 리소스가 영구적으로 이동됨
- 400(Bad Request) - 요청이 잘못됨(필수 값 부족 등)
- 401(Unauthorized) - 인증 토큰/키가 잘못됨
- 403(Forbidden) - 접근 불가능한 리소스. 401과 달리 인증은 된 상태
- 404(Not Found) - 존재하지 않는 리소스.
- 405(Method Not Allowed) - 허가되지 않은 요청 Method
- 500(Internal Server Error) - 알 수 없는 서버 에러