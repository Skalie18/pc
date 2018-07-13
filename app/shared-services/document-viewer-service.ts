import { Injectable } from '@angular/core';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'

@Injectable()
export class DocumentViewerService {
  document:string;
 
  constructor(private domSanitizer: DomSanitizer) { }

  getpdfdocument(doc:string) {
    let n = doc.indexOf("base64,")
    if(n > 0)
    {
      n = n + 7;
    }

    this.document = doc.substring(n, doc.length - n);
    var pdf = atob( this.document);
    var arr = new Array(pdf.length);
    for (var i = 0; i< pdf.length; i++){
      arr[i] = pdf.charCodeAt(i);
    }
    var byteArray = new Uint8Array(arr);  
    var fileblob = new Blob([byteArray], {type: 'application/pdf'} );
    return fileblob;
  }
  
  getpdfdocumentSanitized(doc:string) {
    var n = doc.indexOf("base64,") + 7;
    this.document = doc.substring(n, doc.length - n);
    var pdf = atob( this.document);
    var arr = new Array(pdf.length);
    for (var i = 0; i< pdf.length; i++){
      arr[i] = pdf.charCodeAt(i);
    }
    var byteArray = new Uint8Array(arr);  
    var file3 = new Blob([byteArray], {type: 'application/pdf'} );
    var url = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file3));
    return url;
  }
}
