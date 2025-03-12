import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceRepository } from "./invoice.repository";
import { Invoice } from "../domain/entities/invoice/invoice.entity";
import { InvoiceItem } from "../domain/entities/invoice-item/invoice-item.entity";
import { Address } from "../../@shared/domain/value-objects";

describe("Invoice repository test", () => {
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

	it("Should be generate invoice", async () => {
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

		const invoiceRepository = new InvoiceRepository();

		await invoiceRepository.generate(invoice);

		const productDb = await InvoiceModel.findOne({
			where: { id: invoice.id.id },
			include: [{ model: InvoiceItemModel }],
		});

		expect(productDb).toBeDefined();
		expect(productDb?.id).toBe(invoice.id.id);
		expect(productDb?.name).toBe("Invoice 1");
		expect(productDb?.document).toBe("123");
		expect(productDb?.street).toBe("Street");
		expect(productDb?.city).toBe("City");
		expect(productDb?.state).toBe("State");
		expect(productDb?.zipCode).toBe("Zip");
		expect(productDb?.number).toBe("1");
		expect(productDb?.complement).toBe("Casa");
		expect(productDb?.items.length).toBe(1);
	});

	it("Should be return invoice by id", async () => {
		const productRepository = new InvoiceRepository();

		const invoice = await InvoiceModel.create({
			id: "invoice-id",
			name: "Test Invoice",
			document: "1234567890",
			street: "Rua Teste",
			number: "123",
			complement: "Apto 123",
			city: "Teste City",
			state: "Teste State",
			zipCode: "12345-678",
		});

		await InvoiceItemModel.create({
			id: "invoice-item-id",
			invoiceId: invoice.id,
			name: "Item 1",
			price: 10,
		});

		const result = await productRepository.find("invoice-id");

		expect(result).toBeDefined();
		expect(result?.id.id).toBe("invoice-id");
		expect(result?.name).toBe("Test Invoice");
		expect(result?.items[0].id.id).toBe("invoice-item-id");
		expect(result?.items[0].name).toBe("Item 1");
		expect(result?.items[0].price).toBe(10);
	});
});
