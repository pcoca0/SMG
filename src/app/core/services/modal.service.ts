import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BudgeModalComponent } from 'src/app/shared/components/modals/budge-modal/budge-modal.component';
import { Observable } from 'rxjs';
import { IProductItemResponse } from '../interfaces/responses/product.response';
import { IClientItemResponse } from '../interfaces/responses/client.response';
import { ClientModalComponent } from 'src/app/shared/components/modals/client-modal/client-modal.component';
import { ICategoryItemResponse } from '../interfaces/responses/category.response';
import { CategoryModalComponent } from 'src/app/shared/components/modals/category-modal/category-modal.component';
import { ProducModalComponent } from 'src/app/shared/components/modals/produc-modal/produc-modal.component';
import { IProfileAFIP, ILocation, IClientCategory, IPriceClientCategory, IIva, IBank } from '../interfaces/utils';
import { IVendorItemResponse } from '../interfaces/responses/vendor.response';
import { VendorModalComponent } from 'src/app/shared/components/modals/vendor-modal/vendor-modal.component';
import { ClientCategory } from '../models/utils';
import { InvoiceModalComponent } from 'src/app/shared/components/modals/invoice-modal/invoice-modal.component';
import { VendorInvoiceProductModalComponent } from 'src/app/shared/components/modals/vendor-invoice-product-modal/vendor-invoice-product-modal.component';
import { ICheckItemResponse } from '../interfaces/responses/check.response';
import { CheckModalComponent } from 'src/app/shared/components/modals/check-modal/check-modal.component';
import { ICheckRequest } from '../interfaces/requests/check.request';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  bsModalRef: BsModalRef;
  constructor(
    private bsModalService: BsModalService
  ) { }

  budgetAdd(title: string, message: string, products: Array<IProductItemResponse>, clientCategory: ClientCategory){
    const initialState = {
      title,
      message,
      products,
      clientCategory,
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

  invoiceAdd(title: string, message: string, products: Array<IProductItemResponse>, clientCategory: ClientCategory){
    const initialState = {
    title,
    message,
    products,
    clientCategory,
    action: 'add'
  };

  return this.bsModalService.show(InvoiceModalComponent, {initialState});
  //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  invoiceEdit(title: string, message: string, products: Array<IProductItemResponse>, e?: IProductItemResponse,  pos?: number){
    const initialState = {
      title,
      message,
      products,
      action: 'edit',
      pos,
      e
    };
  
    return this.bsModalService.show(InvoiceModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  clientAdd(title: string, message: string, client?: IClientItemResponse, profilesAFIP?: Array<IProfileAFIP>,
            locations?: Array<ILocation>, clientCategories?: Array<IClientCategory>
    ){
    const initialState = {
      title,
      message,
      client,
      profilesAFIP,
      locations,
      clientCategories,
      action: 'add'
    };

    return  this.bsModalService.show(ClientModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  clientEdit(title: string, message: string, client: IClientItemResponse,profilesAFIP?: Array<IProfileAFIP>,
             locations?: Array<ILocation>, clientCategories?: Array<IClientCategory>, view?: boolean, pos?: number){
    const initialState = {
      title,
      message,
      client,
      profilesAFIP,
      locations,
      clientCategories,
      action: 'edit',
      pos,
      view
    };

    return  this.bsModalService.show(ClientModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  vendorAdd(title: string, message: string, vendor?: IVendorItemResponse, profilesAFIP?: Array<IProfileAFIP>,
            locations?: Array<ILocation>, clientCategories?: Array<IClientCategory>
  ){
  const initialState = {
  title,
  message,
  vendor,
  profilesAFIP,
  locations,
  clientCategories,
  action: 'add'
  };

return  this.bsModalService.show(VendorModalComponent, {initialState});
//return new Observable<string>(this.getBudgetModalsubscriber());
}

  vendorEdit(title: string, message: string, vendor: IVendorItemResponse, profilesAFIP?: Array<IProfileAFIP>,
      locations?: Array<ILocation>, clientCategories?: Array<IClientCategory>, view?: boolean, pos?: number){
  const initialState = {
  title,
  message,
  vendor,
  profilesAFIP,
  locations,
  clientCategories,
  action: 'edit',
  pos,
  view
  };

return  this.bsModalService.show(VendorModalComponent, {initialState});
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

  productAdd(title: string, message: string, product: IProductItemResponse, categoriesClient: Array<IClientCategory>,
             vendors: Array<IVendorItemResponse>, ivas: Array<IIva>
    ){
    const initialState = {
      title,
      message,
      product,
      categoriesClient,
      vendors,
      ivas,
      action: 'add',
    };

    return  this.bsModalService.show(ProducModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  productEdit(title: string, message: string, product: IProductItemResponse, categoriesClient: Array<IClientCategory>,
              vendors: Array<IVendorItemResponse>, ivas: Array<IIva>, pos?: number){
    const initialState = {
      title,
      message,
      product,
      categoriesClient,
      vendors,
      ivas,
      action: 'edit',
      pos
    };

    return  this.bsModalService.show(ProducModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  vendorInvoiceAdd(title: string, message: string, products: Array<IProductItemResponse>){
    const initialState = {
    title,
    message,
    products,
    action: 'add'
  };

  return this.bsModalService.show(VendorInvoiceProductModalComponent, {initialState});
  //return new Observable<string>(this.getBudgetModalsubscriber());
  }

  vendorInvoiceEdit(title: string, message: string, products: Array<IProductItemResponse>, e?: IProductItemResponse,  pos?: number){
    const initialState = {
      title,
      message,
      products,
      action: 'edit',
      pos,
      e
    };
  
    return this.bsModalService.show(VendorInvoiceProductModalComponent, {initialState});
    //return new Observable<string>(this.getBudgetModalsubscriber());
  }

    checkAdd(title: string, message: string, check?: ICheckRequest, banks?: Array<IBank>,
           locations?: Array<ILocation>
  ){
  const initialState = {
  title,
  message,
  check,
  banks,
  locations,
  action: 'add'
  };
  
  return  this.bsModalService.show(CheckModalComponent, {initialState});
  //return new Observable<string>(this.getBudgetModalsubscriber());
  }

checkEdit(title: string, message: string, check?: ICheckRequest, banks?: Array<IBank>,
         locations?: Array<ILocation>, view?: boolean, pos?: number){
  const initialState = {
  title,
  message,
  check,
  banks,
  locations,
  action: 'edit',
  pos,
  view
  };
  
  return  this.bsModalService.show(CheckModalComponent, {initialState});
  //return new Observable<string>(this.getBudgetModalsubscriber());
}
}
