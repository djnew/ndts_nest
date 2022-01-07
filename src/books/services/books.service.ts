import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookModel } from '../entities/book.entity';
import {
  I_BOOK_REPOSITORY,
  IBookRepository,
} from '../repositories/i-book.repository';
import { IBooksService } from './i-book.service';

@Injectable()
export class BooksService implements IBooksService {
  constructor(
    @Inject(I_BOOK_REPOSITORY) private readonly bookRepository: IBookRepository,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<false | BookModel> {
    return await this.bookRepository.create(createBookDto);
  }

  async findAll(): Promise<BookModel[]> {
    return this.bookRepository.findAll();
  }

  async findOne(id: string): Promise<BookModel | false> {
    return this.bookRepository.findOne(id);
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BookModel | false> {
    return this.bookRepository.update(id, updateBookDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.bookRepository.remove(id);
  }
}
