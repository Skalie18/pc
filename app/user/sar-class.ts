import { IDocumentInterface } from '../shared-modules/document-upload/document-interface';
import { ICommentInterface } from '../shared-modules/comments-view/comments-view/comment-interface';
import { UserClass } from './user-class';
import { SarAllocationClass } from './sar-allocation-class';
export class SarClass {
    CaseId?:String;
    SuspiciousActivityReportDetails:UserClass = new UserClass();
    SarAllocation:SarAllocationClass = new SarAllocationClass();
    UploadedFiles:Array<IDocumentInterface> =[];
    CaseNotes:Array<ICommentInterface> = [];
    IsEdit:boolean;
    Stage:any;
}
