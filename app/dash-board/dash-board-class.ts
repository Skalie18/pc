import { IDashboardInterface } from './dash-board-interface';

export class DashboardDataClass implements IDashboardInterface {
    CaseType: string;
    MasterStatus: string;
    CurrentStatus: string;
    AllocateeSid: string;
    CurrentSid: string;
    Cases: number;
}
