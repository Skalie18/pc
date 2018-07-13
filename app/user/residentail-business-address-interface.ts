import { LKPCountryCodes } from "../lookUp/lookup-interfaces";

export interface IResidentailBusinessAddressInterface {

    UnitNumber?: String;
    Complex: String;
    StreetNumber?: String;
    StreetName: String;
    SuburbDistrict: String;
    CityTown: String;
    CountryCode: String;
    PostalCode: String;
    AddressId?: String;
    CaseId?: String;
    ProvinceId: String;
    DateCreated?: Date;
    IsRemoved: boolean;
}
