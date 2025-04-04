import express, { Request, Response } from "express";

import { CheckoutFacadeFactory } from "../../../modules/checkout/factory/facade.factory";
import { PlaceOrderFacadeInputDTO } from "../../../modules/checkout/facade/checkout.facade.interface";

export const checkoutRoute = express.Router();

checkoutRoute.post(
	"/checkout",
	async (request: Request, response: Response) => {
		const checkoutFacade = CheckoutFacadeFactory.create();
		const payload = request.body;

		const input: PlaceOrderFacadeInputDTO = {
			clientId: payload.clientId,
			products: payload.products,
		};

		try {
			const output = await checkoutFacade.placeOrder(input);

			response.status(201).json(output);
		} catch (err) {
			const error = err as Error;

			response.status(400).json({ error: error.message });
		}
	}
);
