import { UseCaseInterface } from "../../@shared/usecases/use-case.interface";
import {
	AddClientUseCaseInputDTO,
	AddClientUseCaseOutputDTO,
} from "../usecases/add-client/add-client.usecases.dto";
import {
	FindClientUseCaseInputDTO,
	FindClientUseCaseOutputDTO,
} from "../usecases/find-client/find-client.usecase.dto";
import {
	AddClientFacadeInputDTO,
	ClientAdmFacadeInterface,
	FindClientInputDTO,
	FindClientOutputDTO,
} from "./client-adm.facade.interface";

export class ClientAdmFacade implements ClientAdmFacadeInterface {
	constructor(
		private addClientUseCase: UseCaseInterface<
			AddClientUseCaseInputDTO,
			AddClientUseCaseOutputDTO
		>,
		private findClientUseCase: UseCaseInterface<
			FindClientUseCaseInputDTO,
			FindClientUseCaseOutputDTO
		>
	) {}

	async addClient(input: AddClientFacadeInputDTO): Promise<void> {
		await this.addClientUseCase.execute(input);
	}

	async findClient(input: FindClientInputDTO): Promise<FindClientOutputDTO> {
		return this.findClientUseCase.execute(input);
	}
}
