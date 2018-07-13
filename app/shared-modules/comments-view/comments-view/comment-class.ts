import {ICommentInterface} from './comment-interface';

export class CommentClass implements ICommentInterface {
    Id: string;
    CaseId: string;
    Reason: string;
    DateCreated: Date;
    CreatedBy: String;
}