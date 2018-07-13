import { IVddl } from "app/client-interface/vd-dl-interface";
import { IDocumentInterface } from '../shared-modules/document-upload/document-interface';
import { IVddlallocationInterface } from './vddlallocation-interface';
import { IVddldetailsInterface } from './vddldetails-interface';
import { VddldetailsClass } from './vddldetails-class';
import { VddlallocationClass } from "./vddlallocation-class";

export class VdDlClass implements IVddl {

   
    constructor( ){}
    VddlDetails:VddldetailsClass = new VddldetailsClass();
    VddlAllocation?:VddlallocationClass = new VddlallocationClass();
    UploadedFiles?:Array<IDocumentInterface> = [];
    IsEdit: boolean;
    AuditType : string;
}
