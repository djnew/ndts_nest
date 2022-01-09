import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { CommentsSocketService } from './comments-socket.service';
import { CreateCommentsSocketDto } from './dto/create-comments-socket.dto';
import { FindCommentForBookDto } from './dto/find-comment-for-book.dto';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class CommentsSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('WebsocketGateway');

  constructor(private readonly commentsSocketService: CommentsSocketService) {}

  @SubscribeMessage('events')
  handleEvent(client: Socket, data: string): string {
    this.logger.log('test', data);

    return data;
  }

  @SubscribeMessage('addComment')
  async create(
    @MessageBody() createCommentsSocketDto: CreateCommentsSocketDto,
    @ConnectedSocket() client: Socket,
  ) {
    const bookComment = await this.commentsSocketService.create(
      createCommentsSocketDto,
    );

    client.emit('addComment', JSON.stringify(bookComment));
  }

  @SubscribeMessage('findAllCommentsSocket')
  async getAllComments(
    @MessageBody() findCommentForBook: FindCommentForBookDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit(
      'findAllCommentsSocket',
      await this.commentsSocketService.getAllComments(findCommentForBook.id),
    );
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.debug(`Client connected: ${client.id}`);

    client.emit('chat.msgToClient', {
      name: 'server',
      text: `you id: ${client.id}`,
    });
  }
}
