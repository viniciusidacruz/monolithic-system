import { Address, Email, Id } from "../../../../@shared/domain/value-objects";

interface ClientProps {
	id?: Id;
	name: string;
	document: string;
	email: Email;
	address: Address;
}
