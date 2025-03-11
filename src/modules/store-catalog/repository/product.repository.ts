import { Id } from "../../@shared/domain/value-objects";
import { Product } from "../domain/entities/product/product.entity";
import { ProductGateway } from "../gateways/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
	async findAll(): Promise<Product[]> {
		const products = await ProductModel.findAll();

		return products.map((product) => {
			return new Product({
				id: new Id(product.id),
				name: product.name,
				description: product.description,
				salesPrice: product.salesPrice,
			});
		});
	}

	async find(id: string): Promise<Product> {
		const productDb = await ProductModel.findOne({ where: { id } });

		if (!productDb) {
			throw new Error(`Product with id ${id} not found`);
		}

		return new Product({
			id: new Id(productDb.id),
			name: productDb.name,
			description: productDb.description,
			salesPrice: productDb.salesPrice,
		});
	}
}
