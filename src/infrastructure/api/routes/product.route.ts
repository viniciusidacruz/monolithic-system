import express, { Request, Response } from "express";

import { ProductADMFacadeFactory } from "../../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDTO } from "../../../modules/product-adm/facade/product-adm.facade.interface";

export const productRoute = express.Router();

productRoute.post(
	"/product/create",
	async (request: Request, response: Response) => {
		const productFacade = ProductADMFacadeFactory.create();
		const payload = request.body;

		const input: AddProductFacadeInputDTO = {
			description: payload.description,
			name: payload.name,
			purchasePrice: payload.purchasePrice,
			stock: payload.stock,
		};

		try {
			await productFacade.addProduct(input);

			response.status(201).json({ message: "Product created successfully" });
		} catch (err) {
			const error = err as Error;
			console.error("Erro na requisição:", error.message);

			response.status(400).json({ error: error.message });
		}
	}
);
