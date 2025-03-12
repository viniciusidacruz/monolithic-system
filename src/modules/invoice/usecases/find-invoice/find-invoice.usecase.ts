import { Address } from "../../../@shared/domain/value-objects";
import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { Invoice } from "../../domain/entities/invoice/invoice.entity";
import { InvoiceGateway } from "../../gateways/invoice.gateway";
import {
	FindInvoiceUseCaseInputDTO,
	FindInvoiceUseCaseOutputDTO,
} from "./find-invoice.usecase.dto";

export class FindInvoiceUseCase
	implements
		UseCaseInterface<FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO>
{
	constructor(private readonly invoiceRepository: InvoiceGateway) {}

	async execute(
		input: FindInvoiceUseCaseInputDTO
	): Promise<FindInvoiceUseCaseOutputDTO> {
		const invoice = await this.invoiceRepository.find(input.id);

		if (!invoice) {
			throw new Error(`invoice with id ${input.id} not found.`);
		}

		return {
			id: invoice.id.id,
			name: invoice.name,
			address: {
				street: invoice.address.street,
				city: invoice.address.city,
				state: invoice.address.state,
				zipCode: invoice.address.zipCode,
				number: invoice.address.number,
				complement: invoice.address.complement,
			},
			createdAt: invoice.createdAt,
			document: invoice.document,
			items: invoice.items.map((item) => ({
				id: item.id.id,
				name: item.name,
				price: item.price,
			})),
			total: invoice.items.reduce((total, item) => total + item.price, 0),
		};
	}
}
