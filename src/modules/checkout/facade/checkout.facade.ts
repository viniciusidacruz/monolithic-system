import { UseCaseInterface } from "../../@shared/usecases/use-case.interface";

import {
	PlaceOrderUseCaseInputDTO,
	PlaceOrderUseCaseOutputDTO,
} from "../usecases/place-order/place-order.usecase.dto";
import {
	CheckoutFacadeInterface,
	PlaceOrderFacadeInputDTO,
	PlaceOrderFacadeOutputDTO,
} from "./checkout.facade.interface";

export class CheckoutFacade implements CheckoutFacadeInterface {
	constructor(
		private placeOrderUseCase: UseCaseInterface<
			PlaceOrderUseCaseInputDTO,
			PlaceOrderUseCaseOutputDTO
		>
	) {}
	async placeOrder(
		input: PlaceOrderFacadeInputDTO
	): Promise<PlaceOrderFacadeOutputDTO> {
		return await this.placeOrderUseCase.execute(input);
	}
}
