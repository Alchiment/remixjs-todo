import {AddressModel} from "../address/address.dto.js";

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
        this.address = new AddressModel(user.address) || new AddressModel();
        this.password = user.password || '';
    }
}