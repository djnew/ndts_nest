import { Inject, Injectable } from '@nestjs/common';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentsSocketDto } from './dto/create-comments-socket.dto';

@Injectable()
export class CommentsSocketService {
  constructor(
    @Inject(CommentsService) private readonly commentsService: CommentsService,
  ) {}
  async create(createCommentsSocketDto: CreateCommentsSocketDto) {
    return await this.commentsService.create(createCommentsSocketDto);
  }

  getAllComments(id: string) {
    return this.commentsService.findAllBookComment(id);
  }
}
