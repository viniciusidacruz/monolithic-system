import express, { Request, Response } from "express";

import { ClientAdmFacadeFactory } from "../../../modules/client-adm/factory/facade.factory";
import { AddClientFacadeInputDTO } from "../../../modules/client-adm/facade/client-adm.facade.interface";

export const clientRoute = express.Router();

clientRoute.post("/clients", async (request: Request, response: Response) => {
	const clientAdmFacade = ClientAdmFacadeFactory.create();
	const payload = request.body;

	const input: AddClientFacadeInputDTO = {
		address: {
			city: payload.address.city,
			complement: payload.address.complement,
			number: payload.address.number,
			state: payload.address.state,
			street: payload.address.street,
			zipCode: payload.address.zipCode,
		},
		document: payload.document,
		email: payload.email,
		name: payload.name,
	};

	try {
		await clientAdmFacade.addClient(input);

		response.status(201).json({ message: "Client created successfully" });
	} catch (err) {
		const error = err as Error;

		response.status(400).json({ error: error.message });
	}
});
