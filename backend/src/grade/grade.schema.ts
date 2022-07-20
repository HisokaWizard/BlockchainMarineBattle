import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type GradeType = 'base' | 'medium' | 'high';

@Schema()
export class Grade {
  @Prop()
  price: number;
  @Prop()
  type: GradeType;
  @Prop()
  name: string;
  @Prop()
  score: number;
  @Prop()
  image: string;
}

export type GradeDocument = Grade & mongoose.Document;

export const GradeSchema = SchemaFactory.createForClass(Grade);
