import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  @WebSocketServer()
  /**
   *    io.of(3000);의 결과 값
   *    서버 객체
   */
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`on connect called : ${socket.id}`);
  }

  // socket.on('send_message', (message) => { console.log(message) });
  @SubscribeMessage('send_message')
  sendMessage(
    @MessageBody() message: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.server.emit('receive_message', 'hello from server');
    socket.emit('receive_message', '특정 소켓 메세지');
  }
}
