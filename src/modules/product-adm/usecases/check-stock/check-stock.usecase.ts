import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { ProductGateway } from "../../gateways/product.gateway";
import {
	CheckStockUseCaseInputDTO,
	CheckStockUseCaseOutputDTO,
} from "./check-stock.dto";

export class CheckStockUseCase
	implements
		UseCaseInterface<CheckStockUseCaseInputDTO, CheckStockUseCaseOutputDTO>
{
	constructor(private readonly productRepository: ProductGateway) {}

	async execute(
		input: CheckStockUseCaseInputDTO
	): Promise<CheckStockUseCaseOutputDTO> {
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
