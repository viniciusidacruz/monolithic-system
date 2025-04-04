import {
	Column,
	Model,
	PrimaryKey,
	Table,
	DataType,
	ForeignKey,
} from "sequelize-typescript";
import { OrderModel } from "./order.model";

@Table({
	tableName: "order_products",
	timestamps: false,
})
export class OrderProductModel extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, allowNull: false })
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare name: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare description: string;

	@Column({ type: DataType.FLOAT, allowNull: false })
	declare salesPrice: number;

	@ForeignKey(() => OrderModel)
	@Column({ type: DataType.STRING, allowNull: false })
	declare orderId: string;
}
