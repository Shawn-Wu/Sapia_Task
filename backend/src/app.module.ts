import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
let envFilePath = ['.env'];
export const IS_DEV = process.env.RUNNING_ENV !== 'prod';

if (IS_DEV) {
  envFilePath = ['.env'];
} else {
  envFilePath = ['.env.prod']
}



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
    }),
    MongooseModule.forRoot('mongodb://' + process.env.Mongo_Host + ':' + process.env.Mongo_Port + '/user'),
    UsersModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

