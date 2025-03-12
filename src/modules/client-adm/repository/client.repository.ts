import { Address, Email, Id } from "../../@shared/domain/value-objects";
import { Client } from "../domain/entities/client/client.entity";
import { ClientGateway } from "../gateways/client.gateway";
import { ClientModel } from "./client.model";

export class ClientRepository implements ClientGateway {
	async add(client: Client): Promise<void> {
		await ClientModel.create({
			id: client.id.id,
			name: client.name,
			email: client.email.toString(),
			address: client.address,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	async find(id: string): Promise<Client> {
		const clientDb = await ClientModel.findOne({ where: { id } });

		if (!clientDb) {
			throw new Error(`client with id ${id} not found`);
		}

		return new Client({
			id: new Id(clientDb.id),
			name: clientDb.name,
			email: new Email(clientDb.email),
			address: new Address(
				clientDb.address.street,
				clientDb.address.city,
				clientDb.address.state,
				clientDb.address.zipCode
			),
		});
	}
}
