import { Iuser } from './user-interface';
import { CaseDetailsClass } from 'app/user/case-details-class';
import { ReportingPersonClass } from 'app/user/reporting-person-class';
import { IRefDetailsInterface } from 'app/user/ref-details-interface';
import { ReportedPersonClass } from 'app/user/reported-person-class';
import { IEntityDetailsInterface } from './entity-details-interface';
import { IResidentailBusinessAddressInterface } from './residentail-business-address-interface';
import { INoncomplianceDetailsInterface } from './noncompliance-details-interface';
import { IReportedPersonInterface } from 'app/user/reported-person-interface';
import { ICommentInterface } from '../shared-modules/comments-view/comments-view/comment-interface';
import { IDocumentInterface } from '../shared-modules/document-upload/document-interface';
export class UserClass  implements Iuser {

    CaseDetails:CaseDetailsClass = new CaseDetailsClass(); 
    SarsRefDetails:Array<IRefDetailsInterface> = [];
    ReportedPersonDetails:Array<IReportedPersonInterface> =[];
    EntityTypeDetails:Array<IEntityDetailsInterface> = [];
    ResidentialBusinessAddress:Array<IResidentailBusinessAddressInterface>  = [];
    NonComplianceDetails:Array<INoncomplianceDetailsInterface> = [];
    PersonReportingDetails?:ReportingPersonClass = new ReportingPersonClass();
 
}
