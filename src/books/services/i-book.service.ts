import { CreateBookDto } from 'src/books/dto/create-book.dto.js';
import { BookModel } from 'src/books/entities/book.entity.js';
import { UpdateBookDto } from 'src/books/dto/update-book.dto.js';

export const I_BOOK_SERVICE = 'I_BOOK_SERVICE';

export interface IBooksService {
  create(createBookDto: CreateBookDto): BookModel;

  findAll(): Array<BookModel>;

  findOne(id: string): BookModel | boolean;

  update(id: string, updateBookDto: UpdateBookDto): BookModel | boolean;

  remove(id: string): boolean;
}
