import { BaseEntity } from "../../../../@shared/domain/entities/base.entity";
import { AggregateRoot } from "../../../../@shared/domain/entities/aggregate-root.interface";

import { ProductProps } from "./product.entity.d";

export class Product extends BaseEntity implements AggregateRoot {
	private _name: string;
	private _salesPrice: number;
	private _description: string;

	constructor(props: ProductProps) {
		super(props.id);

		this._name = props.name;
		this._description = props.description;
		this._salesPrice = props.salesPrice;

		this.validateFields();
	}

	validateFields(): void {
		if (!this._name.length) {
			throw new Error("Name is required");
		}

		if (!this._description.length) {
			throw new Error("Description is required");
		}

		if (this._salesPrice <= 0) {
			throw new Error("Sales price must be greater than zero");
		}
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
