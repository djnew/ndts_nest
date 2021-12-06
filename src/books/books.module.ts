import { Module } from '@nestjs/common';
import { BooksService } from 'src/books/services/books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from 'src/books/repositories/in-memory-books.repository';
import { I_BOOK_REPOSITORY } from 'src/books/repositories/i-book.repository';
import { I_BOOK_SERVICE } from 'src/books/services/i-book.service';

@Module({
  controllers: [BooksController],
  providers: [
    {
      provide: I_BOOK_REPOSITORY,
      useClass: BooksRepository,
    },
    {
      provide: I_BOOK_SERVICE,
      useClass: BooksService,
    },
  ],
})
export class BooksModule {}
