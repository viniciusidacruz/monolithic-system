import { describe, it, expect } from "vitest";
import { InvoiceItem } from "./invoice-item.entity";

describe("Invoice Item entity", () => {
	describe("Error ❌", () => {
		it("Should throw error when name is empty", () => {
			expect(() => {
				new InvoiceItem({
					name: "",
					price: 100,
				});
			}).toThrow("Name is required");
		});

		it("Should throw error when price is zero or less", () => {
			expect(() => {
				new InvoiceItem({ name: "Item 1", price: 0 });
			}).toThrow("Price must be greater than 0");
		});
	});

	describe("Success ✅", () => {
		it("Should create valid invoice item", () => {
			const invoiceItem = new InvoiceItem({ name: "Item 1", price: 100 });
			expect(invoiceItem.name).toBe("Item 1");
			expect(invoiceItem.price).toBe(100);
		});
	});
});
