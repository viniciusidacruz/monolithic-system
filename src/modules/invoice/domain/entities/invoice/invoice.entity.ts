import { BaseEntity } from "../../../../@shared/domain/entities/base.entity";
import { AggregateRoot } from "../../../../@shared/domain/entities/aggregate-root.interface";
import { Address } from "../../../../@shared/domain/value-objects";
import { InvoiceItem } from "../invoice-item/invoice-item.entity";

import { InvoiceProps } from "./invoice.entity.d";

export class Invoice extends BaseEntity implements AggregateRoot {
	private _name: string;
	private _document: string;
	private _address: Address;
	private _items: InvoiceItem[];

	constructor(props: InvoiceProps) {
		super(props.id);

		this._name = props.name;
		this._document = props.document;
		this._address = props.address;
		this._items = props.items;

		this.validateFields();
	}

	get name(): string {
		return this._name;
	}

	get document(): string {
		return this._document;
	}

	get address(): Address {
		return this._address;
	}

	get items(): InvoiceItem[] {
		return this._items;
	}

	validateFields(): void {
		if (!this._name) {
			throw new Error("Name is required");
		}

		if (!this._document) {
			throw new Error("Document is required");
		}

		if (this._items.length <= 0) {
			throw new Error("At least one item is required");
		}
	}

	changeAddress(address: Address): void {
		this._address = address;
	}
}
