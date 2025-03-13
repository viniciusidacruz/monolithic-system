import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facade.interface";
import {
	PlaceOrderUseCaseInputDTO,
	PlaceOrderUseCaseOutputDTO,
} from "./place-order.usecase.dto";

export class PlaceOrderUseCase
	implements
		UseCaseInterface<PlaceOrderUseCaseInputDTO, PlaceOrderUseCaseOutputDTO>
{
	constructor(
		private readonly _clientFacade: ClientAdmFacadeInterface,
		private readonly _productFacade: ProductAdmFacadeInterface
	) {}

	async execute(
		input: PlaceOrderUseCaseInputDTO
	): Promise<PlaceOrderUseCaseOutputDTO> {
		const client = await this._clientFacade.findClient({
			clientId: input.clientId,
		});

		if (!client) {
			throw new Error(`Client not found.`);
		}

		await this.validateProducts(input);

		return {
			id: "",
			invoiceId: "",
			status: "",
			products: [],
			total: 0,
		};
	}

	private async validateProducts(
		input: PlaceOrderUseCaseInputDTO
	): Promise<void> {
		if (input.products.length === 0) {
			throw new Error("No products selected");
		}

		for (const p of input.products) {
			const product = await this._productFacade.checkStock({
				productId: p.productId,
			});

			if (product.stock <= 0) {
				throw new Error(
					`Product ${product.productId} is not available in stock.`
				);
			}
		}
	}
}
