import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { ProductGateway } from "../../gateways/product.gateway";

import {
	FindProductUseCaseInputDTO,
	FindProductUseCaseOutputDTO,
} from "./find-product.dto";

export class FindProductUseCase
	implements
		UseCaseInterface<FindProductUseCaseInputDTO, FindProductUseCaseOutputDTO>
{
	constructor(private readonly productRepository: ProductGateway) {}

	async execute(
		input: FindProductUseCaseInputDTO
	): Promise<FindProductUseCaseOutputDTO> {
		const product = await this.productRepository.find(input.productId);

		if (!product) {
			throw new Error(`Product with id ${input.productId} not found.`);
		}

		return {
			id: product.id.id,
			name: product.name,
			description: product.description,
			salesPrice: product.salesPrice,
		};
	}
}
