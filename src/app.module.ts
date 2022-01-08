import { Module } from '@nestjs/common';
import { databaseConnection } from 'src/database/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { CommentsModule } from './comments/comments.module';

import { CommentsSocketModule } from './comments-socket/comments-socket.module';

@Module({
  imports: [
    BooksModule,
    databaseConnection,
    CommentsModule,
    CommentsSocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
