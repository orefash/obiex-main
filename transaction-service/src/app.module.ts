import {  Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './transaction/transaction.module';
import { CryptoApiModule } from './crypto-api/crypto-api.module';
import entities from './typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TransactionModule,
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: entities,
        synchronize: configService.get<boolean>('POSTGRES_SYNC'),
      }),
      inject: [ConfigService],
    }),
    CryptoApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
