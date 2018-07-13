import { Injectable } from '@angular/core';

@Injectable()
export class CustomExciseValidationService {

  constructor() { }

  validateCustomExciseNumber(value: String): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {
      let numberOne: number = Number(value.substring(0, 1));
      let numberTwo: number = Number(value.substring(1, 2));
      let numberThree: number = Number(value.substring(2, 3));
      let numberFour: number = Number(value.substring(3, 4));
      let numberFive: number = Number(value.substring(4, 5));
      let numberSix: number = Number(value.substring(5, 6));
      let numberSeven: number = Number(value.substring(6, 7));
      let numberEigth: number = Number(value.substring(7, 8));

      let sum = numberOne * 9 + numberTwo * 8 + numberThree * 7 + numberFour * 6 + numberFive * 4 + numberSix * 3 + numberSeven * 2 + numberEigth * 1;

      if (!this.checkRimainder(sum)) {
        return reject(false);
      }

    })

    return promise

  }

  private checkRimainder(sumvalue): boolean {

    if (sumvalue % 11 != 0) {
      if (sumvalue % 10 != 0) {
        return false;
      }
    }
    return true;
  }

}
