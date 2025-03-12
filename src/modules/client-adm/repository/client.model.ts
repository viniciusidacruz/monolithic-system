import {
	Column,
	Model,
	PrimaryKey,
	Table,
	DataType,
} from "sequelize-typescript";

@Table({
	tableName: "clients",
	timestamps: false,
})
export class ClientModel extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, allowNull: false })
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare name: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare email: string;

	@Column({ type: DataType.JSON, allowNull: false })
	declare address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		number: string;
		complement: string;
	};
}
