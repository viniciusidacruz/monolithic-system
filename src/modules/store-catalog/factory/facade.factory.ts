import { StoreCatalogFacade } from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import { FindAllProductsUseCase } from "../usecases/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../usecases/find-product/find-product.usecase";

export class StoreCatalogFacadeFactory {
	static create() {
		const productRepository = new ProductRepository();
		const findAllProductsUseCase = new FindAllProductsUseCase(
			productRepository
		);
		const findProductUseCase = new FindProductUseCase(productRepository);

		return new StoreCatalogFacade(findAllProductsUseCase, findProductUseCase);
	}
}
