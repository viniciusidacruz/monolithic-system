import { BaseEntity } from "../../../../@shared/domain/entities/base.entity";
import { AggregateRoot } from "../../../../@shared/domain/entities/aggregate-root.interface";
import { Status, TransactionProps } from "./transaction.entity.d";

export class Transaction extends BaseEntity implements AggregateRoot {
	private _amount: number;
	private _orderId: string;
	private _status: Status;

	constructor(props: TransactionProps) {
		super(props.id);

		this._amount = props.amount;
		this._orderId = props.orderId;
		this._status = props.status || "pending";

		this.validateFields();
	}

	get amount(): number {
		return this._amount;
	}

	get orderId(): string {
		return this._orderId;
	}

	get status(): Status {
		return this._status;
	}

	approve(): void {
		this._status = "approved";
	}

	decline(): void {
		this._status = "declined";
	}

	process(): void {
		if (this._amount >= 100) {
			this.approve();
		} else {
			this.decline();
		}
	}

	validateFields(): void {
		if (this._amount <= 0) {
			throw new Error("Amount must be greater than zero");
		}

		if (!this._orderId) {
			throw new Error("Order ID is required");
		}
	}
}
