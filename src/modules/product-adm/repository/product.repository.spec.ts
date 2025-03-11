import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ProductModel } from "./product.model";
import { Product } from "../domain/entities/product/product.entity";
import { Id } from "../../@shared/domain/value-objects";
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

	it("Should create a product", async () => {
		const productProps = {
			id: new Id("1"),
			name: "Test Product",
			description: "Description",
			purchasePrice: 1,
			stock: 1,
		};

		const product = new Product(productProps);
		const productRepository = new ProductRepository();
		await productRepository.add(product);

		const productDb = await ProductModel.findOne({
			where: { id: product.id.id },
		});

		expect(productProps.name).toEqual(productDb?.name);
		expect(productProps.description).toEqual(productDb?.description);
		expect(productProps.purchasePrice).toEqual(productDb?.purchasePrice);
		expect(productProps.stock).toEqual(productDb?.stock);
	});

	it("Should find a product by id", async () => {
		const productRepository = new ProductRepository();

		await ProductModel.create({
			id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
			name: "Product 1",
			description: "product description",
			purchasePrice: 100,
			stock: 10,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const foundProduct = await productRepository.find(
			"1d5427d6-d0fc-4cfd-94dc-e5d2099e1728"
		);

		expect(foundProduct).toBeInstanceOf(Product);
		expect(foundProduct?.id.id).toBe("1d5427d6-d0fc-4cfd-94dc-e5d2099e1728");
		expect(foundProduct?.name).toBe("Product 1");
		expect(foundProduct?.description).toBe("product description");
		expect(foundProduct?.purchasePrice).toBe(100);
		expect(foundProduct?.stock).toBe(10);
	});
});
