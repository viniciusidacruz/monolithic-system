import { Product } from "../domain/entities/product/product.entity";

export interface ProductGateway {
	findAll(): Promise<Product[]>;
	find(id: string): Promise<Product>;
}
