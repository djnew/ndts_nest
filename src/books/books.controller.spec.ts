import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './services/books.service';
import { I_BOOK_SERVICE } from './services/i-book.service';
import { I_BOOK_REPOSITORY } from './repositories/i-book.repository';
import { BooksInMemoryRepository } from './repositories/books-in-memory.repository';
import { BadRequestException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BookModel } from './entities/book.entity';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;
  let params: CreateBookDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: I_BOOK_SERVICE,
          useClass: BooksService,
        },
        {
          provide: I_BOOK_REPOSITORY,
          useClass: BooksInMemoryRepository,
        },
      ],
    }).compile();
    service = module.get<BooksService>(I_BOOK_SERVICE);
    controller = module.get<BooksController>(BooksController);
    params = {
      authors: 'string',
      description: 'string',
      favorite: 'string',
      fileBook: 'string',
      fileCover: 'string',
      fileName: 'string',
      title: 'string',
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('test methods', async () => {
    const testService = Promise.resolve(null);
    jest.spyOn(service, 'create').mockImplementation(() => testService);

    expect(await controller.create(params)).toEqual(
      new BadRequestException({
        message: 'Book not save',
      }),
    );
  });

  it('create success', async () => {
    const testService = Promise.resolve(params as BookModel);
    jest.spyOn(service, 'create').mockImplementation(() => testService);

    expect(await controller.create(params)).toEqual(params);
  });
});
