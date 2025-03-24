import { Umzug } from "umzug";
import request from "supertest";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { clientRoute } from "../routes/client.route";
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";

describe("E2E test for client", () => {
	const app: Express = express();
	app.use(express.json());
	app.use("/", clientRoute);

	let sequelize: Sequelize;

	let migration: Umzug<any>;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
		});

		sequelize.addModels([ClientModel]);
		migration = migrator(sequelize);
		await migration.up();
		await sequelize.sync({ force: true });
	});

	afterEach(async () => {
		if (!migration || !sequelize) {
			return;
		}
		migration = migrator(sequelize);
		await migration.down();
		await sequelize.close();
	});

	it("Should be able to register a new client", async () => {
		const response = await request(app)
			.post("/client/register")
			.send({
				name: "John",
				email: "json@example.com",
				document: "123456789",
				address: {
					street: "Street",
					city: "City",
					state: "State",
					zipCode: "Zip",
					number: "0",
					complement: "Complement",
				},
			});

		expect(response.status).toBe(201);
	});

	it("Should not be able to register a client with invalid data", async () => {
		const response = await request(app)
			.post("/client/register")
			.send({
				name: "John",
				email: "json@example.com",
				document: "123456789",
				address: {
					street: "Street",
					city: "City",
					state: "State",
					zipCode: "Zip",
					number: "0",
				},
			});

		expect(response.status).toBe(400);
	});
});
