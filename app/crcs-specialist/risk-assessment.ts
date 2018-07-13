import { IRegistrationParticularsInterface } from 'app/crcs-specialist/registration-particulars-interface';
import { ICustomsTurnOverDetailsInterface } from 'app/crcs-specialist/customs-turnover-details-interface';
import { IDirectorDetailsInterface } from 'app/crcs-specialist/director-details-interface';
import { IRiskStatementInterface } from './risk-statement-interface';
import { ICustomsRASParticularsInterface } from './customs-particulars-interface';
import { IDocumentInterface } from '../shared-modules/document-upload/document-interface';


export interface IRiskAssessment {
  RegistrationParticulars: IRegistrationParticularsInterface; 
  CustomsRASParticulars: Array<ICustomsRASParticularsInterface>;
  CustomsTurnOverDetails: Array<ICustomsTurnOverDetailsInterface>;
  DirectorDetails: Array<IDirectorDetailsInterface>;
  RiskStatement: Array<IRiskStatementInterface>;
  UploadedFiles?: Array<IDocumentInterface>;
  CaseId: string;
}
