import {AddressInterface, AddressModel} from "~/models/address.model";

export type IdentificationType = 'CC'|'CE'|'NIT'|'TI'|'TE'|'RC'|'FOREIGN_NIT'|'NUIP'|'PP'|'DIE';

export type ClientKindType = 'client'|'provider';

export interface UserInterface {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    identification: string;
    identification_type: IdentificationType;
    type: ClientKindType;
    mobile: string;
    address: AddressInterface;
    password: string;
}

export class UserModel implements UserInterface {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    identification: string;
    identification_type: IdentificationType;
    address: AddressInterface;
    type: ClientKindType;
    mobile: string;

    constructor(user?: UserInterface) {
        this._id = user?._id || '';
        this.firstName = user?.firstName || '';
        this.lastName = user?.lastName || '';
        this.email = user?.email || '';
        this.identification = user?.identification || '';
        this.identification_type = user?.identification_type || 'CC';
        this.type = user?.type || 'client';
        this.mobile = user?.mobile || '';
        this.address = new AddressModel(user?.address) || new AddressModel();
        this.password = user?.password || '';
    }
}
