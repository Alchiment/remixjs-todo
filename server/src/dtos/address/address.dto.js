export class AddressModel {
    constructor(address = {}) {
        this.address = address.address || '';
        this.city = address.city || '';
        this.department = address.department || '';
        this.country = address.country || 'Colombia';
        this.zipCode = address.zipCode || '';
    }
}