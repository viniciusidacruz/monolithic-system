import { describe, it, expect } from "vitest";

import { Client } from "./client.entity";
import { Address, Email } from "../../../../@shared/domain/value-objects";

describe("Client entity", () => {
	describe("Error ❌", () => {
		it("Should throw error when name is empty", () => {
			expect(() => {
				new Client({
					name: "",
					email: new Email("example@example.com"),
					address: new Address("Street", "City", "State", "Zip", "1", "Casa"),
				});
			}).toThrow("Name is required");
		});
	});

	describe("Success ✅", () => {
		it("Should create valid client", () => {
			const client = new Client({
				name: "John Doe",
				email: new Email("example@example.com"),
				address: new Address("Street", "City", "State", "Zip", "1", "Casa"),
			});
			expect(client.name).toBe("John Doe");
			expect(client.email.toString()).toBe("example@example.com");
			expect(client.address).toBeInstanceOf(Address);
			expect(client.address.city).toBe("City");
			expect(client.address.state).toBe("State");
			expect(client.address.zipCode).toBe("Zip");
		});

		it("Should update email", () => {
			const client = new Client({
				name: "John Doe",
				email: new Email("example@example.com"),
				address: new Address("Street", "City", "State", "Zip", "1", "Casa"),
			});
			client.updateEmail(new Email("john.doe@example.com"));
			expect(client.email.toString()).toBe("john.doe@example.com");
		});

		it("Should change address", () => {
			const client = new Client({
				name: "John Doe",
				email: new Email("example@example.com"),
				address: new Address("Street", "City", "State", "Zip", "1", "Casa"),
			});

			const newAddress = new Address(
				"New Street",
				"New City",
				"New State",
				"New Zip",
				"2",
				"New Casa"
			);

			client.changeAddress(newAddress);

			expect(client.address).toBeInstanceOf(Address);
			expect(client.address.street).toBe("New Street");
			expect(client.address.city).toBe("New City");
			expect(client.address.state).toBe("New State");
			expect(client.address.zipCode).toBe("New Zip");
		});

		it("Should validate fields", () => {
			const client = new Client({
				name: "John Doe",
				email: new Email("example@example.com"),
				address: new Address("Street", "City", "State", "Zip", "1", "Casa"),
			});
			expect(() => client.validateFields()).not.toThrow();
		});
	});
});
