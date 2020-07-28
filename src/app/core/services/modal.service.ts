import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BudgeModalComponent } from 'src/app/shared/components/modals/budge-modal/budge-modal.component';
import { Observable } from 'rxjs';
import { IProductItemResponse } from '../interfaces/responses/product.response';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  bsModalRef: BsModalRef;
  constructor(
    private bsModalService: BsModalService
  ) { }

  budgetAdd(title: string, message: string, products: Array<IProductItemResponse>){
    const initialState = {
      title,
      message,
      products,
      action: 'add'
    };

    return this.bsModalService.show(BudgeModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  budgetEdit(title: string, message: string, products: Array<IProductItemResponse>, e?: IProductItemResponse,  pos?: number){
    const initialState = {
      title,
      message,
      products,
      action: 'edit',
      pos,
      e
    };

    return this.bsModalService.show(BudgeModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  // private getBudgetModalsubscriber(){
  //   return(observer) => {
  //     const suscription = this.bsModalService.onHidden.subscribe((reason: string) =>
  //     {
  //       observer.complete();
  //     });
  //     return {
  //       unsubscribe() {
  //         suscription.unsubscribe();
  //       }
  //     };
  //   }
  // }
}
