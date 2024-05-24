export interface AddressInterface {
    address: string;
    city: string;
    department: string;
    country: string;
    zipCode: string;
}

export class AddressModel implements AddressInterface {
    address: string;
    city: string;
    department: string;
    country: string;
    zipCode: string;

    constructor(address?: AddressInterface) {
        this.address = address?.address || '';
        this.city = address?.city || '';
        this.department = address?.department || '';
        this.country = address?.country || 'Colombia';
        this.zipCode = address?.zipCode || '';
    }
}