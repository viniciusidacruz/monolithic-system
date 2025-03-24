import { Id } from "../../@shared/domain/value-objects";
import { Product } from "../domain/entities/product/product.entity";
import { ProductGateway } from "../gateways/product.gateway";
import { ProductRegistrationModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
	async add(product: Product): Promise<void> {
		await ProductRegistrationModel.create({
			id: product.id.id,
			name: product.name,
			description: product.description,
			purchasePrice: product.purchasePrice,
			stock: product.stock,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	async find(id: string): Promise<Product> {
		const productDb = await ProductRegistrationModel.findOne({ where: { id } });

		if (!productDb) {
			throw new Error(`Product with id ${id} not found`);
		}

		return new Product({
			id: new Id(productDb.id),
			name: productDb.name,
			description: productDb.description,
			purchasePrice: productDb.purchasePrice,
			stock: productDb.stock,
		});
	}
}
