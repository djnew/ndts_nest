import { Logger } from '@nestjs/common';
import { IBookRepository } from './i-book.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument, BookModel } from '../entities/book.entity';
import { Model } from 'mongoose';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

export class BooksMongoRepository implements IBookRepository {
  private logger: Logger = new Logger('BooksMongoRepository');

  constructor(
    @InjectModel(Book.name)
    private readonly booksRepository: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookModel | false> {
    const newBook = new this.booksRepository(createBookDto);
    try {
      return await newBook.save();
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async findAll(): Promise<BookModel[]> {
    const books = await this.booksRepository.find().select('-__v').exec();
    this.logger.debug(books.length);
    return books;
  }

  async findOne(id: string): Promise<BookModel | false> {
    try {
      const book = await this.booksRepository.findById(id);
      this.logger.log(book, id);
      return book ?? false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.booksRepository.deleteOne({ _id: id });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BookModel | false> {
    try {
      const book = this.booksRepository.findByIdAndUpdate(id, updateBookDto);
      return book ?? false;
    } catch (e) {
      return false;
    }
  }
}
