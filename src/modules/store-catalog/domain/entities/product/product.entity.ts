import { BaseEntity } from "../../../../@shared/domain/entities/base.entity";
import { AggregateRoot } from "../../../../@shared/domain/entities/aggregate-root.interface";

import { ProductProps } from "./product.entity.d";

export class Product extends BaseEntity implements AggregateRoot {
	private _name: string;
	private _description: string;
	private _salesPrice: number;

	constructor(props: ProductProps) {
		super(props.id);

		this._name = props.name;
		this._description = props.description;
		this._salesPrice = props.salesPrice;
	}

	get name(): string {
		return this._name;
	}

	get description(): string {
		return this._description;
	}

	get salesPrice(): number {
		return this._salesPrice;
	}
}
