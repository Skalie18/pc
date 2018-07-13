import { Component, OnInit } from '@angular/core';
import { SystemUserProviderService } from "app/system-user-provider.service";
import { AllocateViewService } from "app/shared-modules/allocate/allocate-view.service";
import { Observable } from "rxjs/Observable";
import swal from 'sweetalert2';

@Component({
  selector: 'app-allocate',
  templateUrl: './allocate-view.component.html',
  styleUrls: ['./allocate-view.component.scss']
})
export class AllocateViewComponent implements OnInit {
  allocatedReason:string;
  allocatedDate:Date;  
  constructor(private systemUser:SystemUserProviderService , private _allocateService : AllocateViewService) { }

  ngOnInit() { 
  }

  onCancel (reason, date) {
    this.allocatedReason = reason.value;
    this.allocatedDate = new Date(date.value);
    this._allocateService.CancelAllocation(this.allocatedReason,this.allocatedDate)
      .subscribe(res => {
        if  (res !== null ) {
          swal(res);
        }
      });
  }

  onReject (reason, date) {
    this.allocatedReason = reason.value;
    this.allocatedDate = new Date(date.value);
    this._allocateService.RejectAllocation(this.allocatedReason,this.allocatedDate)
      .subscribe(res => {
        if (res != null)
          {
            swal(res);
          }
      });
  }
}
 