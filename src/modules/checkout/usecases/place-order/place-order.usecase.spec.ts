import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { PlaceOrderUseCase } from "./place-order.usecase";
import { PlaceOrderUseCaseInputDTO } from "./place-order.usecase.dto";
import { Product } from "../../domain/entities/product/product.entity";
import { Id } from "../../../@shared/domain/value-objects";

const mockDate = new Date(2001, 1, 1);

describe("Place order use case unit test", () => {
	describe("execute method", () => {
		beforeAll(() => {
			vi.useFakeTimers();
			vi.setSystemTime(mockDate);
		});

		afterAll(() => {
			vi.useRealTimers();
		});

		it("Should throw an error when client not found", async () => {
			const mockClientFacade = {
				findClient: vi.fn().mockResolvedValue(null),
			};

			//@ts-expect-error
			const placeOrderUseCase = new PlaceOrderUseCase();

			//@ts-expect-error
			placeOrderUseCase["_clientFacade"] = mockClientFacade;

			const input: PlaceOrderUseCaseInputDTO = { clientId: "0", products: [] };

			await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
				"Client not found."
			);
		});

		describe("Place an order", () => {
			const clientProps = {
				id: "1c",
				name: "Test Client",
				email: "test@example.com",
				document: "document",
				address: {
					street: "street",
					city: "city",
					state: "state",
					zipCode: "zip",
					complement: "complement",
					number: "number",
				},
			};

			const mockClientFacade = {
				addClient: vi.fn(),
				findClient: vi.fn().mockResolvedValue(clientProps),
			};

			const mockPaymentFacade = {
				process: vi.fn(),
			};

			const mockCheckoutRepo = {
				addOrder: vi.fn(),
			};

			const mockInvoiceFacade = {
				generateInvoice: vi.fn().mockResolvedValue({ id: "1i" }),
			};

			const placeOrderUseCase = new PlaceOrderUseCase(
				mockClientFacade,
				null as any,
				null as any,
				mockCheckoutRepo as any,
				mockInvoiceFacade as any,
				mockPaymentFacade as any
			);

			const products = {
				"1": new Product({
					id: new Id("1"),
					name: "Product 1",
					description: "Description 1",
					salesPrice: 100,
				}),
				"2": new Product({
					id: new Id("2"),
					name: "Product 2",
					description: "Description 2",
					salesPrice: 200,
				}),
			};

			const mockValidateProducts = vi
				//@ts-expect-error
				.spyOn(placeOrderUseCase, "validateProducts")
				//@ts-expect-error
				.mockResolvedValue(null);

			const mockGetProduct = vi
				//@ts-expect-error
				.spyOn(placeOrderUseCase, "getProduct")
				//@ts-expect-error
				.mockImplementation((productId: keyof typeof products) => {
					return products[productId];
				});

			it("should not be approved", async () => {
				mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
					transactionId: "1t",
					status: "pending",
					amount: 300,
					orderId: "error",
					createdAt: new Date(),
					updatedAt: new Date(),
				});

				const input: PlaceOrderUseCaseInputDTO = {
					clientId: "0",
					products: [{ productId: "1" }, { productId: "2" }],
				};

				let output = await placeOrderUseCase.execute(input);

				expect(output.invoiceId).toBeNull();
				expect(output.total).toBe(300);
				expect(output.products.length).toBe(2);
				expect(output.products).toStrictEqual([
					{
						productId: "1",
					},
					{
						productId: "2",
					},
				]);
				expect(mockClientFacade.findClient).toHaveBeenCalledTimes(1);
				expect(mockClientFacade.findClient).toHaveBeenCalledWith({
					clientId: "0",
				});
				expect(mockValidateProducts).toHaveBeenCalledTimes(1);
				expect(mockValidateProducts).toHaveBeenCalledWith(input);
				expect(mockGetProduct).toHaveBeenCalledTimes(2);
				expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);
				expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("validateProducts method", () => {
		//@ts-expect-error
		const placeOrderUseCase = new PlaceOrderUseCase();

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
		//@ts-expect-error
		const placeOrderUseCase = new PlaceOrderUseCase();

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

		it("Should return product", async () => {
			const mockCatalogFacade = {
				findProductById: vi.fn().mockResolvedValue({
					id: "0",
					name: "Product 1",
					description: "product description",
					salesPrice: 100,
				}),
			};

			//@ts-expect-error
			placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

			const product = await placeOrderUseCase["getProduct"]("0");

			expect(product.id.id).toBe("0");
			expect(product.name).toBe("Product 1");
			expect(product.description).toBe("product description");
			expect(product.salesPrice).toBe(100);
			expect(mockCatalogFacade.findProductById).toHaveBeenCalledTimes(1);
		});
	});
});
