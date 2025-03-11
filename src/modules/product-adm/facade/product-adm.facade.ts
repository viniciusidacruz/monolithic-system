import { UseCaseInterface } from "../../@shared/usecases/use-case.interface";
import {
	AddProductFacadeInputDTO,
	CheckStockFacadeInputDTO,
	CheckStockFacadeOutputDTO,
	ProductAdmFacadeInterface,
} from "./product-adm.facade.interface";

export class ProductAdmFacade implements ProductAdmFacadeInterface {
	constructor(
		private addUseCase: UseCaseInterface,
		private checkStockUseCase: UseCaseInterface
	) {}
	async addProduct(input: AddProductFacadeInputDTO): Promise<void> {
		return this.addUseCase.execute(input);
	}

	async checkStock(
		input: CheckStockFacadeInputDTO
	): Promise<CheckStockFacadeOutputDTO> {
		return this.checkStockUseCase.execute(input);
	}
}
