import { Id } from "../../../../@shared/domain/value-objects";

import { Client } from "../client/client.entity";
import { Product } from "../product/product.entity";

export interface OrderProps {
	id?: Id;
	client: Client;
	status?: string;
	products: Product[];
}
