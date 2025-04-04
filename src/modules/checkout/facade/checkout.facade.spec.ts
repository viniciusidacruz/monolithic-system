import { Sequelize } from "sequelize-typescript";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ClientModel } from "../../client-adm/repository/client.model";
import { ProductRegistrationModel } from "../../product-adm/repository/product.model";
import { InvoiceModel } from "../../invoice/repository/invoice.model";
import { InvoiceItemModel } from "../../invoice/repository/invoice-item.model";
import { TransactionModel } from "../../payment/repository/transaction.model";
import { ProductModel } from "../../store-catalog/repository/product.model";
import { OrderProductModel } from "../repository/order-product.model";
import { CheckoutFacadeFactory } from "../factory/facade.factory";
import { PlaceOrderFacadeInputDTO } from "./checkout.facade.interface";
import { OrderModel } from "../repository/order.model";

describe("Checkout Facade test", () => {
	let sequelize: Sequelize;

	beforeAll(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([
			ClientModel,
			ProductRegistrationModel,
			InvoiceModel,
			InvoiceItemModel,
			TransactionModel,
			ProductModel,
			OrderProductModel,
			OrderModel,
		]);
		await sequelize.sync();
	});

	afterAll(async () => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		await sequelize.close();
	});

	it("Should be return place order", async () => {
		const checkoutFacade = CheckoutFacadeFactory.create();

		// Criação do cliente
		await ClientModel.create({
			id: "fdkjfkdjdfk1kj1kjk",
			name: "John Doe",
			email: "john@example.com",
			document: "123456789",
			address: {
				street: "Street 1",
				city: "City",
				state: "State",
				zipCode: "12345",
				number: "100",
				complement: "Apt 1",
			},
		});

		// Criação dos produtos em ambos os módulos
		await Promise.all([
			ProductRegistrationModel.create({
				id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
				name: "Product 1",
				description: "product description",
				purchasePrice: 100,
				stock: 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			}),
			ProductModel.create({
				id: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
				name: "Product 1",
				description: "product description",
				salesPrice: 100,
			}),
		]);

		const input: PlaceOrderFacadeInputDTO = {
			clientId: "fdkjfkdjdfk1kj1kjk",
			products: [
				{
					productId: "1d5427d6-d0fc-4cfd-94dc-e5d2099e1728",
				},
			],
		};

		const output = await checkoutFacade.placeOrder(input);

		expect(output.id).toBeTruthy();
		expect(output.invoiceId).toBeTruthy();
		expect(output.status).toBe("approved");
		expect(output.total).toBe(100);
		expect(output.products.length).toBe(1);
	});
});
