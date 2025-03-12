import { BaseEntity } from "../../../../@shared/domain/entities/base.entity";
import { AggregateRoot } from "../../../../@shared/domain/entities/aggregate-root.interface";

import { Client } from "../client/client.entity";
import { Product } from "../product/product.entity";

import { OrderProps } from "./order.entity.d";

export class Order extends BaseEntity implements AggregateRoot {
	private _client: Client;
	private _products: Product[];
	private _status: string;

	constructor(props: OrderProps) {
		super(props.id);

		this._client = props.client;
		this._products = props.products;
		this._status = props.status || "pending";
	}

	approved(): void {
		this._status = "approved";
	}

	get client(): Client {
		return this._client;
	}

	get products(): Product[] {
		return this._products;
	}

	get status(): string {
		return this._status;
	}

	get total(): number {
		return this._products.reduce((total, product) => {
			return total + product.salesPrice;
		}, 0);
	}
}
