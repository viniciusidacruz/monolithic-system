export interface AddClientFacadeInputDTO {
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

export interface FindClientInputDTO {
	clientId: string;
}

export interface FindClientOutputDTO {
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

export interface ClientAdmFacadeInterface {
	addClient(input: AddClientFacadeInputDTO): Promise<void>;
	findClient(input: FindClientInputDTO): Promise<FindClientOutputDTO>;
}
