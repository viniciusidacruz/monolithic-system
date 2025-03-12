import { InvoiceGateway } from "../../gateways/invoice.gateway";
import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import {
	GenerateInvoiceUseCaseInputDto,
	GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.usecase.dto";
import { Invoice } from "../../domain/entities/invoice/invoice.entity";
import { InvoiceItem } from "../../domain/entities/invoice-item/invoice-item.entity";
import { Address } from "../../../@shared/domain/value-objects";

export class GenerateInvoiceUseCase
	implements
		UseCaseInterface<
			GenerateInvoiceUseCaseInputDto,
			GenerateInvoiceUseCaseOutputDto
		>
{
	constructor(private readonly invoiceRepository: InvoiceGateway) {}

	async execute(
		input: GenerateInvoiceUseCaseInputDto
	): Promise<GenerateInvoiceUseCaseOutputDto> {
		const props = {
			name: input.name,
			document: input.document,
			address: new Address(
				input.street,
				input.city,
				input.state,
				input.zipCode,
				input.number,
				input.complement
			),
			items: input.items.map(
				(i) =>
					new InvoiceItem({
						name: i.name,
						price: i.price,
					})
			),
		};

		const invoice = new Invoice(props);

		await this.invoiceRepository.generate(invoice);

		return {
			id: invoice.id.id,
			name: invoice.name,
			document: invoice.document,
			street: invoice.address.street,
			number: invoice.address.number,
			complement: invoice.address.complement,
			city: invoice.address.city,
			state: invoice.address.state,
			zipCode: invoice.address.zipCode,
			items: invoice.items.map((item) => ({
				id: item.id.id,
				name: item.name,
				price: item.price,
			})),
			total: invoice.items.reduce((total, item) => total + item.price, 0),
		};
	}
}
