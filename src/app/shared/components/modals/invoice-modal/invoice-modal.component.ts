import { Component, OnInit, EventEmitter } from '@angular/core';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IPriceClientCategory, IClientCategory } from '../../../../core/interfaces/utils';
import { SwalService } from 'src/app/core/services/swal.service';
@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.scss']
})
export class InvoiceModalComponent implements OnInit {
  title: string;
  label: string;
  message: string;
  products: Array<IProductItemResponse>;
  clientCategory: IClientCategory;
  itemForm: FormGroup;
  public event: EventEmitter<any> = new EventEmitter();
  i: number;
  e: IProductItemResponse;
  action: string;
  producto: IProductItemResponse;
  precio: IPriceClientCategory;

  dropdownSetup: Object = {
    displayKey:'descripcion', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Selecciona', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    //limitTo: options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'Más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No se encontraron resultados!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Buscar', // label thats displayed in search input,
    searchOnKey: 'descripcion', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  constructor(
      private fb: FormBuilder,
      private bsModalRef: BsModalRef,
      private swalService: SwalService

      ) {
    this.itemForm = this.fb.group({
      producto: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      iva: ['', Validators.required]


    });

  }


  ngOnInit() {
    if ( this.e ) {
      console.log( this.e)
      // this.itemForm.value.producto.se = this.e;
      this.itemForm.patchValue({
        producto: this.e,
        precio: this.e.precio,
        cantidad: this.e.cantidad,
        iva: this.e.iva
      });
    }
  }

  // addToBudget(){
  //   console.log( "add to modal component" + this.itemForm.value.producto);
  //   this.sendObject(this.itemForm.value.producto);
  //   this.bsModalRef.hide();
  // }

  sendObject(item: string, pos?: number) {
    this.event.emit({data: item, position: pos, res: 200});
  }

  selectProduct(){
    console.log("Valor sugerido: " + this.itemForm.value.producto.precio);
    this.producto = this.itemForm.value.producto;
    if (this.producto.stock > 0){
      this.precio = this.producto.precios.find( p => p.categoriaCliente.id === this.clientCategory.id);
      this.itemForm.controls.precio.setValue(this.precio.precio);
      this.itemForm.value.producto.precio = Number(this.precio.precio)
    } else {
      this.swalService.warning(`No hay Stock disponible del producto que desea agregar.`);
    }  
  }

  updatePriceValue(){
    this.itemForm.value.producto.precio = Number(this.itemForm.value.precio);
    console.log("Cambia o no Cambia" + this.itemForm.value.producto);
  }

  onSubmit(){
  this.itemForm.value.producto.cantidad = Number(this.itemForm.value.cantidad); 
  this.itemForm.value.producto.iva = Number(this.itemForm.value.iva); 

  switch (this.action) {
    case 'add':
      console.log( "add to modal component" + this.itemForm.value.producto);
      this.sendObject(this.itemForm.value.producto);
      this.bsModalRef.hide();
      break;
    case 'edit':
      console.log( "Edit to modal component" + this.itemForm.value.producto);
      this.sendObject(this.itemForm.value.producto, this.i);
      this.bsModalRef.hide();
      break;

    default:
      break;
  }
}

close() {
  this.bsModalRef.hide();
}
}
