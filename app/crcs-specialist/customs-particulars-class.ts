import { ICustomsRASParticularsInterface } from "app/crcs-specialist/customs-particulars-interface";

export class CustomsRASParticularsClass implements ICustomsRASParticularsInterface{

    CustomsRASId: String;
    IBRCustumsNbr: string;
    Address: String;
    Status: String;
    DateActiveInActive: String;
    RegistrationType: String;
    DateCreated: String;
}
