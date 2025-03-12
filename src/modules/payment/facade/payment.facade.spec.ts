import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { TransactionModel } from "../repository/transaction.model";
import { PaymentFacadeFactory } from "../factory/facade.factory";

describe("Payment Facade test", () => {
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

	it("Should create a payment", async () => {
		const repository = PaymentFacadeFactory.create();

		const input = {
			orderId: "order-1",
			amount: 100,
		};

		const output = await repository.process(input);

		expect(output.transactionId).toBeDefined();
		expect(output.orderId).toBe(input.orderId);
		expect(output.amount).toBe(input.amount);
		expect(output.status).toBe("approved");
	});
});
