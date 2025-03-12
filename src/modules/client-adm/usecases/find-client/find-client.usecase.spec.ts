import { describe, it, expect, vi } from "vitest";
import { Client } from "../../domain/entities/client/client.entity";
import { Address, Email } from "../../../@shared/domain/value-objects";
import { FindClientUseCase } from "./find-client.usecase";

const client = new Client({
	name: "John Doe",
	email: new Email("john.doe@example.com"),
	address: new Address("Street", "City", "State", "Zip"),
});

const MockRepository = () => ({
	add: vi.fn(),
	find: vi.fn().mockReturnValue(Promise.resolve(client)),
});

describe("Find client use case unit test", () => {
	it("Should return a client", async () => {
		const clientRepository = MockRepository();

		const useCase = new FindClientUseCase(clientRepository);

		const input = { clientId: "32ce4fb2-bedd-4191-911f-ae9d781527d1" };

		const output = await useCase.execute(input);

		expect(output.id).toBeDefined();
		expect(output.name).toBe("John Doe");
		expect(output.email).toBe("john.doe@example.com");
		expect(output.address.street).toBe("Street");
		expect(output.address.city).toBe("City");
		expect(output.address.state).toBe("State");
		expect(output.address.zipCode).toBe("Zip");
	});
});
