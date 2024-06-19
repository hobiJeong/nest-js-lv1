# Gateway Lifecycle Hooks
- `Gateway`에서 handleConnection 메서드 처럼 연결 됐을 때 특정한 로직을 실행할 수 있도록 코드를 작성 했었음.
    - 이것을 `Lifecycle Hooks`라고 함.
- 이러한 기능이 2개가 더 있음.

## OnGatewayInit
- implements하면 `afterInit` 이라는 메서드를 작성하게 함.
    - 이 메서드는 실제로 `server`를 inject 받을 때 사용 되는 메서드 이기도 함.
- `Gateway`가 초기화 됐을 때 실행할 수 있는 메서드.
- afterInit 메서드의 파라미터로 받는 server는 실제로 `@WebSocketServer() 데코레이터를 통해 주입받는 server와 완전히 똑같은 객체

## OnGatewayDisconnect
- `handleDisconnect` 메서드를 작성하게 함.
- `handleConnection`과 반대로 연결이 끊어졌을 때 실행 되는 로직.