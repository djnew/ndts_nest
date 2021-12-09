import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface BookModel {
  id?: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
}
export type BookDocument = Book & Document;

@Schema()
export class Book implements BookModel {
  @Prop()
  id: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  authors: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  favorite: string;
  @Prop()
  fileCover: string;
  @Prop()
  fileName: string;
  @Prop()
  fileBook: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
