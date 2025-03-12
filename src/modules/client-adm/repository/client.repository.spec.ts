import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ClientModel } from "./client.model";
import { Client } from "../domain/entities/client/client.entity";
import { Address, Email } from "../../@shared/domain/value-objects";
import { ClientRepository } from "./client.repository";

describe("Client repository test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize("database", "username", "password", {
			dialect: "sqlite",
			logging: false,
			storage: ":memory:",
			sync: { force: true },
		});

		sequelize.addModels([ClientModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("Should find a client", async () => {
		const clientRepository = new ClientRepository();

		await ClientModel.create({
			id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
			name: "Product 1",
			email: "test@example.com",
			address: {
				street: "123 Main St",
				city: "Anytown",
				state: "CA",
				zipCode: "12345",
				number: "12345",
				complement: "Casa",
			},
		});

		const foundClient = await clientRepository.find(
			"1d5427d6-d0fc-4cfd-94dc-e5d2099e1728"
		);

		expect(foundClient?.id.id).toBe("1d5427d6-d0fc-4cfd-94dc-e5d2099e1728");
		expect(foundClient?.name).toBe("Product 1");
		expect(foundClient?.email.toString()).toBe("test@example.com");
		expect(foundClient?.address.toString()).toBe(
			"123 Main St - 12345, Anytown, CA 12345 | Casa"
		);
	});

	it("Should create a new client", async () => {
		const clientProps = {
			name: "John Doe",
			email: new Email("example@example.com"),
			address: new Address("Street", "City", "State", "Zip", "1", "Casa"),
		};

		const client = new Client(clientProps);
		const clientRepository = new ClientRepository();

		await clientRepository.add(client);

		const clientDb = await ClientModel.findOne({
			where: { id: client.id.id },
		});

		expect(clientProps.name).toEqual(clientDb?.name);
		expect(clientProps.email.toString()).toEqual(clientDb?.email);
		expect(clientProps.address).toEqual(clientDb?.address);
	});
});
