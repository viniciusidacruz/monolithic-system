import { describe, it, expect } from "vitest";

import { Transaction } from "./transaction.entity";

describe("Transaction entity", () => {
	describe("Error ❌", () => {
		it("Should throw error when amount is zero", () => {
			expect(() => {
				new Transaction({ amount: 0, orderId: "123", status: "pending" });
			}).toThrow("Amount must be greater than zero");
		});

		it("Should throw error when order ID is empty", () => {
			expect(() => {
				new Transaction({ amount: 100, orderId: "", status: "pending" });
			}).toThrow("Order ID is required");
		});
	});

	describe("Success ✅", () => {
		it("Should create valid transaction", () => {
			const transaction = new Transaction({
				amount: 100,
				orderId: "123",
				status: "pending",
			});
			expect(transaction.amount).toBe(100);
			expect(transaction.orderId).toBe("123");
			expect(transaction.status).toBe("pending");
		});

		it("Should approve transaction", () => {
			const transaction = new Transaction({
				amount: 100,
				orderId: "123",
				status: "pending",
			});
			transaction.approve();
			expect(transaction.status).toBe("approved");
		});

		it("Should decline transaction", () => {
			const transaction = new Transaction({
				amount: 100,
				orderId: "123",
				status: "pending",
			});
			transaction.decline();
			expect(transaction.status).toBe("declined");
		});

		it("Should process transaction approved", () => {
			const transaction = new Transaction({
				amount: 100,
				orderId: "123",
				status: "pending",
			});
			transaction.process();
			expect(transaction.status).toBe("approved");
		});

		it("Should process transaction approved", () => {
			const transaction = new Transaction({
				amount: 50,
				orderId: "123",
				status: "pending",
			});
			transaction.process();
			expect(transaction.status).toBe("declined");
		});
	});
});
