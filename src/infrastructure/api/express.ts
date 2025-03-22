import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { TransactionModel } from "../../modules/payment/repository/transaction.model";
import { InvoiceItemModel } from "../../modules/invoice/repository/invoice-item.model";
import { ProductModel as ProductStoreCatalog } from "../../modules/store-catalog/repository/product.model";

export const app: Express = express();
app.use(express.json());

export let sequelize: Sequelize;

async function setupDb() {
	sequelize = new Sequelize("database", "username", "password", {
		dialect: "sqlite",
		storage: "./db.sqlite",
		sync: { force: true },
		logging: false,
	});

	sequelize.addModels([
		ClientModel,
		ProductModel,
		InvoiceModel,
		InvoiceItemModel,
		TransactionModel,
		ProductStoreCatalog,
	]);

	await sequelize.sync();
	console.log("Database connected successfully");
}

setupDb();
