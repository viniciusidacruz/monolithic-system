import { ProductAdmFacade } from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import { AddProductUseCase } from "../usecases/add-product/add-product.usecase";
import { CheckStockUseCase } from "../usecases/check-stock/check-stock.usecase";

export class ProductADMFacadeFactory {
	static create() {
		const productRepository = new ProductRepository();
		const addProductUseCase = new AddProductUseCase(productRepository);
		const checkStockUseCase = new CheckStockUseCase(productRepository);

		return new ProductAdmFacade(addProductUseCase, checkStockUseCase);
	}
}
