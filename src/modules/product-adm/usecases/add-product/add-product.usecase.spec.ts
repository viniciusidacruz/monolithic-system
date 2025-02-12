import { describe, it, expect, vi } from "vitest";

import { AddProductUseCase } from "./add-product.usecase";

const MockRepository = () => ({
	add: vi.fn(),
	find: vi.fn(),
});

describe("Add Product usecase unit test", () => {
	it("should add a new product", async () => {
		const productRepository = MockRepository();

		const useCase = new AddProductUseCase(productRepository);

		const input = {
			name: "Product 1",
			description: "Product description",
			purchasePrice: 100,
			stock: 10,
		};

		const output = await useCase.execute(input);

		expect(productRepository.add).toHaveBeenCalled();
		expect(output.id).toBeDefined();
		expect(output.name).toBe(input.name);
		expect(output.description).toBe(input.description);
		expect(output.purchasePrice).toBe(input.purchasePrice);
		expect(output.stock).toBe(input.stock);
	});
});
