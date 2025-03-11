export interface FindAllProductsUseCaseOutputDTO {
	products: {
		id: string;
		name: string;
		description: string;
		salesPrice: number;
	}[];
}
