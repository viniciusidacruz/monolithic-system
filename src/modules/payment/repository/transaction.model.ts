import {
	Column,
	Model,
	PrimaryKey,
	Table,
	DataType,
} from "sequelize-typescript";

@Table({
	tableName: "transactions",
	timestamps: false,
})
export class TransactionModel extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, allowNull: false })
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare orderId: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare status: string;

	@Column({ type: DataType.NUMBER, allowNull: false })
	declare amount: number;

	@Column({ type: DataType.DATE, allowNull: false })
	declare createdAt: Date;

	@Column({ type: DataType.DATE, allowNull: false })
	declare updatedAt: Date;
}
