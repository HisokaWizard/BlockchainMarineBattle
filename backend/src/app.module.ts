import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

//mongodb+srv://hisoka-wizard:<password>@cluster0.y33gf.mongodb.net/?retryWrites=true&w=majority
@Module({
  imports: [UserModule],
})
export class AppModule {}
