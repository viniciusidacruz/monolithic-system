import { Address, Email, Id } from "../../../@shared/domain/value-objects";
import { UseCaseInterface } from "../../../@shared/usecases/use-case.interface";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facade.interface";
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/stora-catalog.facade.interface";
import { Client } from "../../domain/entities/client/client.entity";
import { Order } from "../../domain/entities/order/order.entity";
import { Product } from "../../domain/entities/product/product.entity";
import {
	PlaceOrderUseCaseInputDTO,
	PlaceOrderUseCaseOutputDTO,
} from "./place-order.usecase.dto";

export class PlaceOrderUseCase
	implements
		UseCaseInterface<PlaceOrderUseCaseInputDTO, PlaceOrderUseCaseOutputDTO>
{
	constructor(
		private readonly _clientFacade: ClientAdmFacadeInterface,
		private readonly _productFacade: ProductAdmFacadeInterface,
		private readonly _catalogFacade: StoreCatalogFacadeInterface
	) {}

	async execute(
		input: PlaceOrderUseCaseInputDTO
	): Promise<PlaceOrderUseCaseOutputDTO> {
		const client = await this._clientFacade.findClient({
			clientId: input.clientId,
		});

		if (!client) {
			throw new Error(`Client not found.`);
		}

		await this.validateProducts(input);

		const products = await Promise.all(
			input.products.map(async (p) => this.getProduct(p.productId))
		);

		const myClient = new Client({
			id: new Id(client.id),
			name: client.name,
			email: new Email(client.email),
			address: new Address(
				client.address.street,
				client.address.city,
				client.address.state,
				client.address.zipCode,
				client.address.number,
				client.address.complement
			),
		});

		const order = new Order({
			client: myClient,
			products,
		});

		return {
			id: "",
			invoiceId: "",
			status: "",
			products: [],
			total: 0,
		};
	}

	private async validateProducts(
		input: PlaceOrderUseCaseInputDTO
	): Promise<void> {
		if (input.products.length === 0) {
			throw new Error("No products selected");
		}

		for (const p of input.products) {
			const product = await this._productFacade.checkStock({
				productId: p.productId,
			});

			if (product.stock <= 0) {
				throw new Error(
					`Product ${product.productId} is not available in stock.`
				);
			}
		}
	}

	private async getProduct(productId: string): Promise<Product> {
		const product = await this._catalogFacade.findProductById({
			id: productId,
		});

		if (!product) {
			throw new Error(`Product not found.`);
		}

		return new Product({
			id: new Id(product.id),
			name: product.name,
			description: product.description,
			salesPrice: product.salesPrice,
		});
	}
}
