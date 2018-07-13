import { Iuser } from 'app/user/user-interface';
import { IDocumentInterface } from '../shared-modules/document-upload/document-interface';
import { ICommentInterface } from '../shared-modules/comments-view/comments-view/comment-interface';
import { ISarAllocation } from './sar-allocation-interface';
export interface ISarInterface {

    CaseId?:String;
    SuspiciousActivityReportDetails:Iuser;
    SarAllocation:ISarAllocation;
    UpLoadedDocuments:Array<IDocumentInterface>;
    Notes:Array<ICommentInterface>;
    IsEdit:boolean;

}
