export interface FindProductUseCaseInputDTO {
	productId: string;
}

export interface FindProductUseCaseOutputDTO {
	id: string;
	name: string;
	description: string;
	salesPrice: number;
}
