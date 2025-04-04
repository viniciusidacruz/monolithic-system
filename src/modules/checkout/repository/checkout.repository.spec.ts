import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { OrderModel } from "./order.model";
import { OrderProductModel } from "./order-product.model";
import { CheckoutRepository } from "./checkout.repository";
import { ClientModel } from "../../client-adm/repository/client.model";
import { Order } from "../domain/entities/order/order.entity";
import { Product } from "../domain/entities/product/product.entity";
import { Client } from "../domain/entities/client/client.entity";
import { Address, Email, Id } from "../../@shared/domain/value-objects";

describe("Checkout repository test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize("database", "username", "password", {
			dialect: "sqlite",
			logging: false,
			storage: ":memory:",
			sync: { force: true },
		});

		sequelize.addModels([OrderModel, OrderProductModel, ClientModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("Should create a new order", async () => {
		const checkoutRepository = new CheckoutRepository();

		// Criando o cliente no banco antes de criar o pedido
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

		const client = new Client({
			id: new Id("fdkjfkdjdfk1kj1kjk"),
			name: "John Doe",
			email: new Email("john@example.com"),
			address: new Address(
				"Street 1",
				"City",
				"State",
				"12345",
				"100",
				"Apt 1"
			),
		});

		const products = [
			new Product({
				name: "Product 1",
				description: "Description 1",
				salesPrice: 100,
			}),
			new Product({
				name: "Product 2",
				description: "Description 2",
				salesPrice: 200,
			}),
		];

		const order = new Order({
			client,
			products,
		});

		await checkoutRepository.addOrder(order);

		const orderDb = await OrderModel.findOne({
			where: { id: order.id.id },
			include: [OrderProductModel],
		});

		expect(orderDb).not.toBeNull();
		expect(orderDb?.id).toBe(order.id.id);
		expect(orderDb?.status).toBe(order.status);
		expect(orderDb?.total).toBe(order.total);
		expect(orderDb?.products.length).toBe(2);
		expect(orderDb?.products[0].name).toBe(products[0].name);
		expect(orderDb?.products[1].name).toBe(products[1].name);
	});
});
