import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BudgeModalComponent } from 'src/app/shared/components/modals/budge-modal/budge-modal.component';
import { Observable } from 'rxjs';
import { IProductItemResponse } from '../interfaces/responses/product.response';
import { IClientItemResponse } from '../interfaces/responses/client.response';
import { ClientModalComponent } from 'src/app/shared/components/modals/client-modal/client-modal.component';
import { ICategoryItemResponse } from '../interfaces/responses/category.response';
import { CategoryModalComponent } from 'src/app/shared/components/modals/category-modal/category-modal.component';

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

  clientAdd(title: string, message: string, client?: IClientItemResponse){
    const initialState = {
      title,
      message,
      client,
      action: 'add'
    };

    return  this.bsModalService.show(ClientModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  clientEdit(title: string, message: string, client: IClientItemResponse, view: boolean, pos?: number){
    const initialState = {
      title,
      message,
      client,
      action: 'edit',
      pos,
      view
    };

    return  this.bsModalService.show(ClientModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  categoryAdd(title: string, message: string, category?: ICategoryItemResponse){
    const initialState = {
      title,
      message,
      category,
      action: 'add'
    };

    return  this.bsModalService.show(CategoryModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  categoryEdit(title: string, message: string, category?: ICategoryItemResponse, pos?: number){
    const initialState = {
      title,
      message,
      category,
      action: 'edit',
      pos
    };

    return  this.bsModalService.show(CategoryModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }
}
