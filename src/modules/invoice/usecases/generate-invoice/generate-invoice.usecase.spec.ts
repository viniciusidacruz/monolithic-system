import { describe, it, expect, vi } from "vitest";

import { GenerateInvoiceUseCase } from "./generate-invoice.usecase";

const MockRepository = () => ({
	generate: vi.fn(),
	find: vi.fn(),
});

describe("Generate usecase unit test", () => {
	it("should add a new client", async () => {
		const invoiceRepository = MockRepository();
		const useCase = new GenerateInvoiceUseCase(invoiceRepository);

		const input = {
			name: "Invoice name",
			document: "1234567890",
			street: "123 Main St",
			number: "123",
			complement: "Casa",
			city: "Anytown",
			state: "CA",
			zipCode: "12345",
			items: [
				{
					id: "123",
					name: "Product 1",
					price: 100,
				},
			],
		};

		const output = await useCase.execute(input);

		expect(invoiceRepository.generate).toHaveBeenCalled();
		expect(output.id).toBeDefined();
		expect(output.name).toBe(input.name);
		expect(output.document).toBe(input.document);
		expect(output.street).toBe(input.street);
		expect(output.number).toBe(input.number);
		expect(output.complement).toBe(input.complement);
		expect(output.city).toBe(input.city);
		expect(output.state).toBe(input.state);
		expect(output.zipCode).toBe(input.zipCode);
		expect(output.items.length).toBe(input.items.length);
		expect(output.total).toBe(100);
	});
});
