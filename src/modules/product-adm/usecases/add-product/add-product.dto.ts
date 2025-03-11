export interface AddProductUseCaseInputDTO {
	id?: string;
	name: string;
	description: string;
	purchasePrice: number;
	stock: number;
}

export interface AddProductUseCaseOutputDTO {
	id: string;
	name: string;
	description: string;
	purchasePrice: number;
	stock: number;
}

