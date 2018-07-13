import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DocumentClass } from './document-class';
import { IDocumentInterface } from './document-interface';
import { DocumentViewerService } from 'app/shared-services/document-viewer-service';
import { Observable } from 'rxjs/Observable';
import { DocumentUploadProviderService } from 'app/providers/document-upload-provider.service';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import swal from 'sweetalert2';
import { DataTable } from 'primeng/components/datatable/datatable';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})


export class DocumentUploadComponent implements OnInit, OnChanges {

  documentItems: Array<any> = new Array();
  createdCaseId: String;
  currentDate = new Date().toLocaleDateString();
  @Input() letterObject: any;

  currentUser: String;

  constructor(private dvservice: DocumentViewerService, private uploadedDocs: DocumentUploadProviderService,
          private systemUser: SystemUserProviderService) {
    this.currentUser  = systemUser.systemUserStorage.SID;
   }

  ngOnInit() {
    if (this.uploadedDocs.documentUploadStroage != null) {
      this.createdCaseId = this.uploadedDocs.documentUploadStroage[0].CaseId;
      if (this.uploadedDocs.documentUploadStroage.length > 0) {
        this.documentItems = this.uploadedDocs.documentUploadStroage.filter(Y => Y.IsRemoved !== true);
      } else {
        if (this.uploadedDocs.documentUploadStroage.IsRemoved !== true) {
          this.documentItems.push(this.uploadedDocs.documentUploadStroage);
        }
      }
    }

  }

  ngOnChanges(simple: SimpleChanges) {
    // if(this.letterObject){
    //   this.documentItems.push(this.letterObject)
    // }
  }




  loadDoc(e, file) {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    return Observable.create(observer => {
      reader.onloadend = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
  }

  uploadFile(event: any) {
    const file = event.target.files;

    for (let index = 0; index < file.length; index++) {
      const fName = file[index].name;
      const fSize = file[index].size;

      const doc = new DocumentClass;
      doc.FileName = fName;
      doc.FileSize = fSize;
      this.loadDoc(event, file[index]).subscribe((f) => {
        doc.DocumentContent = f;
      });
      if (this.createdCaseId != null) {
        doc.CaseId = this.createdCaseId;
      } else {
        doc.CaseId = null;
      }
      doc.IsRemoved = false;
      this.documentItems.push(doc);
      event.target.value = '';


    }
    this.uploadedDocs.documentUploadStroage = this.documentItems;
    swal('Document',
      'Document uploaded Successfully ',
      'success');
  }

  removeDocument( dt: DataTable, documentItem) {

    // documentItem.IsRemoved = true;
    // this.documentItems[index].IsRemoved = true;
    // Dont splice as the Isremoved will take the item off the screen and then get saved back to the db
    // this.documentItems.splice(index, 1);

    documentItem.IsRemoved = true;
    dt.filter('false', 'IsRemoved', 'equals');
    swal('Document',
      'Document Removed Successfully ',
      'success');
  }

  getDocumentData(observable) {

  }
  viewDocument(document) {
    // var document = this.documentItems[index];
    const documentContent = document.DocumentContent;

    if (documentContent.toString() !== '' && documentContent !== undefined) {
      const result = this.dvservice.getpdfdocument(documentContent.toString());

      if (window.navigator && window.navigator.msSaveOrOpenBlob) { // For Internet explorer
        window.navigator.msSaveOrOpenBlob(result, document.FileName);
      } else {
        const url = window.URL.createObjectURL(result);
        window.open(url);
      }
    } else {
      // alert('Document Did not load Properly');
    }
  }

  DocumentsLength() {
    if (this.documentItems !== null ) {
      return this.documentItems.filter(x => !x.IsRemoved).length;
    } else {
      return 0;
    }
  }
}
