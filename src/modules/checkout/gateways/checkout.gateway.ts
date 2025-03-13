import { Order } from "../domain/entities/order/order.entity";

export interface CheckoutGateway {
	addOrder(order: Order): Promise<void>;
	findOrder(orderId: string): Promise<Order | null>;
}
