import { Address, Id } from "../../@shared/domain/value-objects";
import { InvoiceItem } from "../domain/entities/invoice-item/invoice-item.entity";
import { Invoice } from "../domain/entities/invoice/invoice.entity";
import { InvoiceGateway } from "../gateways/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

export class InvoiceRepository implements InvoiceGateway {
	async find(id: string): Promise<Invoice> {
		const invoiceDb = await InvoiceModel.findOne({
			where: { id },
			include: [{ model: InvoiceItemModel }],
		});

		if (!invoiceDb) {
			throw new Error(`Product with id ${id} not found`);
		}

		return new Invoice({
			id: new Id(invoiceDb.id),
			name: invoiceDb.name,
			document: invoiceDb.document,
			address: new Address(
				invoiceDb.street,
				invoiceDb.number,
				invoiceDb.complement,
				invoiceDb.city,
				invoiceDb.state,
				invoiceDb.zipCode
			),
			items: invoiceDb.items.map(
				(item) =>
					new InvoiceItem({
						id: new Id(item.id),
						name: item.name,
						price: item.price,
					})
			),
		});
	}

	async generate(input: Invoice): Promise<void> {
		const invoice = await InvoiceModel.create({
			id: input.id.id,
			name: input.name,
			document: input.document,
			street: input.address.street,
			number: input.address.number,
			complement: input.address.complement,
			city: input.address.city,
			state: input.address.state,
			zipCode: input.address.zipCode,
		});

		await Promise.all(
			input.items.map((item) =>
				InvoiceItemModel.create({
					id: item.id.id,
					invoiceId: invoice.id,
					name: item.name,
					price: item.price,
				})
			)
		);
	}
}
