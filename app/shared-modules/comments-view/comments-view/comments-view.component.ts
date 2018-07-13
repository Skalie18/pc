import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommentClass } from 'app/shared-modules/comments-view/comments-view/comment-class';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { CommentsViewDataService } from 'app/shared-modules/comments-view/comments-view-data.service';
import swal from 'sweetalert2';
import { CommentViewProviderService } from '../comments-view-provider.service';

@Component({
  selector: 'app-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.scss']
})

export class CommentsViewComponent implements OnInit, OnChanges {
  @Input() caseID = '';
  commentItems: Array<CommentClass> = new Array();
  noteText: string = null ;
  _modal = null;
  errorMessage: string;
  repData: any;
  constructor( private systemUser: SystemUserProviderService, private _notesService: CommentsViewDataService,
    private notesProvider: CommentViewProviderService) { }

  ngOnInit(): void {
    if (this.notesProvider.commentViewStorage != null) {
      this.commentItems = this.notesProvider.commentViewStorage;
    }
  }

  ngOnChanges(simple: SimpleChanges) {
    this.commentItems = new Array() ;
    this._notesService.caseId = this.caseID;
    this._notesService.sId = this.systemUser.systemUserStorage.SID;
    this._notesService.getNotes()
      .subscribe(noteDetails => {
        if (noteDetails != null) {
          this.commentItems = noteDetails;
        }
      },
      error => this.errorMessage = <any>error);
  }

  saveNote(commentValue: string) {
    if (this.caseID === '' || this.caseID === undefined) { return; };
    const note = new CommentClass;
    note.Reason = commentValue;
    note.CreatedBy = this.systemUser.systemUserStorage.SID;
    note.DateCreated = new Date;
    note.CaseId = this.caseID;
    this.commentItems.push(note);
    this.saveNoteToDb(note);

    this.noteText = '';
  }

  saveNoteToDb(note) {
    this._notesService.caseId = this.caseID;
    this._notesService.sId = this.systemUser.systemUserStorage.SID;
    this._notesService.submitNote(note)
      .subscribe(res => {
          console.log(res);
          this.repData = res;
          if (this.repData !== '0') {
            swal(
              'Record',
              'Note Saved Successfully',
              'success'
            );
          }
      },
      error => this.errorMessage = <any>error);
  }

  noteClicked(commentclicked: any) {
    const selectedComment = commentclicked;
    const dateFormat = require('dateformat');
    swal({
        html:  selectedComment.Reason + '<br><br>Created By:'  + selectedComment.CreatedBy
          + '<br>Created On: ' + dateFormat(selectedComment.DateCreated, 'dd mmm yyyy, h:MM:ss TT'),
        title: 'Case Note',
        showCloseButton: true

    });
  }

  onCommentsRowSelect(event) {
    const selectedComment = event.data;
    const dateFormat = require('dateformat');
    swal({
        html:  selectedComment.Reason + '<br><br>Created By:'  + selectedComment.CreatedBy
          + '<br>Created On: ' + dateFormat(selectedComment.DateCreated, 'dd mmm yyyy, h:MM:ss TT'),
        title: 'Case Note',
        showCloseButton: true
    });
  }
}
