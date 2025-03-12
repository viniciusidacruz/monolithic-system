import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";

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
		const productRepository = new ProductRepository();

		await ProductModel.create({
			id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
			name: "Product 1",
			description: "product description",
			salesPrice: 100,
		});

		const products = await productRepository.findAll();

		expect(products.length).toBe(1);
	});

	it("Should find a product", async () => {
		const productRepository = new ProductRepository();

		await ProductModel.create({
			id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
			name: "Product 1",
			description: "product description",
			salesPrice: 100,
		});

		const foundProduct = await productRepository.find(
			"1d5427d6-d0fc-4cfd-94dc-e5d2099e1728"
		);

		expect(foundProduct?.id.id).toBe("1d5427d6-d0fc-4cfd-94dc-e5d2099e1728");
		expect(foundProduct?.name).toBe("Product 1");
		expect(foundProduct?.description).toBe("product description");
		expect(foundProduct?.salesPrice).toBe(100);
	});
});
