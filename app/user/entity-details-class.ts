import { IEntityDetailsInterface } from "app/user/entity-details-interface";

export class EntityDetailsClass implements IEntityDetailsInterface {

    RegistrationName: String;
    TradingName: String;
    CompanyNumber: String;
    DateCreated?: Date;
    EntityTypeDetailsId: String;
    CaseId: String;
    IsRemoved: boolean;
}
