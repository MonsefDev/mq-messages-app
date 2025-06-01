import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/messages.module';
import { PartnersModule } from './partners/partners.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/mq-messages'
    ),
    MessagesModule,
    PartnersModule,
  ],
})
export class AppModule {}