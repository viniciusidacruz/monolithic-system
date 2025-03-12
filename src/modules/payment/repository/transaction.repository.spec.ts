import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { TransactionModel } from "./transaction.model";
import { TransactionRepository } from "./transaction.repository";
import { Transaction } from "../domain/entities/transaction/transaction.entity";
import { Id } from "../../@shared/domain/value-objects";

describe("Transaction repository test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize("database", "username", "password", {
			dialect: "sqlite",
			logging: false,
			storage: ":memory:",
			sync: { force: true },
		});

		sequelize.addModels([TransactionModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("Should save a transaction", async () => {
		const transaction = new Transaction({
			id: new Id("123"),
			amount: 100,
			orderId: "1",
		});

		transaction.approve();

		const transactionRepository = new TransactionRepository();

		const output = await transactionRepository.save(transaction);

		expect(output.id).toBe(transaction.id);
		expect(output.amount).toBe(transaction.amount);
		expect(output.orderId).toBe(transaction.orderId);
		expect(output.status).toBe("approved");
	});
});
