import { IDocumentInterface } from '../shared-modules/document-upload/document-interface';
import { IVddlallocationInterface } from './vddlallocation-interface';
import { IVddldetailsInterface } from './vddldetails-interface';
export interface IVddl {

    VddlDetails:IVddldetailsInterface;
    VddlAllocation?:IVddlallocationInterface;
    UploadedFiles?:Array<IDocumentInterface>;
    IsEdit: boolean;
    AuditType : string;
}