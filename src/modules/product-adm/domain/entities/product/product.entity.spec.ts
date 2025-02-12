import { describe, it, expect } from "vitest";

import { Product } from "./product.entity";

const product = new Product({
	name: "Test Product",
	description: "Description",
	purchasePrice: 1,
	stock: 1,
});

describe("Product entity", () => {
	it("should be created with name, price, and quantity", () => {
		expect(product.name).toBe("Test Product");
		expect(product.description).toBe("Description");
		expect(product.purchasePrice).toBe(1);
		expect(product.stock).toBe(1);
	});

	it("should update price", () => {
		expect(product.purchasePrice).toBe(1);

		product.updatePurchasePrice(2);

		expect(product.purchasePrice).toBe(2);
	});

	it("should update stock", () => {
		expect(product.stock).toBe(1);

		product.updateStock(2);

		expect(product.stock).toBe(2);
	});

	it("should update name", () => {
		expect(product.name).toBe("Test Product");

		product.updateName("Updated Product");

		expect(product.name).toBe("Updated Product");
	});
});
