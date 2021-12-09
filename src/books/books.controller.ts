import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpStatus,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  I_BOOK_SERVICE,
  IBooksService,
} from 'src/books/services/i-book.service';
import { BookModel } from 'src/books/entities/book.entity.js';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    @Inject(I_BOOK_SERVICE) private readonly booksService: IBooksService,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Add book' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Book not save' })
  async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookModel | BadRequestException> {
    const book = await this.booksService.create(createBookDto);
    if (book) {
      return book;
    } else {
      return new BadRequestException({
        message: 'Book not save',
      });
    }
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Get books' })
  async findAll(): Promise<BookModel[]> {
    return await this.booksService.findAll();
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Find one book' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found book' })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<BookModel | NotFoundException> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      return new NotFoundException({
        message: 'book not found',
      });
    }

    return book;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update book',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found book' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookModel | NotFoundException> {
    const book = await this.booksService.update(id, updateBookDto);
    if (!book) {
      return new NotFoundException({
        message: 'book not found',
      });
    }
    return book;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete book',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found book' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string | NotFoundException> {
    const result = await this.booksService.remove(id);
    if (!result) {
      return new NotFoundException({
        message: 'book not found',
      });
    }
    return 'ok';
  }
}
