import { Address, Email, Id } from "../../../../@shared/domain/value-objects";

interface ClientProps {
	id?: Id;
	name: string;
	email: Email;
	address: Address;
}
