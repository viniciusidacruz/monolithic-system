import { describe, it, expect, vi } from "vitest";

import { ProcessPaymentUseCase } from "./process-payment.usecase";
import { Id } from "../../../@shared/domain/value-objects";
import { Transaction } from "../../domain/entities/transaction/transaction.entity";

const transaction = new Transaction({
	id: new Id("123"),
	amount: 100,
	orderId: "1",
});

const MockRepository = () => ({
	save: vi.fn().mockReturnValue(Promise.resolve(transaction)),
});

describe("Process Payment Use Case usecase unit test", () => {
	it("should save a transaction", async () => {
		const transactionRepository = MockRepository();

		const useCase = new ProcessPaymentUseCase(transactionRepository);

		const input = {
			amount: 100,
			orderId: "1",
		};

		const output = await useCase.execute(input);

		expect(output.amount).toBe(transaction.amount);
		expect(output.orderId).toBe(transaction.orderId);
		expect(output.status).toBe("approved");
		expect(transactionRepository.save).toHaveBeenCalledTimes(1);
		expect(output.createdAt).toBe(transaction.createdAt);
		expect(output.updatedAt).toBe(transaction.updatedAt);
	});
});
