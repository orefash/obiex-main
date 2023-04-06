import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import registeredClients from 'src/crypto-api/data/clients.data';
import { CryptoApiResponse, Client, ClientCacheData, WalletTransaction } from './types';
import { UpdateTransactionDto } from '../transaction/dto/UpdateTransaction.dto';
import * as crypto from 'crypto';
import { Cache } from 'cache-manager';

@Injectable()
export class CryptoApiService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async fetchTransactions(updateTransactionDto: UpdateTransactionDto): Promise<CryptoApiResponse>{
        console.log('in fetch')

        //checks if client ID is in preset client list
        const client: Client = registeredClients.find((client) => client.clientId == updateTransactionDto.clientId);
    
        if(!client) return { status: 404, message: 'Invalid CLient ID'};
    
        //checks if wallet details of client are correct
        const hasWallet: boolean = client.wallets.some((wallet) => wallet.address == updateTransactionDto.walletAddress && wallet.currency == updateTransactionDto.currencyType);
    
        if(!hasWallet) return { status: 404, message: 'Invalid Wallet'};
    
        let transactions: WalletTransaction[] = [];
        let count = 3;
        let checkExists: boolean = false;

        //cachedData refers to a single previously generated transaction that is stored in local cache
        let cachedData: ClientCacheData = await this.cacheManager.get(client.clientId);
        
        //if cachedData exists the data is added to the transaction list as response to the UpdateTransaction call
        //this data represents a duplicate transaction to be handled by the transaction Microservice
        if(cachedData){
            checkExists = true;
            count = 2;
            transactions.push(cachedData.transaction);
            await this.cacheManager.del(client.clientId);
            console.log('Cache reset and duplicate sent');
        }
    
        //generates 3 wallet transactions if no cached data is included, else only 2 transactions are generated
        for(let i=0; i<count; i++){
            
            let transaction: WalletTransaction = {
                txnId: crypto.randomBytes(10).toString('hex'),
                type: i%2? 'DEPOSIT' : 'WITHDRAW',
                currencyType: updateTransactionDto.currencyType,
                amount: i%2? 0.01 : 0.03,
                clientId: updateTransactionDto.clientId,
                walletAddress: updateTransactionDto.walletAddress,
                transactionAddress: crypto.randomBytes(10).toString('hex'),
                timestamp: new Date()
            };

            //if cache data doesnt exist a transaction is cached for later retrieval
            if(!checkExists && i==0){
                let data: ClientCacheData = {
                    transaction: transaction
                }
                await this.cacheManager.set(client.clientId, data);

                console.log('Cache set');
            }
            transactions.push(transaction);
        }
    
        return {
            status: 200,
            transactions
        }
    }
}
