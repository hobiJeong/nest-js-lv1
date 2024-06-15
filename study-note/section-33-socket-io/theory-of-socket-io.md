# Theory of Socket.IO

## Socket IO란?
- `Socket.IO`는 `Websocket` 프로토콜을 사용해서 만든 low-latency (낮은 지연 시간), bidirectional(양방향 소통), event based(이벤트 기반)으로 클라이언트와 서버가 통신 할 수 있게 해주는 기능이다.

### Acknowledgement
**서버 코드**
```typescript
socket.emit('hello', 'world', (response) => {
    // '수신 양호'
    console.log(response);
})
```
**클라이언트 코드**
```typescript
// 첫번째 파라미터에 이벤트 이름을 입력하고
// 두번째 파라미터에 메세지가 왔을 때 실행할 함수를 입력한다.
// 함수는 첫번째 파라미터로 메세지, 두번째 파라미터로
// 수신 응답을 할 수 있는 콜백 함수가 주어진다.
socket.on('hello', (message, callback) => {
    // 'world'
    console.log(message);
    callback('수신 양호');
})
```