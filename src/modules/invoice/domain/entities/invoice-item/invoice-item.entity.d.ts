import { Id } from "../../../../@shared/domain/value-objects";

export interface InvoiceItemProps {
	id?: Id;
	name: string;
	price: number;
}
