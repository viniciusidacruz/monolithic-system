import { Id } from "../../../../@shared/domain/value-objects";

export type Status = "pending" | "approved" | "declined";

export interface TransactionProps {
	id?: Id;
	amount: number;
	orderId: string;
	status?: Status;
	createdAt?: Date;
	updatedAt?: Date;
}
