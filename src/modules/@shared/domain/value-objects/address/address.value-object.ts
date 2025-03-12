import { ValueObject } from "../value-object.interface";

export class Address implements ValueObject {
	private _street: string;
	private _city: string;
	private _state: string;
	private _zipCode: string;

	constructor(street: string, city: string, state: string, zipCode: string) {
		this._street = street;
		this._city = city;
		this._state = state;
		this._zipCode = zipCode;
		this.validate();
	}

	get street(): string {
		return this._street;
	}

	get city(): string {
		return this._city;
	}

	get state(): string {
		return this._state;
	}

	get zipCode(): string {
		return this._zipCode;
	}

	validate(): boolean {
		if (this._street.length === 0) {
			throw new Error("Street is required");
		}

		if (this._city.length === 0) {
			throw new Error("City is required");
		}

		if (this._state.length === 0) {
			throw new Error("State is required");
		}

		if (this._zipCode.length === 0) {
			throw new Error("Zip code is required");
		}

		return true;
	}

	toString(): string {
		return `${this._street}, ${this._city}, ${this._state} ${this._zipCode}`;
	}
}
