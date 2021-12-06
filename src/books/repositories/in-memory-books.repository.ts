import { v4 as uuidv4 } from 'uuid';
import { BookModel } from '../entities/book.entity.js';
import { CreateBookDto } from '../dto/create-book.dto.js';
import { UpdateBookDto } from '../dto/update-book.dto.js';
import { Injectable } from '@nestjs/common';

const books: Array<BookModel> = [];

@Injectable()
export class InMemoryBooksRepository {
  create(createBookDto: CreateBookDto): BookModel {
    const book = {
      id: uuidv4(),
      ...createBookDto,
    };
    books.push(book);
    return book;
  }

  findAll(): Array<BookModel> {
    return books;
  }

  findOne(id: string): BookModel | false {
    const book = books.find((book) => book.id === id);
    if (!book) {
      return false;
    }

    return book;
  }

  update(id: string, updateBookDto: UpdateBookDto): BookModel | false {
    const book = books.find((book) => book.id === id);
    if (!book) {
      return false;
    }

    for (const key of Object.keys(updateBookDto)) {
      console.log(key);
      if (key in book) {
        book[key] = updateBookDto[key];
      }
    }
    return book;
  }

  remove(id: string): boolean {
    const index = books.findIndex((book) => book.id === id);
    books.splice(index, 1);
    return true;
  }
}
