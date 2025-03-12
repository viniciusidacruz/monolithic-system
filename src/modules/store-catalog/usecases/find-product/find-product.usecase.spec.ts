import { describe, it, expect, vi } from "vitest";

import { Id } from "../../../@shared/domain/value-objects";
import { Product } from "../../domain/entities/product/product.entity";
import { FindProductUseCase } from "./find-product.usecase";

const product = new Product({
	id: new Id("32ce4fb2-bedd-4191-911f-ae9d781527d1"),
	name: "Product One",
	description: "Description 1",
	salesPrice: 1,
});

const MockRepository = () => ({
	findAll: vi.fn(),
	find: vi.fn().mockReturnValue(Promise.resolve(product)),
});

describe("Find product use case unit test", () => {
	it("should find a product", async () => {
		const productRepository = MockRepository();

		const useCase = new FindProductUseCase(productRepository);

		const input = { productId: "32ce4fb2-bedd-4191-911f-ae9d781527d1" };

		const output = await useCase.execute(input);

		expect(output.id).toBe("32ce4fb2-bedd-4191-911f-ae9d781527d1");
		expect(output.name).toBe("Product One");
		expect(output.description).toBe("Description 1");
		expect(output.salesPrice).toBe(1);
	});
});
