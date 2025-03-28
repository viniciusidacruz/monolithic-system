export interface AddClientUseCaseInputDTO {
	id?: string;
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
}

export interface AddClientUseCaseOutputDTO {
	id: string;
	name: string;
	email: string;
	document: string;
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
	};
	createdAt: Date;
	updatedAt: Date;
}
