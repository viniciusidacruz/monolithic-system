import { OrderModel } from "./order.model";
import { Order } from "../domain/entities/order/order.entity";
import { CheckoutGateway } from "../gateways/checkout.gateway";
import { OrderProductModel } from "./order-product.model";

export class CheckoutRepository implements CheckoutGateway {
	async addOrder(input: Order): Promise<void> {
		const order = await OrderModel.create({
			id: input.id.id,
			clientId: input.client.id.id,
			status: input.status,
			total: input.total,
			createdAt: input.createdAt,
			updatedAt: input.updatedAt,
		});

		if (input.products && input.products.length > 0) {
			await OrderProductModel.bulkCreate(
				input.products.map((product) => {
					return {
						id: product.id.id,
						name: product.name,
						description: product.description,
						salesPrice: product.salesPrice,
						orderId: order.id,
					};
				})
			);
		}
	}

	findOrder(orderId: string): Promise<Order | null> {
		throw new Error("Method not implemented.");
	}
}
