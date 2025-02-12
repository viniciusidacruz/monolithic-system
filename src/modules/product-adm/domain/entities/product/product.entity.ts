import { BaseEntity } from "../../../../@shared/domain/entities/base.entity";
import { AggregateRoot } from "../../../../@shared/domain/entities/aggregate-root.interface";

import { ProductProps } from "./product.entity.d";

export class Product extends BaseEntity implements AggregateRoot {
	private _name: string;
	private _description: string;
	private _purchasePrice: number;
	private _stock: number;

	constructor(props: ProductProps) {
		super(props.id);

		this._name = props.name;
		this._description = props.description;
		this._purchasePrice = props.purchasePrice;
		this._stock = props.stock;
	}

	get name(): string {
		return this._name;
	}

	get description(): string {
		return this._description;
	}

	get purchasePrice(): number {
		return this._purchasePrice;
	}

	get stock(): number {
		return this._stock;
	}

	updateStock(amount: number): void {
		this._stock = amount;
	}

	updateName(name: string): void {
		this._name = name;
	}

	updateDescription(description: string): void {
		this._description = description;
	}

	updatePurchasePrice(purchasePrice: number): void {
		this._purchasePrice = purchasePrice;
	}
}
