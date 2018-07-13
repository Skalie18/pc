import { Injectable } from '@angular/core';

@Injectable()
export class IncometaxValidationService {

  constructor() { }


  incomeNumberValidator(incomeNumber): Promise<boolean> {
    let fieldValue:string = incomeNumber;
    let firstDigitString: String = fieldValue.substr(0, 1);
    let firstDigitNumber: any = Number(firstDigitString);

    let p = new Promise<boolean>((resolve, reject) => {

      if (firstDigitNumber > 3 && firstDigitNumber != 9) {
        return reject('First Digit')
      }

      if (fieldValue == "2222222222" || fieldValue == "0000000000" || fieldValue == "9999999999") {

        return reject('Invalid data');
      }

      // finally check that the control digit is valid
      let firstNineDigits: String = fieldValue.substr(0, 9);
      let tenthDigit: String = fieldValue.substr(9, 1);
      let controlDigit: number = this.generateControlDigit(firstNineDigits);

      if ((controlDigit + Number(tenthDigit)) % 10 != 0) {
        return reject('Incorrect Data');
      } else {
        return resolve();
      }
    });
    return p
  }


  private generateControlDigit(firstNineDigits: String): number {

    let controlDigit: number = 0;
    let totalA: number = this.addDigits((Number(firstNineDigits.substring(0, 1)) * 2).toString()) + this.addDigits((Number(firstNineDigits.substring(2, 3)) * 2).toString()) + this.addDigits((Number(firstNineDigits.substring(4, 5)) * 2).toString()) + this.addDigits((Number(firstNineDigits.substring(6, 7)) * 2).toString()) + this.addDigits((Number(firstNineDigits.substring(8, 9)) * 2).toString());
    let totalB: number = Number(firstNineDigits.substring(1, 2)) + Number(firstNineDigits.substring(3, 4)) + Number(firstNineDigits.substring(5, 6)) + Number(firstNineDigits.substring(7, 8));

    controlDigit = totalA + totalB;
    //trace("totalA " + totalA);
    //trace("totalB " + totalB);
    return controlDigit;
  }

  private addDigits(number: String): number {
    let total: number = 0;

    for (var i: number = 0; i < number.length; i++) {
      total += Number(number.substring(i, (i + 1)));
    }

    return total;
  }

}
