import { Component, OnInit } from '@angular/core';
import {CommentsViewComponent} from 'app/shared-modules/comments-view/comments-view/comments-view.component';

@Component({
  selector: 'app-ra-approval-screen',
  templateUrl: './ra-approval-screen.component.html',
  styleUrls: ['./ra-approval-screen.component.scss']
})
export class RaApprovalScreenComponent implements OnInit {

  constructor(private appComment: CommentsViewComponent) { }

  ngOnInit() {
  }

}
