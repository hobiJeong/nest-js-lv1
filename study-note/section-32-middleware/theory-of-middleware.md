# Theory of middleware

## 미들웨어의 특징 및 역할
- 가장 먼저 요청을 받음
- 어떤 코드든 실행 할 수 있다.
- 요청과 응답 객체에 변화를 만들어 줄 수 있다.
- `request` / `response` 사이클을 중지 시킬 수 있다. (가드 같은 역할도 가능)
- `middleware`를 원한다면 여러개를 적용 할 수 있음(적용 된 순서대로 실행 됨).
- 만약에 현재 `middleware`가 request cycle을 중지 시키지 않는다면(에러를 던지지 않는다면) 다음 `middleware`로 control을 넘기기 위해서 `next` 함수를 호출해야 한다. 그렇지 않는다면 요청은 그대로 계속 멈춰 있을 것이다.

