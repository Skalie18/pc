import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SepcialCharacterDirective } from './sepcial-character.directive';
import { TestDirective } from './test.directive';
import { LimitFieldDirective } from './limit-field.directive';
import { NumericFieldDirective } from './numeric-field.directive';
import { EmailFieldDirective } from './email-field.directive';
import { NumericWithoutsapceDirective } from './numeric-withoutsapce.directive';
import { TelphoneFieldDirective } from './telphone-field.directive';
import { IdNumberFieldDirective } from './id-number-field.directive';
import { VatNumberFieldDirective } from './vat-number-field.directive';
import { TaxincomeNumberFieldDirective } from './taxincome-number-field.directive';
import { IdValidationService } from '../shared-services/validations/id-validation.service';
import { CompanyRegDirective } from './company-reg.directive';
import { DateValidatorDirective } from './date-validator.directive';
import { CustomExciseDirective } from './custom-excise.directive';
import { ZeroNotAllowedDirective } from './zero-not-allowed.directive';
import { PassportNumberDirective } from './passport-number.directive';
import { AlphaNumericDirective } from './alpha-numeric.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TestDirective, SepcialCharacterDirective, LimitFieldDirective, NumericFieldDirective, EmailFieldDirective, NumericWithoutsapceDirective, TelphoneFieldDirective, IdNumberFieldDirective, VatNumberFieldDirective, TaxincomeNumberFieldDirective, CompanyRegDirective, DateValidatorDirective, CustomExciseDirective, ZeroNotAllowedDirective, PassportNumberDirective, AlphaNumericDirective
  ],
  exports:[TestDirective, SepcialCharacterDirective, LimitFieldDirective , NumericFieldDirective, EmailFieldDirective ,IdNumberFieldDirective, TaxincomeNumberFieldDirective, VatNumberFieldDirective ,CompanyRegDirective,CustomExciseDirective,ZeroNotAllowedDirective,PassportNumberDirective, AlphaNumericDirective ],
  providers:[IdValidationService]

}) 
export class SharedDirectivesModule { }
