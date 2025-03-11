import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { ProductGateway } from "../../gateways/product.gateway";
import { FindAllProductsUseCaseOutputDTO } from "./find-all-products.dto";

export class FindAllProductsUseCase
	implements UseCaseInterface<void, FindAllProductsUseCaseOutputDTO>
{
	constructor(private readonly productRepository: ProductGateway) {}

	async execute(): Promise<FindAllProductsUseCaseOutputDTO> {
		const products = await this.productRepository.findAll();

		return {
			products: products.map((product) => ({
				id: product.id.id,
				name: product.name,
				description: product.description,
				salesPrice: product.salesPrice,
			})),
		};
	}
}
