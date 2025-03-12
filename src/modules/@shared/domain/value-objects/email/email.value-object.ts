import { ValueObject } from "../value-object.interface";

export class Email implements ValueObject {
	private _email: string;

	constructor(email: string) {
		this._email = email;

		this.validateEmail();
	}

	validateEmail(): void {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!regex.test(this._email)) {
			throw new Error("Invalid email format");
		}
	}

	toString(): string {
		return this._email;
	}
}
