import { Injectable } from '@nestjs/common';
import { CreateCommentsSocketDto } from './dto/create-comments-socket.dto';
import { UpdateCommentsSocketDto } from './dto/update-comments-socket.dto';

@Injectable()
export class CommentsSocketService {
  create(createCommentsSocketDto: CreateCommentsSocketDto) {
    return 'This action adds a new commentsSocket';
  }

  findAll() {
    return `This action returns all commentsSocket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentsSocket`;
  }

  update(id: number, updateCommentsSocketDto: UpdateCommentsSocketDto) {
    return `This action updates a #${id} commentsSocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentsSocket`;
  }
}
