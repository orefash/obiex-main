import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        nullable: false,
        name: 'txn_id'
    })
    txnId: string;

    @Column({
        nullable: false,
    })
    type: string;

    @Column({
        nullable: false,
        name: 'currency_type'
    })
    currencyType: string;

    @Column({
        nullable: false,
        name: 'currency_type'
    })
    amount: number;

    @Column({
        nullable: false,
        name: 'client_id'
    })
    clientId: string;

    @Column({
        nullable: false,
        name: 'wallet_address'
    })
    walletAddress: string;

    @Column({
        nullable: false,
        name: 'transaction_address'
    })
    transactionAddress: string;


    @Column({ type: 'timestamp', nullable: false })
    timestamp: Date;

    @CreateDateColumn({
        nullable: false,
        name: 'fetch_date'
    })
    fetchDate: Date;


    
}