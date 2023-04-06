
export interface WalletTransaction {
    
    txnId: string;
    type: string;
    currencyType: string;
    amount: number;
    clientId: string;
    walletAddress: string;
    transactionAddress: string;
    timestamp: Date;
    
}

export interface ClientCacheData {
    transaction: WalletTransaction;
}

interface Wallet {
    currency: string;
    address: string;
}

export interface Client {
    clientId: string;
    wallets: Wallet[];
}

export interface CryptoApiResponse {
    status: number;
    message?: string;
    transactions?: WalletTransaction[];
}