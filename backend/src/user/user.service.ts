import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: UserDto): Promise<void> {
    this.userModel.create(dto);
  }

  async update(id: ObjectId, dto: UserDto): Promise<void> {
    this.userModel.findByIdAndUpdate(id, { $set: dto }, {}, (err, doc) => {
      console.log('ERR:', err, 'DOC:', doc);
    });
  }

  async get(id: ObjectId): Promise<UserDto> {
    return this.userModel.findById(id);
  }
}
