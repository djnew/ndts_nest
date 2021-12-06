import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { BookModel } from 'src/books/entities/book.entity';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';

export const I_BOOK_REPOSITORY = 'I_BOOK_REPOSITORY';
export interface IBookRepository {
  create(createBookDto: CreateBookDto): BookModel;
  findAll(): Array<BookModel>;
  findOne(id: string): BookModel | false;
  update(id: string, updateBookDto: UpdateBookDto): BookModel | false;
  remove(id: string): boolean;
}
