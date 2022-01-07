import { Module } from '@nestjs/common';
import { databaseConnection } from 'src/database/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule, databaseConnection],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
