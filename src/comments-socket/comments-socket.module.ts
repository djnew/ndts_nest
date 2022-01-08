import { Module } from '@nestjs/common';
import { CommentsSocketService } from './comments-socket.service';
import { CommentsSocketGateway } from './comments-socket.gateway';

@Module({
  providers: [CommentsSocketGateway, CommentsSocketService]
})
export class CommentsSocketModule {}
