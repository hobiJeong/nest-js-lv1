import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException)
export class WebSocketExceptionFilter extends BaseWsExceptionFilter<WsException> {
  catch(exception: WsException, host: ArgumentsHost): void {
    const socket: Socket = host.switchToWs().getClient();

    console.log(exception);

    socket.emit('exception', {
      data: exception.getError(),
    });
  }
}
