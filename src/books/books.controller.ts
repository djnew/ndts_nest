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
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Add book' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Get books' })
  findAll() {
    return this.booksService.findAll();
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Find one book' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found book' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const book = this.booksService.findOne(id);
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
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const book = this.booksService.update(id, updateBookDto);
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
  remove(@Param('id') id: string) {
    const result = this.booksService.remove(id);
    if (!result) {
      return new NotFoundException({
        message: 'book not found',
      });
    }
    return 'ok';
  }
}
