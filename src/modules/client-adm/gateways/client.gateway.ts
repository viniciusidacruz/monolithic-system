import { Client } from "../domain/entities/client/client.entity";

export interface ClientGateway {
	add(client: Client): Promise<void>;
	find(id: string): Promise<Client>;
}

