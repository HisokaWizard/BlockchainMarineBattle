import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import 'dotenv/config';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(`mongodb://localhost/BlockChainPlatform`),
  ],
})
export class AppModule {}
