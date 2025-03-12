import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import { InvoiceFacadeFactory } from "../factory/facade.factory";

describe("Invoice Facade test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize("database", "username", "password", {
			dialect: "sqlite",
			logging: false,
			storage: ":memory:",
			sync: { force: true },
		});

		sequelize.addModels([InvoiceModel, InvoiceItemModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("Should generate invoice", async () => {
		const invoiceFacade = InvoiceFacadeFactory.create();

		const input = {
			name: "Test Invoice",
			document: "12345678901",
			street: "Test Street",
			number: "123",
			complement: "Apt 1",
			city: "Test City",
			state: "Test State",
			zipCode: "12345-678",
			items: [
				{
					id: "123",
					name: "Test Item",
					price: 1,
				},
			],
		};

		const invoice = await invoiceFacade.generateInvoice(input);

		expect(invoice.id).toBeDefined();
		expect(invoice.name).toBe(input.name);
		expect(invoice.document).toBe(input.document);
		expect(invoice.street).toBe(input.street);
		expect(invoice.number).toBe(input.number);
		expect(invoice.complement).toBe(input.complement);
		expect(invoice.city).toBe(input.city);
		expect(invoice.state).toBe(input.state);
		expect(invoice.zipCode).toBe(input.zipCode);
		expect(invoice.items.length).toBe(1);
	});

	it("Should find invoice", async () => {
		const invoiceFacade = InvoiceFacadeFactory.create();

		const invoice = await InvoiceModel.create({
			id: "id",
			name: "Test Invoice",
			document: "12345678901",
			street: "Test Street",
			number: "123",
			complement: "Apt 1",
			city: "Test City",
			state: "Test State",
			zipCode: "12345-678",
		});

		await InvoiceItemModel.create({
			id: "1234",
			invoiceId: invoice.id,
			name: "Test Item",
			price: 1,
		});

		const input = { id: invoice.id };

		const foundInvoice = await invoiceFacade.findInvoice(input);

		expect(foundInvoice.id).toBe(invoice.id);
		expect(foundInvoice.name).toBe(invoice.name);
		expect(foundInvoice.document).toBe(invoice.document);
		expect(foundInvoice.address.street).toBe(invoice.street);
		expect(foundInvoice.items.length).toBe(1);
	});
});
