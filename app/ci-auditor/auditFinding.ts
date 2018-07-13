export class AuditFindingsResult {
    AuditorFindings : Audit_CIAuditorFindings = new Audit_CIAuditorFindings();
    FindingsAddress: Audit_FindingsAddress = new Audit_FindingsAddress();
    ContraventionOffenceDetails: Array<Audit_ContraventionOffenceDetails> = [];
    DutyVatDetails: Array<Audit_DutyVatDetails> = [];
}


export class Audit_CIAuditorFindings {

    AuditorFindingsId: string;
    AuditPlanId: string;
    ClientTypeId: string;
    Sid: string;
    ClientComments: string;
    Findings: string;
    AuditPeriod: string;
    GoodsDealtsWith: boolean;
    AmountDaystoContact: number;
    TotalB: number;
    TotalVatDuty: number;

}

export class Audit_FindingsAddress {
    AddressDetailsId: string;
    ClientName:string ;    
    AddressLine1: string;
    AddressLine2: string;
    AddressLine3: string;
    AddressLine4: string;
    AuditPlanId: string;
    RegisteredName: string;
    PostalCode: string;
}

export class Audit_ContraventionOffenceDetails {
    OffenceDetailsId: string;
    SectionRuleContravened: string;
    Circumstance: string;
    Offence: string;
    AuditPlanId: string;
    IsRemoved:Boolean = false;
}

export class Audit_DutyVatDetails {
    DutyVatDetailsId: string;
    DeclarationNumber: string;
    LineNumber: string;
    TypeOfDutyTaxUnderPaid: string;
    Amount: string;
    AuditPlanId: string;
    IsRemoved:Boolean;
}