import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  get(@Param('id') id: ObjectId) {
    return this.userService.get(id);
  }

  @Post()
  create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() dto: UserDto) {
    console.log(id, dto);
    return this.userService.update(id, dto);
  }
}
