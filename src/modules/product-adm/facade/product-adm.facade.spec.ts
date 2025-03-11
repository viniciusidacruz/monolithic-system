import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ProductModel } from "../repository/product.model";
import { ProductADMFacadeFactory } from "../factory/facade.factory";

describe("Product ADM Facade test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize("database", "username", "password", {
			dialect: "sqlite",
			logging: false,
			storage: ":memory:",
			sync: { force: true },
		});

		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("Should create a product", async () => {
		const productFacade = ProductADMFacadeFactory.create();

		const input = {
			name: "Test Product",
			description: "Description",
			purchasePrice: 1,
			stock: 1,
			id: "123",
		};

		await productFacade.addProduct(input);

		const productDb = await ProductModel.findOne({ where: { id: "123" } });

		expect(productDb).not.toBeNull();
		expect(productDb?.name).toBe("Test Product");
		expect(productDb?.description).toBe("Description");
		expect(productDb?.purchasePrice).toBe(1);
		expect(productDb?.stock).toBe(1);
	});

	it("Should check stock of a product", async () => {
		const productFacade = ProductADMFacadeFactory.create();

		await ProductModel.create({
			id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
			name: "Product 1",
			description: "product description",
			purchasePrice: 100,
			stock: 10,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const input = { productId: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728" };

		const output = await productFacade.checkStock(input);

		expect(output.productId).toBe("1d5427d6-d0fc-4cfd-94dc-e5d2099e1728");
		expect(output.stock).toBe(10);
	});
});
