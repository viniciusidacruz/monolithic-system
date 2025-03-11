export interface CheckStockUseCaseInputDTO {
	productId: string;
}

export interface CheckStockUseCaseOutputDTO {
	productId: string;
	stock: number;
}
