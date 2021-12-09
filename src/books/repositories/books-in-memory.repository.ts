import { v4 as uuidv4 } from 'uuid';
import { BookModel } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Injectable } from '@nestjs/common';
import { IBookRepository } from 'src/books/repositories/i-book.repository';

const books: Array<BookModel> = [];

@Injectable()
export class BooksInMemoryRepository implements IBookRepository {
  async create(createBookDto: CreateBookDto): Promise<BookModel> {
    const book = {
      id: uuidv4(),
      ...createBookDto,
    };
    books.push(book);
    return book;
  }

  async findAll(): Promise<BookModel[]> {
    return books;
  }

  async findOne(id: string): Promise<BookModel | false> {
    const book = books.find((book) => book.id === id);
    if (!book) {
      return false;
    }

    return book;
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BookModel | false> {
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

  async remove(id: string): Promise<boolean> {
    const index = books.findIndex((book) => book.id === id);
    books.splice(index, 1);
    return true;
  }
}
