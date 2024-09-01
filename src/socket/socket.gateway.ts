import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: true,
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(SocketGateway.name);
  private readonly connectedClients: Map<string, Socket> = new Map();

  @WebSocketServer() io: Server;

  constructor(private readonly socketService: SocketService) {}

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.connectedClients.set(client.id, client);
  }

  emitMessage(event: string, message: string, socketId: string) {
    this.connectedClients.get(socketId)?.emit(event, message);
  }

  handleDisconnect(client: any) {
    this.connectedClients.delete(client.id);
  }
}
