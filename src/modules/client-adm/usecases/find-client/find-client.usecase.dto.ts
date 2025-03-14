export interface FindClientUseCaseInputDTO {
	clientId: string;
}

export interface FindClientUseCaseOutputDTO {
	id: string;
	name: string;
	email: string;
	document: string;
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		number: string;
		complement: string;
	};
	createdAt: Date;
	updatedAt: Date;
}
