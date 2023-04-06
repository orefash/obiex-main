import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction as TransactionEntity } from 'src/typeorm';
import { UpdateTransactionDto } from '../../dto/UpdateTransaction.dto';
import { CryptoApiResponse } from '../../../crypto-api/types';
import { CryptoApiService } from '../../../crypto-api/crypto-api.service';
import { UpdateTransactionResponse } from '../../types';

@Injectable()
export class TransactionService {

    constructor
    (
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
        @Inject(CryptoApiService)
        private readonly cryptoApi: CryptoApiService
    ){}

    //fetches all saved transactions from the database
    async getAllTransactions(): Promise<TransactionEntity[]>{
        return this.transactionRepository.find();
    }

    //fetches all saved transactions for a particular client's currency wallet from the database
    async getClientTransactions({ clientId, currencyType }): Promise<TransactionEntity[]>{
        return this.transactionRepository.find({
            where: {
                clientId, currencyType
            }
        });
    }

    //calls to fetch UpdateTransactions based on - clientID, currencyType, walletAddress
    async updateTransactions(updateTransactionDto: UpdateTransactionDto): Promise<UpdateTransactionResponse> {

        let fetchTransactionApiData: CryptoApiResponse = await this.cryptoApi.fetchTransactions(updateTransactionDto);

        if(fetchTransactionApiData.status == 404) return { success: false, message: fetchTransactionApiData.message };

        //query inserts a list of transactions fetched from the API stub and skips duplicate transactions
        await this.transactionRepository
            .createQueryBuilder()
            .insert()
            .into(TransactionEntity)
            .values(fetchTransactionApiData.transactions)
            .orIgnore()
            .execute();

        return {
            success: true,
            message: "Transactions Updated"
        };

    }

}
