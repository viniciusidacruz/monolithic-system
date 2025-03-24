import { Umzug } from "umzug";
import request from "supertest";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { ProductModel } from "../../../modules/store-catalog/repository/product.model";
import { ProductModel as ProductRegistrationModel } from "../../../modules/product-adm/repository/product.model";

describe("E2E test for product", () => {
	const app: Express = express();
	app.use(express.json());

	let sequelize: Sequelize;

	let migration: Umzug<any>;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
		});

		sequelize.addModels([ProductModel, ProductRegistrationModel]);
		migration = migrator(sequelize);
		await migration.up();
	});

	afterEach(async () => {
		if (!migration || !sequelize) {
			return;
		}
		migration = migrator(sequelize);
		await migration.down();
		await sequelize.close();
	});

	it("Should be able to register a new product", async () => {
		const response = await request(app).post("/product/create").send({
			name: "Test Product",
			description: "Description",
			purchasePrice: 1,
			stock: 1,
		});

		expect(response.status).toBe(201);
		expect(response.body.id).toBeTruthy();
		expect(response.body.name).toBe("Test Product");
		expect(response.body.description).toBe("Description");
		expect(response.body.purchasePrice).toBe(1);
		expect(response.body.stock).toBe(1);
	});
});
