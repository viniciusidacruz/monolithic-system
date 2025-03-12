import { describe, it, expect, vi } from "vitest";
import { AddClientUseCase } from "./add-client.usecase";

const MockRepository = () => ({
	add: vi.fn(),
	find: vi.fn(),
});

describe("Add Client usecase unit test", () => {
	it("should add a new client", async () => {
		const clientRepository = MockRepository();
		const useCase = new AddClientUseCase(clientRepository);

		const input = {
			name: "John Doe",
			email: "jdoe@example.com",
			address: {
				street: "123 Main St",
				city: "Anytown",
				state: "CA",
				zipCode: "12345",
			},
		};

		const output = await useCase.execute(input);

		expect(clientRepository.add).toHaveBeenCalled();
		expect(output.id).toBeDefined();
		expect(output.name).toBe(input.name);
		expect(output.email).toBe(input.email);
		expect(output.address.street).toEqual(input.address.street);
		expect(output.address.city).toEqual(input.address.city);
		expect(output.address.state).toEqual(input.address.state);
		expect(output.address.zipCode).toEqual(input.address.zipCode);
	});
});
