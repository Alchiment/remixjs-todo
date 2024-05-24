export class AddressDto {
    constructor(address = {}) {
        this.address = address.address || '';
        this.city = address.city || '';
        this.department = address.department || '';
        this.country = address.country || 'Colombia';
        this.zipCode = address.zipCode || '';
    }

    mapToSave() {
        return {
            address: this.address,
            city: this.city,
            department: this.department,
            country: this.country,
            zipCode: this.zipCode
        };
    }
}