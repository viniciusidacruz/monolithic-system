import {
	Column,
	Model,
	PrimaryKey,
	Table,
	DataType,
	ForeignKey,
} from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
	tableName: "invoice-items",
	timestamps: false,
})
export class InvoiceItemModel extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, allowNull: false })
	declare id: string;

	@ForeignKey(() => InvoiceModel)
	@Column({ type: DataType.STRING, allowNull: false })
	declare invoiceId: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare name: string;

	@Column({ type: DataType.NUMBER, allowNull: false })
	declare price: number;
}
