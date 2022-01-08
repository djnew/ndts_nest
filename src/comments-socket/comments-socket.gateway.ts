import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { CommentsSocketService } from './comments-socket.service';
import { CreateCommentsSocketDto } from './dto/create-comments-socket.dto';
import { UpdateCommentsSocketDto } from './dto/update-comments-socket.dto';

@WebSocketGateway()
export class CommentsSocketGateway {
  constructor(private readonly commentsSocketService: CommentsSocketService) {}

  @SubscribeMessage('createCommentsSocket')
  create(@MessageBody() createCommentsSocketDto: CreateCommentsSocketDto) {
    return this.commentsSocketService.create(createCommentsSocketDto);
  }

  @SubscribeMessage('findAllCommentsSocket')
  findAll() {
    return this.commentsSocketService.findAll();
  }

  @SubscribeMessage('findOneCommentsSocket')
  findOne(@MessageBody() id: number) {
    return this.commentsSocketService.findOne(id);
  }

  @SubscribeMessage('updateCommentsSocket')
  update(@MessageBody() updateCommentsSocketDto: UpdateCommentsSocketDto) {
    return this.commentsSocketService.update(
      updateCommentsSocketDto.id,
      updateCommentsSocketDto,
    );
  }

  @SubscribeMessage('removeCommentsSocket')
  remove(@MessageBody() id: number) {
    return this.commentsSocketService.remove(id);
  }
}
