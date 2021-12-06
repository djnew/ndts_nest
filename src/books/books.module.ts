import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { InMemoryBooksRepository } from './repositories/in-memory-books.repository.js';

@Module({
  controllers: [BooksController],
  providers: [InMemoryBooksRepository, BooksService],
})
export class BooksModule {}
