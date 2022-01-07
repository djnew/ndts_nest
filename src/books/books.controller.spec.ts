import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookModel } from './entities/book.entity';
import { BooksController } from './books.controller';
import { I_BOOK_SERVICE, IBooksService } from './services/i-book.service';
import { I_BOOK_REPOSITORY } from './repositories/i-book.repository';
import { BooksInMemoryRepository } from './repositories/books-in-memory.repository';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import * as request from 'supertest';

const params: CreateBookDto = {
  authors: 'string',
  description: 'string',
  favorite: 'string',
  fileBook: 'string',
  fileCover: 'string',
  fileName: 'string',
  title: 'string',
};

class MockService implements IBooksService {
  async create(createBookDto: CreateBookDto): Promise<BookModel> {
    return params;
  }

  async findAll(): Promise<BookModel[]> {
    return [params as BookModel];
  }

  async findOne(id: string): Promise<BookModel | false | null> {
    return params;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BookModel | false | null> {
    return params;
  }
}

describe('BooksController', () => {
  let controller: BooksController;
  let service: IBooksService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: I_BOOK_SERVICE,
          useClass: MockService,
        },
        {
          provide: I_BOOK_REPOSITORY,
          useClass: BooksInMemoryRepository,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', () => {
    return request(app.getHttpServer())
      .post('/books')
      .expect(HttpStatus.CREATED)
      .expect(params);
  });

  it('list', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(HttpStatus.OK)
      .expect([params]);
  });

  it('one', () => {
    return request(app.getHttpServer())
      .get('/books/test')
      .expect(HttpStatus.OK)
      .expect(params);
  });

  it('update', () => {
    return request(app.getHttpServer())
      .patch('/books/test')
      .expect(HttpStatus.OK)
      .expect(params);
  });

  it('delete', () => {
    return request(app.getHttpServer())
      .delete('/books/test')
      .expect(HttpStatus.OK)
      .expect('ok');
  });

  afterAll(async () => {
    await app.close();
  });
});
