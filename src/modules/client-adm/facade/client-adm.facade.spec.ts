import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ClientModel } from "../repository/client.model";
import { ClientAdmFacadeFactory } from "../factory/facade.factory";

describe("Client ADM Facade test", () => {
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

	it("Should create a client", async () => {
		const clientAdmFacade = ClientAdmFacadeFactory.create();

		const input = {
			id: "123",
			name: "Test Client",
			email: "test@example.com",
			address: {
				street: "123 Main St",
				city: "Anytown",
				state: "CA",
				zipCode: "12345",
			},
		};

		await clientAdmFacade.addClient(input);

		const clientDb = await ClientModel.findOne({ where: { id: "123" } });

		expect(clientDb?.name).toBe("Test Client");
		expect(clientDb?.email.toString()).toBe("test@example.com");
		expect(clientDb?.address).toBeDefined();
	});

	it("Should find a client", async () => {
		const clientAdmFacade = ClientAdmFacadeFactory.create();

		await ClientModel.create({
			id: "test-uid",
			name: "Test Client",
			email: "test@example.com",
			address: {
				street: "123 Main St",
				city: "Anytown",
				state: "CA",
				zipCode: "12345",
			},
		});

		const input = {
			clientId: "test-uid",
		};

		const output = await clientAdmFacade.findClient(input);

		expect(output.id).toBe("test-uid");
		expect(output.name).toBe("Test Client");
		expect(output.email.toString()).toBe("test@example.com");
		expect(output.address).toBeDefined();
	});
});
