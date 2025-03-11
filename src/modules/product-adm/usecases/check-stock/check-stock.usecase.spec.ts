import { describe, it, expect, vi } from "vitest";
import { Product } from "../../domain/entities/product/product.entity";
import { CheckStockUseCase } from "./check-stock.usecase";
import { Id } from "../../../@shared/domain/value-objects";

const product = new Product({
	id: new Id("32ce4fb2-bedd-4191-911f-ae9d781527d1"),
	name: "Test Product",
	description: "Description",
	purchasePrice: 1,
	stock: 1,
});

const MockRepository = () => ({
	add: vi.fn(),
	find: vi.fn().mockReturnValue(Promise.resolve(product)),
});

describe("Check Stock usecase unit test", () => {
	it("should check stock of product", async () => {
		const productRepository = MockRepository();

		const useCase = new CheckStockUseCase(productRepository);

		const output = await useCase.execute({ productId: "1" });

		expect(output.productId).toBe("32ce4fb2-bedd-4191-911f-ae9d781527d1");
		expect(output.stock).toBe(1);
	});
});
