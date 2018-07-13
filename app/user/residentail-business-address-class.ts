import { IResidentailBusinessAddressInterface } from "app/user/residentail-business-address-interface";
import { LKPCountryCodes } from "../lookUp/lookup-interfaces";

export class ResidentailBusinessAddressClass implements IResidentailBusinessAddressInterface {
    UnitNumber: String;
    Complex: String;
    StreetNumber: String;
    StreetName: String;
    SuburbDistrict: String;
    CityTown: String;
    CountryCodeObject : LKPCountryCodes = new LKPCountryCodes();
    CountryCode: String = this.CountryCodeObject.CountryCode;
    PostalCode: String;
    AddressId?: String;
    CaseId?: String;
    ProvinceId: String;
    DateCreated?: Date;
    IsRemoved: boolean;
}

