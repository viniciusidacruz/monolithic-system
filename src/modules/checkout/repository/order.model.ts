import {
	Model,
	Table,
	Column,
	HasMany,
	DataType,
	PrimaryKey,
} from "sequelize-typescript";
import { OrderProductModel } from "./order-product.model";

@Table({
	tableName: "orders",
	timestamps: true,
	createdAt: "createdAt",
	updatedAt: "updatedAt",
})
export class OrderModel extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, allowNull: false })
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare status: string;

	@Column({ type: DataType.FLOAT, allowNull: false })
	declare total: number;

	@Column({ type: DataType.DATE, allowNull: false })
	declare createdAt: Date;

	@Column({ type: DataType.DATE, allowNull: false })
	declare updatedAt: Date;

	@HasMany(() => OrderProductModel, { onDelete: "CASCADE" })
	declare products: OrderProductModel[];
}
