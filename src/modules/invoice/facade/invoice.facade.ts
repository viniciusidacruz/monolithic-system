import { UseCaseInterface } from "../../@shared/usecases/use-case.interface";
import {
	FindInvoiceUseCaseInputDTO,
	FindInvoiceUseCaseOutputDTO,
} from "../usecases/find-invoice/find-invoice.usecase.dto";
import {
	GenerateInvoiceUseCaseInputDto,
	GenerateInvoiceUseCaseOutputDto,
} from "../usecases/generate-invoice/generate-invoice.usecase.dto";
import {
	FindInvoiceFacadeInputDTO,
	FindInvoiceFacadeOutputDTO,
	GenerateInvoiceFacadeInputDTO,
	GenerateInvoiceFacadeOutputDTO,
	InvoiceFacadeInterface,
} from "./invoice.facade.interface";

export class InvoiceFacade implements InvoiceFacadeInterface {
	constructor(
		private generateInvoiceUseCase: UseCaseInterface<
			GenerateInvoiceUseCaseInputDto,
			GenerateInvoiceUseCaseOutputDto
		>,
		private findInvoiceUseCase: UseCaseInterface<
			FindInvoiceUseCaseInputDTO,
			FindInvoiceUseCaseOutputDTO
		>
	) {}
	async generateInvoice(
		input: GenerateInvoiceFacadeInputDTO
	): Promise<GenerateInvoiceFacadeOutputDTO> {
		return await this.generateInvoiceUseCase.execute(input);
	}

	async findInvoice(
		input: FindInvoiceFacadeInputDTO
	): Promise<FindInvoiceFacadeOutputDTO> {
		return this.findInvoiceUseCase.execute(input);
	}
}
