import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { PlaceOrderUseCase } from "./place-order.usecase";
import { PlaceOrderUseCaseInputDTO } from "./place-order.usecase.dto";

const mockDate = new Date(2001, 1, 1);

describe("Place order use case unit test", () => {
	//@ts-expect-error
	const placeOrderUseCase = new PlaceOrderUseCase();

	describe("execute method", () => {
		it("Should throw an error when client not found", async () => {
			const mockClientFacade = {
				findClient: vi.fn().mockResolvedValue(null),
			};

			//@ts-expect-error
			placeOrderUseCase["_clientFacade"] = mockClientFacade;

			const input: PlaceOrderUseCaseInputDTO = { clientId: "0", products: [] };

			await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
				"Client not found."
			);
		});
	});

	describe("validateProducts method", () => {
		it("Should throw error if no products are selected", async () => {
			const mockClientFacade = {
				findClient: vi.fn().mockResolvedValue(true),
			};

			//@ts-expect-error
			placeOrderUseCase["_clientFacade"] = mockClientFacade;

			const input: PlaceOrderUseCaseInputDTO = { clientId: "0", products: [] };

			await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
				"No products selected"
			);
		});

		it("Should throw an error when product is out of stock", async () => {
			const mockClientFacade = {
				findClient: vi.fn().mockResolvedValue(true),
			};

			//@ts-expect-error
			placeOrderUseCase["_clientFacade"] = mockClientFacade;

			const mockProductFacade = {
				checkStock: vi.fn().mockImplementation(async ({ productId }) => ({
					productId,
					stock: productId === "1" ? 0 : 1,
				})),
			};

			//@ts-expect-error
			placeOrderUseCase["_productFacade"] = mockProductFacade;

			let input: PlaceOrderUseCaseInputDTO = {
				clientId: "0",
				products: [{ productId: "1" }],
			};

			await expect(
				placeOrderUseCase["validateProducts"](input)
			).rejects.toThrow("Product 1 is not available in stock.");

			input = {
				clientId: "0",
				products: [{ productId: "0" }, { productId: "1" }],
			};

			await expect(
				placeOrderUseCase["validateProducts"](input)
			).rejects.toThrow("Product 1 is not available in stock.");
			expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

			input = {
				clientId: "0",
				products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }],
			};

			await expect(
				placeOrderUseCase["validateProducts"](input)
			).rejects.toThrow("Product 1 is not available in stock.");
			expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);
		});
	});

	describe("getProducts method", () => {
		beforeAll(() => {
			vi.useFakeTimers();
			vi.setSystemTime(mockDate);
		});

		afterAll(() => {
			vi.useRealTimers();
		});

		it("Should throw error when product not found", async () => {
			const mockCatalogFacade = {
				findProductById: vi.fn().mockResolvedValue(null),
			};

			//@ts-expect-error
			placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

			await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(
				"Product not found"
			);
		});
	});
});
