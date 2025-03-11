import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ProductModel } from "../repository/product.model";
import { StoreCatalogFacadeFactory } from "../factory/facade.factory";

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

	it("Should find all products", async () => {
		const productFacade = StoreCatalogFacadeFactory.create();

		await ProductModel.create({
			id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
			name: "Product 1",
			description: "product description",
			salesPrice: 100,
		});

		const outout = await productFacade.findAllProducts();

		expect(outout.products.length).toBe(1);
		expect(outout.products[0].id).toBe("1d5427d6-d0fc-4cfd-94dc-e5d2099e1728");
		expect(outout.products[0].name).toBe("Product 1");
		expect(outout.products[0].description).toBe("product description");
		expect(outout.products[0].salesPrice).toBe(100);
	});

	it("Should find a product by id", async () => {
		const productFacade = StoreCatalogFacadeFactory.create();
		const product = await ProductModel.create({
			id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
			name: "Product 1",
			description: "product description",
			salesPrice: 100,
		});

		const input = {
			id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
		};

		const output = await productFacade.findProductById(input);

		expect(output.id).toBe("1d5427d6-d0fc-4cfd-94dc-e5d2099e1728");
		expect(output.name).toBe("Product 1");
		expect(output.description).toBe("product description");
		expect(output.salesPrice).toBe(100);
	});
});
