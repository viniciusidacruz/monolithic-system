import { PaymentFacade } from "../facade/payment.facade";
import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUseCase } from "../usecases/process-payment/process-payment.usecase";

export class PaymentFacadeFactory {
	static create() {
		const transactionRepository = new TransactionRepository();
		const processPaymentUseCase = new ProcessPaymentUseCase(
			transactionRepository
		);

		return new PaymentFacade(processPaymentUseCase);
	}
}
