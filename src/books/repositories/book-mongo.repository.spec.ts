import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConnection } from './../../database/database';
import { I_BOOK_REPOSITORY } from './i-book.repository';
import { BooksMongoRepository } from './books-mongo.repository';
import { Book, BookSchema } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';

const params: CreateBookDto = {
  authors: 'string',
  description: 'string',
  favorite: 'string',
  fileBook: 'string',
  fileCover: 'string',
  fileName: 'string',
  title: 'string',
};

class BookMockModel {
  static find = jest.fn().mockReturnThis();
  static select = jest.fn().mockReturnThis();
  static exec = jest.fn().mockResolvedValue([params]);
  static findById = jest.fn().mockResolvedValue(params);
  static findByIdAndUpdate = jest.fn().mockResolvedValue(params);
  static deleteOne = jest.fn().mockResolvedValue(true);
  save = jest.fn().mockResolvedValue(this.data);
  constructor(private data) {}
}

describe('BookMongo', () => {
  let repository: BooksMongoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        databaseConnection,
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
      ],
      providers: [
        {
          provide: I_BOOK_REPOSITORY,
          useClass: BooksMongoRepository,
        },
        {
          provide: getModelToken(Book.name),
          useValue: BookMockModel,
        },
      ],
    }).compile();

    repository = module.get<BooksMongoRepository>(I_BOOK_REPOSITORY);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('findAll', async () => {
    expect(await repository.findAll()).toEqual([params]);
  });

  it('findById', async () => {
    expect(await repository.findOne('test')).toEqual(params);
  });

  it('update', async () => {
    expect(await repository.update('test', params)).toEqual(params);
  });

  it('delete', async () => {
    expect(await repository.remove('test')).toEqual(true);
  });

  it('create', async () => {
    expect(await repository.create(params)).toEqual(params);
  });
});
