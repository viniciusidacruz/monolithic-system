export interface FindClientUseCaseInputDTO {
	clientId: string;
}

export interface FindClientUseCaseOutputDTO {
	id: string;
	name: string;
	email: string;
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
	};
	createdAt: Date;
	updatedAt: Date;
}
