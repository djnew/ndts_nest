import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  I_BOOK_SERVICE,
  IBooksService,
} from '../books/services/i-book.service';
import { Comment, CommentDocument } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(I_BOOK_SERVICE) private readonly booksService: IBooksService,
    @InjectModel(Comment.name)
    private readonly commentRepository: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const book = this.booksService.findOne(createCommentDto.bookId);
    if (!book) {
      return false;
    }

    const newComment = new this.commentRepository(createCommentDto);
    try {
      return await newComment.save();
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async findAllBookComment(id: string) {
    return await this.commentRepository
      .find({ bookId: id })
      .select('-__v')
      .exec();
  }

  async findAll() {
    return await this.commentRepository.find().select('-__v').exec();
  }

  async findOne(id: string) {
    try {
      const book = this.commentRepository.findById(id);
      return book ?? false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const book = this.commentRepository.findByIdAndUpdate(
        id,
        updateCommentDto,
      );
      return book ?? false;
    } catch (e) {
      return false;
    }
  }

  async remove(id: string) {
    try {
      await this.commentRepository.deleteOne({ _id: id });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
