import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { CommentClass } from "app/shared-modules/comments-view/comments-view/comment-class";
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { Globals } from '../../globals';

@Injectable()
export class CommentsViewDataService {
  sId:String;
  caseId:String;

  private _notesUrl = "api/Notes/GetNotesByCaseId?CaseId=";
  private _submitNotesUrl = "api/Notes/SaveNotes";
  

  constructor(private _http: Http, private globals:Globals ,private systemUser:SystemUserProviderService) { 
    // let user = localStorage.getItem("User");
    // let userJson = JSON.parse(user);
    // this.sId = userJson.SID;
  }

  getNotes(): Observable<any[]> {
    let body = '';// JSON.stringify(this.caseId);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,withCredentials:true });
    
    return this._http.post(this.globals.globalConStr + this._notesUrl+this.caseId,body,options )
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError) ;  
  }

  submitNote(submitNote: CommentClass): Observable<CommentClass[]> {
        if (submitNote.Id == undefined ){
          submitNote.Id = Guid.newGuid();
        }
    
        let body = JSON.stringify(submitNote); 
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers ,withCredentials:true });
    
        return this._http.post(this.globals.globalConStr + this._submitNotesUrl, body, options)
          .map((res: Response) => res.json())
          .catch(this.handleError);
  }
  
  savenote(caseId, notetext){
    var note :CommentClass = new CommentClass();
    note.CaseId = caseId;
    note.DateCreated = new Date;
    note.CreatedBy = this.systemUser.systemUserStorage.SID;
    note.Reason = notetext;
    return this.submitNote(note);
  }
  


  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }  
}

class Guid {
  static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
}

