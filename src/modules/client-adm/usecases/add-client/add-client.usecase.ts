import { Address, Email, Id } from "../../../@shared/domain/value-objects";
import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { Client } from "../../domain/entities/client/client.entity";
import { ClientGateway } from "../../gateways/client.gateway";
import {
	AddClientUseCaseInputDTO,
	AddClientUseCaseOutputDTO,
} from "./add-client.usecases.dto";

export class AddClientUseCase
	implements
		UseCaseInterface<AddClientUseCaseInputDTO, AddClientUseCaseOutputDTO>
{
	constructor(private readonly clientRepository: ClientGateway) {}

	async execute(
		input: AddClientUseCaseInputDTO
	): Promise<AddClientUseCaseOutputDTO> {
		const props = {
			id: new Id(input.id),
			name: input.name,
			email: new Email(input.email),
			address: new Address(
				input.address.street,
				input.address.city,
				input.address.state,
				input.address.zipCode,
				input.address.number,
				input.address.complement
			),
		};

		const client = new Client(props);

		await this.clientRepository.add(client);

		return {
			id: client.id.id,
			name: client.name,
			email: client.email.toString(),
			address: client.address,
			createdAt: client.createdAt,
			updatedAt: client.updatedAt,
		};
	}
}
