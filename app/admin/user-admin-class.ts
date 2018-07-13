import { IUserAdminInterface } from "app/admin/user-admin-interface";

export class UserAdminClass implements IUserAdminInterface {

    Id: string;
    SID: string;
    FirstName: string;
    LastName: string;
    Timestamp:string;
    Telephone: string;
    EmailAddress: string;
    ManagerSID: string;
    HasSubordinates: boolean;
    RegionId: string;
    Role: string;
}
