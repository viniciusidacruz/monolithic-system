import { describe, expect, it } from "vitest";
import { Email } from "./email.value-object";

describe("Email unit tests", () => {
	describe("Error ❌", () => {
		it("Should throw error when email is invalid", () => {
			expect(() => {
				new Email("invalid@email");
			}).toThrow("Invalid email format");
		});

		it("Should throw error when email is empty", () => {
			expect(() => {
				new Email("");
			}).toThrow("Invalid email format");
		});

		it("Should throw error when email contains spaces", () => {
			expect(() => {
				new Email("example example@example.com");
			}).toThrow("Invalid email format");
		});
	});

	describe("Success ✅", () => {
		it("Should create valid email", () => {
			const email = new Email("example@example.com");

			expect(email.toString()).toBe("example@example.com");
		});
	});
});
