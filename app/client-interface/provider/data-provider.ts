import { Injectable } from '@angular/core';
import { IVddl } from '../vd-dl-interface';

@Injectable()

export class vddlDataProvider{


    public vddlStorage : IVddl;
    
    constructor(){}

}