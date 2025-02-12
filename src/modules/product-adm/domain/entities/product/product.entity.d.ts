import { Id } from "../../../../@shared/domain/value-objects";

export interface ProductProps {
	id?: Id;
	name: string;
	description: string;
	purchasePrice: number;
	stock: number;
}
