import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
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
