import { describe, it, expect, vi } from "vitest";
import { PlaceOrderUseCase } from "./place-order.usecase";
import { PlaceOrderUseCaseInputDTO } from "./place-order.usecase.dto";

describe("Place order use case unit test", () => {
	describe("Execute method", () => {
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
	});
});
