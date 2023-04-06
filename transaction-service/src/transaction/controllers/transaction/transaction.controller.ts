import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdateTransactionDto } from '../../dto/UpdateTransaction.dto';
import { TransactionService } from '../../services/transaction/transaction.service';
import { UpdateTransactionResponse } from '../../types';
import { Transaction } from 'src/typeorm';

@Controller('transactions')
export class TransactionController {
    constructor(
        @Inject('TRANSACTION_SERVICE')
        private readonly transactionService: TransactionService
    ){}

    //get all transactions in the db
    @Get('')
    getTransactions(): Promise<Transaction[]>{
        return this.transactionService.getAllTransactions();
    }

    //get all saved transactions for a particular client's currency wallet from the database
    @Get('client/:clientId/currency/:currencyType')
    getClientTransactions(@Param('clientId') clientId: string, @Param('currencyType') currencyType: string): Promise<Transaction[]>{
        return this.transactionService.getClientTransactions({ clientId, currencyType });
    }

    //this endpoint triggers the UpdateTransactions command via API
    @Post('update')
    @UsePipes(ValidationPipe)
    async updateTransactions(@Body() updateTransactionDto: UpdateTransactionDto) {
            const updateTransactionResponse: UpdateTransactionResponse = await this.transactionService.updateTransactions(updateTransactionDto); 
            if(updateTransactionResponse.success)
                return updateTransactionResponse;
       
            throw new HttpException(updateTransactionResponse.message, HttpStatus.BAD_REQUEST);
    }


}
