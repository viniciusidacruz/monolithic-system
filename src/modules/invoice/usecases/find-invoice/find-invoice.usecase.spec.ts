import { describe, it, expect, vi } from "vitest";
import { Address } from "../../../@shared/domain/value-objects";
import { Invoice } from "../../domain/entities/invoice/invoice.entity";
import { InvoiceItem } from "../../domain/entities/invoice-item/invoice-item.entity";
import { FindInvoiceUseCase } from "./find-invoice.usecase";

const invoiceItem = new InvoiceItem({
	name: "1",
	price: 100,
});

const invoice = new Invoice({
	name: "Invoice 1",
	items: [invoiceItem],
	document: "123",
	address: new Address("Street", "City", "State", "Zip", "1", "Casa"),
});

const MockRepository = () => ({
	generate: vi.fn(),
	find: vi.fn().mockReturnValue(Promise.resolve(invoice)),
});

describe("Find usecase unit test", () => {
	it("should find an invoice", async () => {
		const invoiceRepository = MockRepository();

		const useCase = new FindInvoiceUseCase(invoiceRepository);

		const input = { id: "1" };

		const output = await useCase.execute(input);

		expect(output.id).toBeDefined();
		expect(output.name).toBe("Invoice 1");
		expect(output.items.length).toBe(1);
		expect(output.total).toBe(100);
	});
});
