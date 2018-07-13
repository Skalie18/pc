import { Injectable } from '@angular/core';

@Injectable()
export class UpdateDatagridService {

  constructor() { }


  onupdateOfGrid(updatedArr, updatedObj, oldArr, index) {

    for (let key in updatedArr) {
      for (let key1 in updatedObj) {
        if (key == key1) {
          if (updatedArr[key] !== updatedObj[key1]) {
            updatedArr[key] = updatedObj[key1]
          }
        }
      }
    }

    oldArr[index] = updatedArr;


  }



}
