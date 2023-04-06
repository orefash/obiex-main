import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['txnId'])
export class Transaction {

    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        nullable: false,
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
        name: 'amount',
        type: 'decimal', 
        precision: 10, 
        scale: 2
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