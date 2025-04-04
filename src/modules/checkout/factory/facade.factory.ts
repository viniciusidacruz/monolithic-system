import { ClientAdmFacadeFactory } from "../../client-adm/factory/facade.factory";
import { InvoiceFacadeFactory } from "../../invoice/factory/facade.factory";
import { PaymentFacadeFactory } from "../../payment/factory/facade.factory";
import { ProductADMFacadeFactory } from "../../product-adm/factory/facade.factory";
import { StoreCatalogFacadeFactory } from "../../store-catalog/factory/facade.factory";
import { CheckoutFacade } from "../facade/checkout.facade";
import { CheckoutRepository } from "../repository/checkout.repository";
import { PlaceOrderUseCase } from "../usecases/place-order/place-order.usecase";

export class CheckoutFacadeFactory {
	static create() {
		const clientFacade = ClientAdmFacadeFactory.create();
		const productFacade = ProductADMFacadeFactory.create();
		const catalogFacade = StoreCatalogFacadeFactory.create();
		const paymentFacade = PaymentFacadeFactory.create();
		const invoiceFacade = InvoiceFacadeFactory.create();
		const checkoutRepository = new CheckoutRepository();

		const placeOrderUseCase = new PlaceOrderUseCase(
			clientFacade,
			productFacade,
			catalogFacade,
			checkoutRepository,
			invoiceFacade,
			paymentFacade
		);

		return new CheckoutFacade(placeOrderUseCase);
	}
}

