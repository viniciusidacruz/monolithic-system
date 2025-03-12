import { UseCaseInterface } from "../../@shared/usecases/use-case.interface";
import { FindAllProductsUseCaseOutputDTO } from "../usecases/find-all-products/find-all-products.dto";
import {
	FindProductUseCaseInputDTO,
	FindProductUseCaseOutputDTO,
} from "../usecases/find-product/find-product.usecase.dto";
import {
	FindAllProductsOutputDTO,
	FindProductByIdInput,
	FindProductByIdOutput,
	StoreCatalogFacadeInterface,
} from "./stora-catalog.facade.interface";

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
	constructor(
		private findAllProductsUseCase: UseCaseInterface<
			void,
			FindAllProductsUseCaseOutputDTO
		>,
		private findProductUseCase: UseCaseInterface<
			FindProductUseCaseInputDTO,
			FindProductUseCaseOutputDTO
		>
	) {}

	async findProductById(
		input: FindProductByIdInput
	): Promise<FindProductByIdOutput> {
		const product = await this.findProductUseCase.execute({
			productId: input.id,
		});

		return {
			id: product.id,
			name: product.name,
			description: product.description,
			salesPrice: product.salesPrice,
		};
	}

	async findAllProducts(): Promise<FindAllProductsOutputDTO> {
		const products = await this.findAllProductsUseCase.execute();

		return {
			products: products.products.map((product) => ({
				id: product.id,
				name: product.name,
				description: product.description,
				salesPrice: product.salesPrice,
			})),
		};
	}
}
