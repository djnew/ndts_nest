import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface CommentModel {
  id?: string;
  bookId: string;
  comment: string;
}

export type CommentDocument = Comment & Document;

@Schema()
export class Comment implements CommentModel {
  @Prop({ required: true })
  bookId: string;
  @Prop({ required: true })
  comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
