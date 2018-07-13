export interface IDocumentInterface {

    UploadedId: String;
    CaseId: String;
    ObjectId: String;
    FileName: String;
    FileSize: String;
    DocumentumDate: String;
    DateCreated: String;
    AuditPlanId:String;
    UploadedBy:String;
    DocumentType:String;
    // NOTE: Class extended by string field that contains the document body from the consumer that is encoded into Base64
    DocumentContent: String;
    IsApproved:boolean;
}
