import { ISearch } from 'app/search/search-interface';

export class SearchClass implements ISearch {
  CaseId: string;
  Sid: string;
  FirstName: string;
  LastName: string;
  CaseRefNo: string;
  DateCreated: string;
  FormTypeId: string;
  TrackId: string;
  MasterStatus: string;
  ActiveStatus: string;
  IsActive: string;
  CustomsExciseCode: string;
  CompanyRegNo: string;
  TradingName: string;
  IncomeTaxNo: string;
  VATNo: string;
  constructor() {}
}
