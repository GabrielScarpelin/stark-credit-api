import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  constructor() {}
  private readonly connectedClients: Map<string, Socket> = new Map();
  async sendMessage(socketId: string, message: string, event: string) {
    const client = this.connectedClients.get(socketId);
    if (client) {
      client.emit(event, message);
    }
  }
  async addClient(socketId: string, client: Socket) {
    this.connectedClients.set(socketId, client);
  }
  async removeClient(socketId: string) {
    this.connectedClients.delete(socketId);
  }
}
