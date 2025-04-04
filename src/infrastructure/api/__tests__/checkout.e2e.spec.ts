import { Umzug } from "umzug";
import request from "supertest";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { productRoute } from "../routes/product.route";
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { InvoiceModel } from "../../../modules/invoice/repository/invoice.model";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../../modules/store-catalog/repository/product.model";
import { TransactionModel } from "../../../modules/payment/repository/transaction.model";
import { InvoiceItemModel } from "../../../modules/invoice/repository/invoice-item.model";
import { ProductRegistrationModel } from "../../../modules/product-adm/repository/product.model";

describe("E2E test for checkout", () => {
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

		sequelize.addModels([
			ClientModel,
			ProductRegistrationModel,
			InvoiceModel,
			InvoiceItemModel,
			TransactionModel,
			ProductModel,
		]);
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

	it.skip("Should be place order", async () => {
		const response = await request(app)
			.post("/checkout")
			.send({
				clientId: 1,
				products: [{ productId: 1 }],
			});

		expect(response.status).toBe(200);
	});
});
