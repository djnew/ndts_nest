import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from 'src/books/services/books.service';
import { BooksController } from './books.controller';
import { I_BOOK_REPOSITORY } from 'src/books/repositories/i-book.repository';
import { I_BOOK_SERVICE } from 'src/books/services/i-book.service';
import { Book, BookSchema } from 'src/books/entities/book.entity';
import { BooksFireStoreRepository } from './repositories/books-firestore.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [
    {
      provide: I_BOOK_REPOSITORY,
      useClass: BooksFireStoreRepository,
    },
    {
      provide: I_BOOK_SERVICE,
      useClass: BooksService,
    },
  ],
})
export class BooksModule {}
