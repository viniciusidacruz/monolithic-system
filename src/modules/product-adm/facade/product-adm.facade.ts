import { UseCaseInterface } from "../../@shared/usecases/use-case.interface";
import {
	AddProductUseCaseInputDTO,
	AddProductUseCaseOutputDTO,
} from "../usecases/add-product/add-product.dto";
import {
	CheckStockUseCaseInputDTO,
	CheckStockUseCaseOutputDTO,
} from "../usecases/check-stock/check-stock.dto";
import {
	AddProductFacadeInputDTO,
	CheckStockFacadeInputDTO,
	CheckStockFacadeOutputDTO,
	ProductAdmFacadeInterface,
} from "./product-adm.facade.interface";

export class ProductAdmFacade implements ProductAdmFacadeInterface {
	constructor(
		private addUseCase: UseCaseInterface<
			AddProductUseCaseInputDTO,
			AddProductUseCaseOutputDTO
		>,
		private checkStockUseCase: UseCaseInterface<
			CheckStockUseCaseInputDTO,
			CheckStockUseCaseOutputDTO
		>
	) {}
	async addProduct(input: AddProductFacadeInputDTO): Promise<void> {
		await this.addUseCase.execute(input);
	}

	async checkStock(
		input: CheckStockFacadeInputDTO
	): Promise<CheckStockFacadeOutputDTO> {
		return this.checkStockUseCase.execute(input);
	}
}
