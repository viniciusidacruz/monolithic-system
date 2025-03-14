import { BaseEntity } from "../../../../@shared/domain/entities/base.entity";
import { AggregateRoot } from "../../../../@shared/domain/entities/aggregate-root.interface";

import { ClientProps } from "./client.entity.d";
import { Address, Email } from "../../../../@shared/domain/value-objects";

export class Client extends BaseEntity implements AggregateRoot {
	private _name: string;
	private _document: string;
	private _email: Email;
	private _address: Address;

	constructor(props: ClientProps) {
		super(props.id);

		this._name = props.name;
		this._email = props.email;
		this._document = props.document;
		this._address = props.address;

		this.validateFields();
	}

	get name(): string {
		return this._name;
	}

	get document(): string {
		return this._document;
	}

	get email(): Email {
		return this._email;
	}

	get address(): Address {
		return this._address;
	}

	validateFields(): void {
		if (!this._name) {
			throw new Error("Name is required");
		}

		if (!this._document) {
			throw new Error("Document is required");
		}
	}

	updateEmail(email: Email): void {
		this._email = email;
	}

	changeAddress(address: Address): void {
		this._address = address;
	}
}
