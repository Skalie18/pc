export class ReportCriteriaDisplay {
    StartDate: string;
    EndDate: string;

    StatusVisible: boolean = false;
    StatusValue: string;

    ReportVisible: boolean = false;
    ReportValue: string;

    RegionVisible: boolean = false;
    RegionValue: string;
}

export class ReportFilter {
    FilterID: string;
    FilterName: string;
    Value: string;
    FilterType: string; 
    Visible: boolean;
}

export class ColumnInfo {
    FieldName: string;
    FieldType: string;
}

export class PCA_Report {
    ID: string;
    Name: string;
    AccessRole: string;
    ProcName: string;
    DateCreated: string;
    Alias: string;
}

export class ReportResult {
    Report: PCA_Report;
    Filters: ReportFilter[] ;
}