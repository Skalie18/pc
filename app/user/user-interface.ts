import { ICaseDetails } from 'app/user/case-details-interface';
import { IReportingPerson } from './reporting-person-interface';
import { IRefDetailsInterface } from './ref-details-interface';
import { IReportedPersonInterface } from 'app/user/reported-person-interface';
import { IEntityDetailsInterface } from './entity-details-interface';
import { IResidentailBusinessAddressInterface } from 'app/user/residentail-business-address-interface';
import { INoncomplianceDetailsInterface } from 'app/user/noncompliance-details-interface';
import { IDocumentInterface } from '../shared-modules/document-upload/document-interface';
import { ICommentInterface } from '../shared-modules/comments-view/comments-view/comment-interface';
// Sar Data Object
export interface Iuser {

    CaseDetails:ICaseDetails; 
    SarsRefDetails:Array<IRefDetailsInterface>;
    EntityTypeDetails:Array<IEntityDetailsInterface>;
    ReportedPersonDetails:Array<IReportedPersonInterface>;
    ResidentialBusinessAddress:Array<IResidentailBusinessAddressInterface>;
    NonComplianceDetails:Array<INoncomplianceDetailsInterface>;
    PersonReportingDetails?:IReportingPerson;

}
