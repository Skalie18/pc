import { ISystemUserInterface } from './system-user-interface';
export class SystemUserClass  implements ISystemUserInterface{
    
    Id: number;
    SID: String ;
    FirstName:String ;
    LastName: String ;
    Timestamp: String ;
    Telephone: String ;
    EmailAddress:String ;
    ManagerSID: String ;
    HasSubordinates: boolean;
    RegionId: String ;
    Role: String;
    RegionName:String;
}
