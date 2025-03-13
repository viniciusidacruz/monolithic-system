export interface AddClientFacadeInputDTO {
	id?: string;
	name: string;
	email: string;
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		number: string;
		complement: string;
	};
}

export interface FindClientFacadeInputDTO {
	clientId: string;
}

export interface FindClientFacadeOutputDTO {
	id: string;
	name: string;
	email: string;
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		number: string;
		complement: string;
	};
}

export interface ClientAdmFacadeInterface {
	addClient(input: AddClientFacadeInputDTO): Promise<void>;
	findClient(
		input: FindClientFacadeInputDTO
	): Promise<FindClientFacadeOutputDTO>;
}
