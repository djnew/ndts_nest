import { Module } from '@nestjs/common';
import { CommentsModule } from '../comments/comments.module';
import { CommentsSocketService } from './comments-socket.service';
import { CommentsSocketGateway } from './comments-socket.gateway';

@Module({
  imports: [CommentsModule],
  providers: [CommentsSocketGateway, CommentsSocketService],
})
export class CommentsSocketModule {}
