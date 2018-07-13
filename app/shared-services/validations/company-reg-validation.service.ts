import { Injectable } from '@angular/core';

@Injectable()
export class CompanyRegValidationService {

  constructor() { }

  validateCompanyRegNo(registeredNo): Promise<boolean> {
    let p = new Promise<boolean>((resolve, reject) => {

      if (registeredNo.length == 9) {
        if (registeredNo.substring(0, 1) != "K") {
          return reject(false);
        }
        if (isNaN(Number(registeredNo.substring(1)))) {
          return reject(false);
        }
        // return true;
      }
      else {
        let now: Date = new Date();
        let yyyy: number = now.getFullYear();
        let minYear: number = 1800;
        let firstChar: string = registeredNo.toString().substr(0, 1);
        let firstFourChars: string = registeredNo.toString().substr(0, 4);
        let firstSlashFifthChar: string = registeredNo.toString().substr(4, 1);
        let sixToElvenChars: string = registeredNo.toString().substr(5, 6);
        let secondSlashTwlvChar: string = registeredNo.toString().substr(11, 1);
        let twlvToThirteenChars: string = registeredNo.toString().substr(12, 2);

        if ((isNaN(Number(firstFourChars))) || (isNaN(Number(sixToElvenChars)))) {
          return reject(false);
        }

        if (Number(firstFourChars) > yyyy || Number(firstFourChars) < minYear) {
          return reject(false);
        }

        if (firstSlashFifthChar != "/") {
          return reject(false);
        }

        if (secondSlashTwlvChar != "/") {
          return reject(false);
        }

        if (registeredNo.length > 14) {
          return reject(false);
        }

        if(!this.checkLastTwoDigits(twlvToThirteenChars)){
        
          return  reject(false);
        }

       
      }
    });
    return p

  }

  private checkLastTwoDigits(value: string): Boolean {
    
    let result:boolean = false;
    let lastTwoDigitsArray: Array<string> = ["06", "07", "08", "09", "10", "11","12", "20", "21", "22", "23", "24", "25", "26","30","31","90","99"];

    if(lastTwoDigitsArray.indexOf(value) != -1){
      return result = true;
    }

    return  result;
  }

}

