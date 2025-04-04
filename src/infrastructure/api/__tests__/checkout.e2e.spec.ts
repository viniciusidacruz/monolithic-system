import { Umzug } from "umzug";
import request from "supertest";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { InvoiceModel } from "../../../modules/invoice/repository/invoice.model";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../../modules/store-catalog/repository/product.model";
import { TransactionModel } from "../../../modules/payment/repository/transaction.model";
import { InvoiceItemModel } from "../../../modules/invoice/repository/invoice-item.model";
import { ProductRegistrationModel } from "../../../modules/product-adm/repository/product.model";
import { checkoutRoute } from "../routes/checkout.route";
import { OrderModel } from "../../../modules/checkout/repository/order.model";
import { OrderProductModel } from "../../../modules/checkout/repository/order-product.model";

describe("E2E test for checkout", () => {
	const app: Express = express();
	app.use(express.json());
	app.use("/", checkoutRoute);

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
			OrderModel,
			OrderProductModel,
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

	it("Should be place order", async () => {
		await ClientModel.create({
			id: "7d7468b3-9a17-4336-b67e-0220798d5ee0",
			name: "John Doe",
			email: "john@example.com",
			document: "123456789",
			address: {
				street: "Street 1",
				city: "City",
				state: "State",
				zipCode: "12345",
				number: "100",
				complement: "Apt 1",
			},
		});

		// Criação dos produtos em ambos os módulos
		await Promise.all([
			ProductRegistrationModel.create({
				id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
				name: "Product 1",
				description: "product description",
				purchasePrice: 100,
				stock: 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			}),
			ProductModel.create({
				id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
				name: "Product 1",
				description: "product description",
				salesPrice: 100,
			}),
		]);

		const response = await request(app)
			.post("/checkout")
			.send({
				clientId: "7d7468b3-9a17-4336-b67e-0220798d5ee0",
				products: [{ productId: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728" }],
			});

		expect(response.status).toBe(201);
		expect(response.body.id).toBeDefined();
		expect(response.body.invoiceId).toBeDefined();
		expect(response.body.status).toEqual("approved");
		expect(response.body.total).toBe(100);
		expect(response.body.products.length).toBe(1);
	});
});
