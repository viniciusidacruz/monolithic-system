export interface AddClientUseCaseInputDTO {
	id?: string;
	name: string;
	email: string;
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
	};
}

export interface AddClientUseCaseOutputDTO {
	id: string;
	name: string;
	email: string;
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
	};
}
