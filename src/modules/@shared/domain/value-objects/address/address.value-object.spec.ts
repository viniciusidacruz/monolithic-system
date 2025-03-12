import { describe, expect, it } from "vitest";
import { Address } from "./address.value-object";

describe("Address unit tests", () => {
	describe("Error ❌", () => {
		it("Should throw error when street is empty", () => {
			expect(() => {
				new Address(
					"",
					"Ribeirão Pires",
					"São Paulo",
					"09421-540",
					"1",
					"Casa"
				);
			}).toThrow("Street is required");
		});

		it("Should throw error when city is empty", () => {
			expect(() => {
				new Address(
					"Av. Papa João XXIII",
					"",
					"São Paulo",
					"09421-540",
					"1",
					"Casa"
				);
			}).toThrow("City is required");
		});

		it("Should throw error when state is empty", () => {
			expect(() => {
				new Address(
					"Av. Papa João XXIII",
					"Ribeirão Pires",
					"",
					"09421-540",
					"1",
					"Casa"
				);
			}).toThrow("State is required");
		});

		it("Should throw error when zip code is empty", () => {
			expect(() => {
				new Address(
					"Av. Papa João XXIII",
					"Ribeirão Pires",
					"São Paulo",
					"",
					"1",
					"Casa"
				);
			}).toThrow("Zip code is required");
		});
	});

	describe("Success ✅", () => {
		it("Should create valid address", () => {
			const address = new Address(
				"Av. Papa João XXIII",
				"Ribeirão Pires",
				"São Paulo",
				"09421-540",
				"1",
				"Casa"
			);

			expect(address.toString()).toBe(
				"Av. Papa João XXIII - 1, Ribeirão Pires, São Paulo 09421-540 | Casa"
			);
		});

		it("Should validated", () => {
			const address = new Address(
				"Av. Papa João XXIII, 695",
				"Ribeirão Pires",
				"São Paulo",
				"09421-540",
				"1",
				"Casa"
			);

			expect(address.validate()).toBeTruthy();
		});
	});
});
