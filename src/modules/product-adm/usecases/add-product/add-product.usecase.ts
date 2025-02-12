import { Id } from "../../../@shared/domain/value-objects";
import { Product } from "../../domain/entities/product/product.entity";
import { ProductGateway } from "../../gateways/product.gateway";
import { AddProductInputDTO, AddProductOutputDTO } from "./add-product.dto";

export class AddProductUseCase {
	constructor(private productRepository: ProductGateway) {}

	async execute(input: AddProductInputDTO): Promise<AddProductOutputDTO> {
		const props = {
			id: new Id(input.id),
			name: input.name,
			description: input.description,
			purchasePrice: input.purchasePrice,
			stock: input.stock,
		};

		const product = new Product(props);

		await this.productRepository.add(product);

		return {
			id: product.id.id,
			name: product.name,
			description: product.description,
			purchasePrice: product.purchasePrice,
			stock: product.stock,
		};
	}
}
