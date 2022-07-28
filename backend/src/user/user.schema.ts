import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Grade } from './user.dto';

@Schema()
export class User {
  @Prop()
  address: string;

  @Prop()
  amount: number;

  @Prop()
  blockchainAmount: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }] })
  gradeCollection: Grade[];
}

export type UserDocument = User & mongoose.Document;

export const UserSchema = SchemaFactory.createForClass(User);
