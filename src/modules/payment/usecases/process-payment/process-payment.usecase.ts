import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { Transaction } from "../../domain/entities/transaction/transaction.entity";
import { PaymentGateway } from "../../gateways/payment.gateway";
import {
	ProcessPaymentUseCaseInputDTO,
	ProcessPaymentUseCaseOutputDTO,
} from "./process-payment.usecase.dto";

export class ProcessPaymentUseCase
	implements
		UseCaseInterface<
			ProcessPaymentUseCaseInputDTO,
			ProcessPaymentUseCaseOutputDTO
		>
{
	constructor(private readonly transactionRepository: PaymentGateway) {}
	async execute(
		input: ProcessPaymentUseCaseInputDTO
	): Promise<ProcessPaymentUseCaseOutputDTO> {
		const transaction = new Transaction({
			amount: input.amount,
			orderId: input.orderId,
		});

		transaction.process();

		const persistTransaction = await this.transactionRepository.save(
			transaction
		);

		return {
			transactionId: persistTransaction.id.id,
			status: transaction.status,
			amount: persistTransaction.amount,
			orderId: persistTransaction.orderId,
			createdAt: persistTransaction.createdAt,
			updatedAt: persistTransaction.updatedAt,
		};
	}
}
