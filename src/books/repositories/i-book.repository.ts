import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { BookModel } from 'src/books/entities/book.entity';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';

export const I_BOOK_REPOSITORY = 'I_BOOK_REPOSITORY';

export interface IBookRepository {
  create(createBookDto: CreateBookDto): Promise<BookModel | false>;

  findAll(): Promise<BookModel[]>;

  findOne(id: string): Promise<BookModel | false>;

  update(id: string, updateBookDto: UpdateBookDto): Promise<BookModel | false>;

  remove(id: string): Promise<boolean>;
}
