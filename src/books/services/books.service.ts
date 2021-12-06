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

  create(createBookDto: CreateBookDto): BookModel {
    return this.bookRepository.create(createBookDto);
  }

  findAll(): Array<BookModel> {
    return this.bookRepository.findAll();
  }

  findOne(id: string): BookModel | boolean {
    return this.bookRepository.findOne(id);
  }

  update(id: string, updateBookDto: UpdateBookDto): BookModel | boolean {
    return this.bookRepository.update(id, updateBookDto);
  }

  remove(id: string): boolean {
    return this.bookRepository.remove(id);
  }
}
