import { describe, it, expect } from "vitest";
import { Client } from "../client/client.entity";
import { Address, Email } from "../../../../@shared/domain/value-objects";
import { Product } from "../product/product.entity";
import { Order } from "./order.entity";

describe("Order entity", () => {
	describe("Success ✅", () => {
		it("Should be return order entity", () => {
			const client = new Client({
				name: "John",
				email: new Email("example@example.com"),
				address: new Address("Street", "City", "State", "Zip", "1", "Casa"),
			});

			const products = [
				new Product({
					name: "Product 1",
					description: "Product 1 description",
					salesPrice: 10,
				}),
				new Product({
					name: "Product 2",
					description: "Product 2 description",
					salesPrice: 20,
				}),
			];

			const order = new Order({
				client,
				products,
				status: "pending",
			});

			expect(order).toBeInstanceOf(Order);
			expect(order.client).toBeInstanceOf(Client);
			expect(order.products.length).toBe(2);
			expect(order.status).toBe("pending");
			expect(order.total).toBeCloseTo(30, 2);
		});
	});
});
