import { ISearchParams } from 'app/search/searchParams-interface';

export class SearchParamsClass implements ISearchParams {
    CaseRefNo: string;
    Sid: string;
    FormTypeId: string;
    CompanyRegNo: string;
    TradingName: string;
    CustomsExciseCode: string;
    DateFrom: string;
    DateTo: string;
    VATNo: string;
    IncomeTaxNo: string;
    Manager = false;

  constructor() {}
}
