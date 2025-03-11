import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { ProductGateway } from "../../gateways/product.gateway";
import { FindAllProductsOutputDTO } from "./find-all-products.dto";

export class FindAllProductsUseCase
	implements UseCaseInterface<void, FindAllProductsOutputDTO>
{
	constructor(private productRepository: ProductGateway) {}

	async execute(): Promise<FindAllProductsOutputDTO> {
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
