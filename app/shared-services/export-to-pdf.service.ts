import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Injectable()
export class ExportToPdfService {

  constructor() {
    //called first time before the ngOnInit()
     pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //    var dd = { content: 'your pdf data' };
  //  pdfMake.createPdf(dd).download();
   }

  public exportToPdf(items, columns , reportTitle:String) {


    // to generate columns dynamicly
    let columsList: Array<String> = new Array(columns[0].FieldName,columns[1].FieldName);



    var docDefinition = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
    
            body: [
              columsList,
              [ 'Value 1', 'Value 2' ],
              [ { text: 'Bold value', bold: true }, 'Val 2']
            ]
          }
        }
      ]
    };

    pdfMake.tableLayouts = {
      exampleLayout: {
        hLineWidth: function (i, node) {
          if (i === 0 || i === node.table.body.length) {
            return 0;
          }
          return (i === node.table.headerRows) ? 2 : 1;
        },
        vLineWidth: function (i) {
          return 0;
        },
        hLineColor: function (i) {
          return i === 1 ? 'blue' : '#0000FF';
        },
        paddingLeft: function (i) {
          return i === 0 ? 0 : 8;
        },
        paddingRight: function (i, node) {
          return (i === node.table.widths.length - 1) ? 0 : 8;
        }
      }
    };
    
     
    // download the PDF
    pdfMake.createPdf(docDefinition).download(reportTitle+".pdf");
  }

}
