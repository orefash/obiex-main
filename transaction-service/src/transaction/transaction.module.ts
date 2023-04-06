import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction/transaction.service';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/typeorm';
import { CryptoApiModule } from 'src/crypto-api/crypto-api.module';

@Module({
  imports: [
    CryptoApiModule,
    TypeOrmModule.forFeature([Transaction])
  ],
  providers: [
    {
      provide: 'TRANSACTION_SERVICE',
      useClass: TransactionService,
    }
  ],
  controllers: [TransactionController]
})
export class TransactionModule {


}
