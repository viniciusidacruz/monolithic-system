import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

@Table({
	tableName: "products",
	timestamps: false,
})
export class ProductModel extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, allowNull: false })
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare name: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare description: string;

	@Column({ type: DataType.FLOAT, allowNull: false })
	declare salesPrice: number;
}
