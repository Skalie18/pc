import { Injectable } from '@angular/core';

@Injectable()
export class IdValidationService {

  constructor() { }

  IdNumberValidation(idNumber): Promise<boolean> {
    let p = new Promise<boolean>((resolve, reject) => {
         // only run the following validations if something has been provided
         if (idNumber.length > 0) {      
          // check that the given number is thirteen digits long
          if (idNumber.length != 13) {
              return reject(false);
          }
          
          // let newDate:Date;
          // // check that the first 6 digits represent a valid date     	
          // var dateOfBirth:String = idNumber.substr(0, 6);
          // // var dateValidator:Date = new dateValidator();
          // // dateValidator.inputFormat = "yymmdd";
         
          // finally check that the control digit is valid
          var firstTwelveDigits:String = idNumber.substr(0, 12);
          var thirteenthDigit:String = idNumber.substr(12, 1);
          var controlDigit:String = this.generateControlDigit(firstTwelveDigits);
          
          if (controlDigit != thirteenthDigit) {
              
            return reject(false);
          }
      }
    });

    return p
  }

  /**
     * Calculate the thirteenth control digit of an ID number using the first twelve digits.
     *
     * This method will typically be used to perform a modulus 13 check on a South African ID Number.
     */

  private generateControlDigit(firstTwelveDigits: String): String {

    var controlDigit: number = 0;

    var totalA: number = Number(firstTwelveDigits.substring(0, 1)) + Number(firstTwelveDigits.substring(2, 3)) + Number(firstTwelveDigits.substring(4, 5)) + Number(firstTwelveDigits.substring(6, 7)) + Number(firstTwelveDigits.substring(8, 9)) + Number(firstTwelveDigits.
      substring(10,
        11));
    var totalB: number = Number(firstTwelveDigits.substring(1, 2) + firstTwelveDigits.substring(3, 4) + firstTwelveDigits.substring(5, 6) + firstTwelveDigits.substring(7, 8) + firstTwelveDigits.substring(9, 10) + firstTwelveDigits.substring(11,
      12));

    totalB *= 2;

    var bString: String = totalB.toString();

    totalB = 0;

    for (var i: number = 0; i < bString.length; i++) {
      totalB += Number(bString.substring(i, (i + 1)));
    }

    var totalC: number = totalA + totalB;

    if ((totalC % 10) != 0) {
      controlDigit = 10 - (totalC % 10);
    }

    return controlDigit.toString();
  }

}
