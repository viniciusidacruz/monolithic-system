import { describe, it, expect } from "vitest";
import { Invoice } from "./invoice.entity";
import { Address } from "../../../../@shared/domain/value-objects";
import { InvoiceItem } from "../invoice-item/invoice-item.entity";

describe("Invoice Item entity", () => {
	describe("Error ❌", () => {
		it("Should throw error when name is empty", () => {
			const invoiceItem = new InvoiceItem({
				name: "1",
				price: 100,
			});

			expect(() => {
				new Invoice({
					name: "",
					items: [invoiceItem],
					document: "123",
					address: new Address("Street", "City", "State", "Zip", "1", "Casa"),
				});
			}).toThrow("Name is required");
		});

		it("Should throw error when document is empty", () => {
			const invoiceItem = new InvoiceItem({
				name: "1",
				price: 100,
			});

			expect(() => {
				new Invoice({
					name: "Invoice 1",
					items: [invoiceItem],
					document: "",
					address: new Address("Street", "City", "State", "Zip", "1", "Casa"),
				});
			}).toThrow("Document is required");
		});

		it("Should throw error when item is not found", () => {
			expect(() => {
				new Invoice({
					name: "Invoice 1",
					items: [],
					document: "document",
					address: new Address("Street", "City", "State", "Zip", "1", "Casa"),
				});
			}).toThrow("At least one item is required");
		});
	});

	describe("Success ✅", () => {
		it("Should create valid invoice", () => {
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

			expect(invoice.name).toBe("Invoice 1");
			expect(invoice.document).toBe("123");
			expect(invoice.items[0].name).toBe("1");
			expect(invoice.items[0].price).toBe(100);
			expect(invoice.address.street).toBe("Street");
			expect(invoice.address.city).toBe("City");
			expect(invoice.address.state).toBe("State");
			expect(invoice.address.zipCode).toBe("Zip");
			expect(invoice.items[0]).toBeInstanceOf(InvoiceItem);
			expect(invoice.address).toBeInstanceOf(Address);
			expect(invoice).toBeInstanceOf(Invoice);
			expect(invoice.id).toBeDefined();
		});
	});
});
