import { Injectable } from '@angular/core';

@Injectable()
export class VatValidationService {

  constructor() { }

  vatNumberValidation(vatNumber): Promise<boolean> {
    let fieldValue:string = vatNumber;
    let p = new Promise<boolean>((resolve, reject) => {
      // resolve('a string'); 
      if (fieldValue.length != 10) {

        return reject(false );
      }
      // check that the first digit is a 4
      var firstDigitString: String = fieldValue.substr(0, 1);
      var firstDigitNumber: number = Number(firstDigitString);

      if (firstDigitNumber != 4) {
        return reject(false);
      }

      // finally check that the control digit is valid
      var firstNineDigits: String = fieldValue.substr(0, 9);
      var tenthDigit: String = fieldValue.substr(9, 1);
      var controlDigit: number = this.generateControlDigit(firstNineDigits);

      if ((controlDigit + Number(tenthDigit)) % 10 != 0) {

        return reject(false);
      } else {
        return resolve(true)

      }


    });
    return p
  }

  /**
       * Calculate the tenth control digit of the VAT Reference Number using the first nine digits.
       *
       */
  private generateControlDigit(firstNineDigits: String): number {

    let controlDigit: number = 0;

    let totalA: number = this.addDigits((Number(firstNineDigits.substring(0, 1)) * 2).toString()) + this.addDigits((Number(firstNineDigits.substring(2, 3)) * 2).toString()) + this.addDigits((Number(firstNineDigits.substring(4, 5)) * 2).toString()) + this.addDigits((Number(firstNineDigits.substring(6, 7)) * 2).toString()) + this.addDigits((Number(firstNineDigits.substring(8, 9)) * 2).toString());
    let totalB: number = Number(firstNineDigits.substring(1, 2)) + Number(firstNineDigits.substring(3, 4)) + Number(firstNineDigits.substring(5, 6)) + Number(firstNineDigits.substring(7, 8));

    controlDigit = totalA + totalB;

    return controlDigit;
  }

  private addDigits(number: String): number {
    let total: number = 0;
    for (let i: number = 0; i < number.length; i++) {
      total += Number(number.substring(i, (i + 1)));
    }
    return total;
  }

}
