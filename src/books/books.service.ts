import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InMemoryBooksRepository } from './repositories/in-memory-books.repository.js';
import { BookModel } from './entities/book.entity.js';

@Injectable()
export class BooksService {
  constructor(
    @Inject(InMemoryBooksRepository)
    private readonly bookRepository: InMemoryBooksRepository,
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
