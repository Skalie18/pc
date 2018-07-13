
export interface IAuditRequiredLKP {
    AuditRequiredId: string;
    Description: string;
    IsActive: boolean;
    DateCreated: string;
}

export interface ITypeOfAuditLKP {
    TypeOfAuditId: string;
    Description: string;
    IsActive: boolean;
    DateCreated: string;
}

export interface IVddlLKP {
    VDDLQuestionId: string;
    Description: string;
    IsActive: boolean;
    DateCreated: string;
}

export interface ILKPClientName {
    ClientNameId : string;
    Description: string;
    IsActive : Boolean;
    DateCreated: string;
}

export class LKPCountryCodes {
    CountryCodeId: string;
    CountryName: string;
    CountryCode:string;
    DateCreated:string;
    IsActive:boolean;
}

export class LKPProvince {
    ProvinceId:string;
    Description:string;
    IsActive:boolean;
    DateCreated:string;

}