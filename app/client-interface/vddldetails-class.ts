import { IVddldetailsInterface } from './vddldetails-interface';
export class VddldetailsClass implements IVddldetailsInterface{
    DateCreated ?:Date;
    CaseId?:String;
    VDDLId:String;
    CustomsExciseCode:String;  // To be a number
    CompanyRegisteredNumber:String;
    TradingName:String;
    IncomeTax?:number;
    VATNumber?:number;
    TotalAmountDue?: number;
    TotalAmountInvolved?: number;
    DutyAmount?: number;
    VATAmount?: number;
    Interest?: number;
    Instructions:String;
    OriginofCaseId:String;
    isAllocationPulled: boolean;
    PulledBy:String;
    CustomsExciseId:String;
    CaseRefNo:String;
    Sid:String;
    RegionId:String;
    StatusId:String;
    EntriesInvolved : string;
    AuditFindings:string;
}
