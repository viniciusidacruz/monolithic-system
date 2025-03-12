export interface PaymentFacadeInputDTO {
	amount: number;
	orderId: string;
}

export interface PaymentFacadeOutputDTO {
	transactionId: string;
	orderId: string;
	status: string;
	amount: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface PaymentFacadeInterface {
	process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO>;
}
