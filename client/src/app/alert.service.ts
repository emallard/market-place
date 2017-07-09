import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class AlertMessage {
    public show: boolean;
    public message: string;
}

@Injectable()
export class AlertService {
    //public alertStatus: BehaviorSubject<AlertMessage> = new BehaviorSubject<AlertMessage>({ show: false, message: null });

    private _callback:(string)=>void
    onShowAlert(callback:(string)=>void)
    {
      this._callback = callback;
    }
    
    showAlert(msg: string) {

        ///let alertObj: AlertMessage = { show: isShow, message: msg };
        //this.alertStatus.next(alertObj);
        if (this._callback)
          this._callback(msg);
        
    }
}