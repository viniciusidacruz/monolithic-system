import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { ClientGateway } from "../../gateways/client.gateway";

import {
	FindClientUseCaseInputDTO,
	FindClientUseCaseOutputDTO,
} from "./find-client.usecase.dto";

export class FindClientUseCase
	implements
		UseCaseInterface<FindClientUseCaseInputDTO, FindClientUseCaseOutputDTO>
{
	constructor(private readonly clientRepository: ClientGateway) {}

	async execute(
		input: FindClientUseCaseInputDTO
	): Promise<FindClientUseCaseOutputDTO> {
		const client = await this.clientRepository.find(input.clientId);

		if (!client) {
			throw new Error(`Client with id ${input.clientId} not found.`);
		}

		return {
			id: client.id.id,
			name: client.name,
			email: client.email.toString(),
			address: {
				street: client.address.street,
				city: client.address.city,
				state: client.address.state,
				zipCode: client.address.zipCode,
			},
			createdAt: client.createdAt,
			updatedAt: client.updatedAt,
		};
	}
}

