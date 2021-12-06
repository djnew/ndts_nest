import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty()
  authors: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  favorite: string;

  @ApiProperty()
  fileBook: string;

  @ApiProperty()
  fileCover: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  title: string;
}
