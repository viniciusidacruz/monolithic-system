import { describe, it, expect, vi } from "vitest";

import { Id } from "../../../@shared/domain/value-objects";
import { Product } from "../../domain/entities/product/product.entity";
import { FindAllProductsUseCase } from "./find-all-products.usecase";

const productOne = new Product({
	id: new Id("32ce4fb2-bedd-4191-911f-ae9d781527d1"),
	name: "Product One",
	description: "Description 1",
	salesPrice: 1,
});

const productTwo = new Product({
	id: new Id("8a0618e9-f109-45a2-a487-741ae9607196"),
	name: "Product Two",
	description: "Description 2",
	salesPrice: 2,
});

const MockRepository = () => ({
	findAll: vi.fn().mockReturnValue(Promise.resolve([productOne, productTwo])),
	find: vi.fn(),
});

describe("Find all use case unit test", () => {
	it("should find all products", async () => {
		const productRepository = MockRepository();

		const useCase = new FindAllProductsUseCase(productRepository);

		const output = await useCase.execute();

		expect(output.products.length).toBe(2);
		expect(output.products[0].id).toBe("32ce4fb2-bedd-4191-911f-ae9d781527d1");
		expect(output.products[0].name).toBe("Product One");
		expect(output.products[0].description).toBe("Description 1");
		expect(output.products[0].salesPrice).toBe(1);
		expect(output.products[1].id).toBe("8a0618e9-f109-45a2-a487-741ae9607196");
		expect(output.products[1].name).toBe("Product Two");
		expect(output.products[1].description).toBe("Description 2");
		expect(output.products[1].salesPrice).toBe(2);
	});
});
