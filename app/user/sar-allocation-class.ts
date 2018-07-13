import { ISarAllocation } from "./sar-allocation-interface";

export class SarAllocationClass implements ISarAllocation {
    SARAllocationId: String;
    AllocatorSid: String;
    AllocateeSid: String;
    DateCreated: String;
    CaseId?: String;
    UpdatdBy: String;
    DateUpdated?: String;
    IsCurrent: boolean;
    AllocatedTo: String;
}
