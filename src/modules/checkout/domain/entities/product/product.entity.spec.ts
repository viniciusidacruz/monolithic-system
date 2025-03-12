import { describe, it, expect } from "vitest";

import { Product } from "./product.entity";

describe("Product entity", () => {
	describe("Error ❌", () => {
		it("Should throw error when name is empty", () => {
			expect(() => {
				new Product({
					name: "",
					description: "Description",
					salesPrice: 1,
				});
			}).toThrow("Name is required");
		});

		it("Should throw error when description is empty", () => {
			expect(() => {
				new Product({
					name: "Name",
					description: "",
					salesPrice: 1,
				});
			}).toThrow("Description is required");
		});

		it("Should throw error when amount is zero", () => {
			expect(() => {
				new Product({
					name: "Name",
					description: "Description",
					salesPrice: 0,
				});
			}).toThrow("Sales price must be greater than zero");
		});
	});

	describe("Success ✅", () => {
		it("Should create valid product", () => {
			const transaction = new Product({
				name: "Name",
				description: "Description",
				salesPrice: 1,
			});
			expect(transaction.salesPrice).toBe(1);
			expect(transaction.id).toBeDefined();
			expect(transaction.description).toBe("Description");
			expect(transaction.name).toBe("Name");
		});
	});
});
