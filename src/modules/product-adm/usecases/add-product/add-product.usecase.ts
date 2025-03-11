import { Id } from "../../../@shared/domain/value-objects";
import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { Product } from "../../domain/entities/product/product.entity";
import { ProductGateway } from "../../gateways/product.gateway";
import {
	AddProductUseCaseInputDTO,
	AddProductUseCaseOutputDTO,
} from "./add-product.dto";

export class AddProductUseCase
	implements
		UseCaseInterface<AddProductUseCaseInputDTO, AddProductUseCaseOutputDTO>
{
	constructor(private readonly productRepository: ProductGateway) {}

	async execute(
		input: AddProductUseCaseInputDTO
	): Promise<AddProductUseCaseOutputDTO> {
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
