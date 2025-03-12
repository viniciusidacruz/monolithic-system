import { Address, Id } from "../../../../@shared/domain/value-objects";
import { InvoiceItem } from "../invoice-item/invoice-item.entity";

export interface InvoiceProps {
	id?: Id;
	name: string;
	document: string;
	address: Address;
	items: InvoiceItem[];
	createdAt?: Date;
	updatedAt?: Date;
}
