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

  @SubscribeMessage('enter_chat')
  enterChat(
    // 방의 chat ID들을 리스트로 받는다.
    @MessageBody() data: number[],
    @ConnectedSocket() socket: Socket,
  ) {
    for (const chatId of data) {
      // socket.join()
      socket.join(chatId.toString());
    }
  }

  // socket.on('send_message', (message) => { console.log(message) });
  @SubscribeMessage('send_message')
  sendMessage(
    @MessageBody() message: { message: string; chatId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    this.server
      .in(message.chatId.toString())
      .emit('receive_message', message.message);
  }
}
