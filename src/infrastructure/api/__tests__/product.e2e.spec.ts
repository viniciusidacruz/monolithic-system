import { Umzug } from "umzug";
import request from "supertest";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { productRoute } from "../routes/product.route";
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { ProductModel } from "../../../modules/store-catalog/repository/product.model";
import { ProductRegistrationModel } from "../../../modules/product-adm/repository/product.model";

describe("E2E test for product", () => {
	const app: Express = express();
	app.use(express.json());
	app.use("/", productRoute);

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

	it("Should be able to register a new product", async () => {
		const response = await request(app).post("/products").send({
			name: "Test Product",
			description: "Description",
			purchasePrice: 1,
			stock: 1,
		});

		expect(response.status).toBe(201);
		expect(response.body.message).toBe("Product created successfully");
	});

	it("Should not be able to register a product with invalid data", async () => {
		const response = await request(app).post("/products").send({
			name: "Test Product",
			description: "Description",
			stock: 1,
		});

		expect(response.status).toBe(400);
	});
});
