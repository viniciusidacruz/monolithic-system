import {
	Column,
	Model,
	PrimaryKey,
	Table,
	DataType,
	HasMany,
} from "sequelize-typescript";
import { InvoiceItemModel } from "./invoice-item.model";

@Table({
	tableName: "invoices",
	timestamps: false,
})
export class InvoiceModel extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, allowNull: false })
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare name: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare document: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare street: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare number: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare complement: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare city: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare state: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare zipCode: string;

	@HasMany(() => InvoiceItemModel, { onDelete: "CASCADE" })
	declare items: InvoiceItemModel[];
}
