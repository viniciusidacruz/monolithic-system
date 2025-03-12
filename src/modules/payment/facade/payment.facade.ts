import { UseCaseInterface } from "../../@shared/usecases/use-case.interface";
import {
	ProcessPaymentUseCaseInputDTO,
	ProcessPaymentUseCaseOutputDTO,
} from "../usecases/process-payment/process-payment.usecase.dto";
import {
	PaymentFacadeInputDTO,
	PaymentFacadeInterface,
	PaymentFacadeOutputDTO,
} from "./payment.facade.interface";

export class PaymentFacade implements PaymentFacadeInterface {
	constructor(
		private readonly processPaymentUseCase: UseCaseInterface<
			ProcessPaymentUseCaseInputDTO,
			ProcessPaymentUseCaseOutputDTO
		>
	) {}

	async process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO> {
		return await this.processPaymentUseCase.execute(input);
	}
}
