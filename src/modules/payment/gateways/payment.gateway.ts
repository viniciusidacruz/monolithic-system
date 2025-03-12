import { Transaction } from "../domain/entities/transaction/transaction.entity";

export interface PaymentGateway {
	save(input: Transaction): Promise<Transaction>;
}
