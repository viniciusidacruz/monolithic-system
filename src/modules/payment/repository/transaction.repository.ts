import { Transaction } from "../domain/entities/transaction/transaction.entity";
import { PaymentGateway } from "../gateways/payment.gateway";
import { TransactionModel } from "./transaction.model";

export class TransactionRepository implements PaymentGateway {
	async save(input: Transaction): Promise<Transaction> {
		await TransactionModel.create({
			id: input.id.id,
			amount: input.amount,
			orderId: input.orderId,
			status: input.status,
			createdAt: input.createdAt,
			updatedAt: input.updatedAt,
		});

		return new Transaction({
			id: input.id,
			amount: input.amount,
			orderId: input.orderId,
			status: input.status,
			createdAt: input.createdAt,
			updatedAt: input.updatedAt,
		});
	}
}
