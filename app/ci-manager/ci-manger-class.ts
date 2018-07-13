import { ICiManagerInterface } from './ci-manager-interface';
import { IVddlallocationInterface } from '../client-interface/vddlallocation-interface';

import { IDocumentInterface } from '../shared-modules/document-upload/document-interface';
import { IVddldetailsInterface } from '../client-interface/vddldetails-interface';
import { VddldetailsClass } from '../client-interface/vddldetails-class';
import { VddlallocationClass } from '../client-interface/vddlallocation-class';
export class CiMangerClass implements ICiManagerInterface {

    VddlDetails: VddldetailsClass = new VddldetailsClass();
    VddlAllocation?: VddlallocationClass = new VddlallocationClass();
    UploadedFiles?: Array<IDocumentInterface> = [];
    IsEdit: boolean;
    AuditType : string;

}
