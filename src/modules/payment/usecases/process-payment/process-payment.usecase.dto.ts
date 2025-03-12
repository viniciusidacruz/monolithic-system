export interface ProcessPaymentUseCaseInputDTO {
	amount: number;
	orderId: string;
}

export interface ProcessPaymentUseCaseOutputDTO {
	transactionId: string;
	status: string;
	amount: number;
	orderId: string;
	createdAt: Date;
	updatedAt: Date;
}
