import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { BookModel } from 'src/books/entities/book.entity';
import {
  I_BOOK_REPOSITORY,
  IBookRepository,
} from 'src/books/repositories/i-book.repository';
import { IBooksService } from 'src/books/services/i-book.service';

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
