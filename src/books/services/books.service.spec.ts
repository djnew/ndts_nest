import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { I_BOOK_REPOSITORY } from '../repositories/i-book.repository';
import { BooksInMemoryRepository } from '../repositories/books-in-memory.repository';
import { BookModel } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { BadRequestException } from '@nestjs/common';

describe('BooksService', () => {
  let service: BooksService;
  let repository: BooksInMemoryRepository;
  let params: CreateBookDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: I_BOOK_REPOSITORY,
          useClass: BooksInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<BooksInMemoryRepository>(I_BOOK_REPOSITORY);

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
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('create', async () => {
    const testService = Promise.resolve(params as BookModel);
    jest.spyOn(repository, 'create').mockImplementation(() => testService);

    expect(await service.create(params)).toEqual(params);
  });
});
