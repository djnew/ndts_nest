import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentsSocketDto } from './create-comments-socket.dto';

export class UpdateCommentsSocketDto extends PartialType(CreateCommentsSocketDto) {
  id: number;
}
