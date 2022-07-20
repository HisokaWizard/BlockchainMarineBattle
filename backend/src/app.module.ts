import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import 'dotenv/config';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://hisoka-wizard:${process.env.DATABASE_PASSWORD}>@cluster0.y33gf.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
})
export class AppModule {}
