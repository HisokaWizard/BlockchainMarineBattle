import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('/user')
export class UserController {
  @Get()
  get() {}

  @Post()
  create() {}

  @Patch()
  update() {}
}
