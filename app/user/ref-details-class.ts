import { IRefDetailsInterface } from "app/user/ref-details-interface";

export class RefDetailsClass implements IRefDetailsInterface {

    CustomsExciseCode: String = "";
    CompanyNumber: String;
    IncomeTax: String;
    VAT: String;
    SarsRefId?: String;
    CaseId?: String;
    DateCreated?: Date;
    IsRemoved: boolean;
}
