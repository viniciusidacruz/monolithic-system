import { Product } from "../domain/entities/product/product.entity";

export interface ProductGateway {
	add(product: Product): Promise<void>;
	find(id: string): Promise<Product>;
}
