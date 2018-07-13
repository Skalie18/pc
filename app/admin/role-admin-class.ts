import { IRoleAdminInterface } from "./role-admin-interface";

export class RoleAdminClass implements IRoleAdminInterface {
    RoleId: string;
    RoleName: string;
    RoleDescription: string;
    ParentRoleId: string;
    ParentRoleName :string;
}
