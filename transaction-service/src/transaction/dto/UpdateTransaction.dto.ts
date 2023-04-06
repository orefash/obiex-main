import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTransactionDto {

    @IsString()
    @IsNotEmpty()
    clientId: string;

    @IsString()
    @IsNotEmpty()
    walletAddress: string;

    @IsString()
    @IsNotEmpty()
    currencyType: string;
}