import { IBookRepository } from './i-book.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument, BookModel } from '../entities/book.entity';
import { Model } from 'mongoose';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

export class BooksMongoRepository implements IBookRepository {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<BookModel | false> {
    const newBook = new this.bookModel(createBookDto);
    try {
      return await newBook.save();
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async findAll(): Promise<BookModel[]> {
    return await this.bookModel.find().select('-__v').exec();
  }

  async findOne(id: string): Promise<BookModel | false> {
    try {
      const book = this.bookModel.findById(id);
      return book ?? false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.bookModel.deleteOne({ _id: id });
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
      const book = this.bookModel.findByIdAndUpdate(id, updateBookDto);
      return book ?? false;
    } catch (e) {
      return false;
    }
  }
}
