import { Component, OnInit, Input } from '@angular/core';
import { ProgressBarModule } from 'primeng/primeng';
import {BlockUIModule} from 'primeng/blockui';

@Component({
  selector: 'app-loadingbar',
  templateUrl: './loadingbar.component.html',
  styleUrls: ['./loadingbar.component.scss']
})
export class LoadingbarComponent implements OnInit {
  // progValue : number = 0;
  @Input() isLoaded = false;
  @Input() isPostActionCompleted = false;
  constructor() { }

  ngOnInit() {

    // let interval = setInterval(() => {
    //   this.progValue +=10;  // this.progValue + Math.floor(Math.random() * 10) + 1;
    //   if (this.isLoaded) {
    //       clearInterval(interval);    //stop the timer
    //   }
    //   if(this.progValue > 100) {
    //       this.progValue = 0;
    //   }
    // }, 1000);
  }

}
