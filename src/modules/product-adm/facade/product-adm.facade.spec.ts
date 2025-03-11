import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ProductModel } from "../repository/product.model";
import { ProductADMFacadeFactory } from "../factory/facade.factory";

describe("Product repository test", () => {
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
});
