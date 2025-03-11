import { ProductGateway } from "../../gateways/product.gateway";
import { CheckStockInputDTO, CheckStockOutputDTO } from "./check-stock.dto";

export class CheckStockUseCase {
	constructor(private productRepository: ProductGateway) {}

	async execute(input: CheckStockInputDTO): Promise<CheckStockOutputDTO> {
		const product = await this.productRepository.find(input.productId);

		if (!product) {
			throw new Error(`Product with id ${input.productId} not found.`);
		}

		return {
			productId: product.id.id,
			stock: product.stock,
		};
	}
}
