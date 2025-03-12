import { BaseEntity } from "../../../../@shared/domain/entities/base.entity";
import { AggregateRoot } from "../../../../@shared/domain/entities/aggregate-root.interface";
import { InvoiceItemProps } from "./invoice-item.entity.d";

export class InvoiceItem extends BaseEntity implements AggregateRoot {
	private _name: string;
	private _price: number;

	constructor(props: InvoiceItemProps) {
		super(props.id);

		this._name = props.name;
		this._price = props.price;

		this.validateFields();
	}

	get name(): string {
		return this._name;
	}

	get price(): number {
		return this._price;
	}

	validateFields(): void {
		if (!this._name) {
			throw new Error("Name is required");
		}

		if (this._price <= 0) {
			throw new Error("Price must be greater than 0");
		}
	}
}
