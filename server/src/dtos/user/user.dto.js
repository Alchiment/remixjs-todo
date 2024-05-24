import {AddressDto} from "../address/address.dto.js";

export class UserDto {
    constructor(user = {}) {
        this._id = user._id || '';
        this.firstName = user.firstName || '';
        this.lastName = user.lastName || '';
        this.email = user.email || '';
        this.identification = user.identification || '';
        this.identification_type = user.identification_type || 'CC';
        this.type = user.type || 'client';
        this.mobile = user.mobile || '';
        this.address = new AddressDto(user.address) || new AddressDto();
        this.password = user.password || '';
    }

    mapToSave() {
        return {
            _id: 'toString' in this._id ? this._id.toString() : this._id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            identification: this.identification,
            identification_type: this.identification_type,
            type: this.type,
            mobile: this.mobile,
            address: this.address.mapToSave()
        };
    }
}