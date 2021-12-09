import { CreateBookDto } from 'src/books/dto/create-book.dto.js';
import { BookModel } from 'src/books/entities/book.entity.js';
import { UpdateBookDto } from 'src/books/dto/update-book.dto.js';

export const I_BOOK_SERVICE = 'I_BOOK_SERVICE';

export interface IBooksService {
  create(createBookDto: CreateBookDto): Promise<false | BookModel>;

  findAll(): Promise<BookModel[]>;

  findOne(id: string): Promise<BookModel | null | false>;

  update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BookModel | null | false>;

  remove(id: string): Promise<boolean>;
}
