import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import {
	PlaceOrderUseCaseInputDTO,
	PlaceOrderUseCaseOutputDTO,
} from "./place-order.usecase.dto";

export class PlaceOrderUseCase
	implements
		UseCaseInterface<PlaceOrderUseCaseInputDTO, PlaceOrderUseCaseOutputDTO>
{
	constructor(private readonly _clientFacade: ClientAdmFacadeInterface) {}

	async execute(
		input: PlaceOrderUseCaseInputDTO
	): Promise<PlaceOrderUseCaseOutputDTO> {
		const client = await this._clientFacade.findClient({
			clientId: input.clientId,
		});

		if (!client) {
			throw new Error(`Client not found.`);
		}

		return {
			id: "",
			invoiceId: "",
			status: "",
			products: [],
			total: 0,
		};
	}
}
