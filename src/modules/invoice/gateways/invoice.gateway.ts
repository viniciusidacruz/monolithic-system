import { Invoice } from "../domain/entities/invoice/invoice.entity";

export interface InvoiceGateway {
	find(id: string): Promise<Invoice>;
	generate(input: Invoice): Promise<void>;
}
