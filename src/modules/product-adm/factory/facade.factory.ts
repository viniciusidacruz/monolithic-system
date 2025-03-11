import { ProductAdmFacade } from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import { AddProductUseCase } from "../usecases/add-product/add-product.usecase";

export class ProductADMFacadeFactory {
	static create() {
		const productRepository = new ProductRepository();
		const addProductUseCase = new AddProductUseCase(productRepository);

		return new ProductAdmFacade(addProductUseCase, addProductUseCase);
	}
}
