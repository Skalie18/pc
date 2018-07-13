import { Injectable } from '@angular/core';
import { ISystemUserInterface } from './system-user-interface';

@Injectable()
export class SystemUserProviderService {

  constructor(){

    // let user = localStorage.getItem("User");
    // let userJson = JSON.parse(user);
    // this.systemUserStorage = userJson;
  }


  public systemUserStorage: ISystemUserInterface;

}
