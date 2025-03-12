import { describe, expect, it } from "vitest";
import { Id } from "./id.value-object";

describe("Id unit tests", () => {
	it("Should generate a unique ID", () => {
		const id1 = new Id();
		const id2 = new Id();

		expect(id1.id).not.toBe(id2.id);
	});

	it("Should return the ID as a string", () => {
		const id = new Id("1234567890");

		expect(id.id).toBe("1234567890");
	});
});
