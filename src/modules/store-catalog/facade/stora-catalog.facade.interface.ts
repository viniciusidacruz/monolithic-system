export interface FindProductByIdInput {
	id: string;
}

export interface FindProductByIdOutput {
	id: string;
	name: string;
	description: string;
	salesPrice: number;
}

export interface FindAllProductsOutputDTO {
	products: {
		id: string;
		name: string;
		description: string;
		salesPrice: number;
	}[];
}

export interface StoreCatalogFacadeInterface {
	findProductById(input: FindProductByIdInput): Promise<FindProductByIdOutput>;
	findAllProducts(): Promise<FindAllProductsOutputDTO>;
}
