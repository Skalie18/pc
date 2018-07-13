import { Injectable } from '@angular/core';
import { IRiskAssessment } from '../risk-assessment';
import { RiskAssessmentReportCase } from '../risk-assessment-class';

@Injectable()

export class DataProvider {
    public riskAssessmentStorage : RiskAssessmentReportCase;
    
    constructor(){}

}
