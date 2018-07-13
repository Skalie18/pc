import { Component, OnInit } from '@angular/core';
// import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'
import  { myData} from './document-viewer-filesample'
import {DocumentViewerService} from 'app/shared-services/document-viewer-service'
@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']  
})
export class DocumentViewerComponent implements OnInit {
  dataArray: myDataObject[] =[];
  constructor(private documentviewerservice: DocumentViewerService){
    var inputDataFile;
    inputDataFile = new myData;
    var fLen = inputDataFile.output.length;
    for (var j = 0 ; j < fLen; j++ ){
        var data = inputDataFile.output[j];
        var tempfile = new myDataObject ;
        tempfile.dataLocalUrl =  window.URL.createObjectURL(documentviewerservice.getpdfdocument(data));
        tempfile.fileName = 'Sars Document [' + j +'].pdf';
        this.dataArray.push(tempfile);
    }
  }
  ngOnInit(){}
 
}
class myDataObject {
   dataLocalUrl:any ;
   fileName: string ;
}


