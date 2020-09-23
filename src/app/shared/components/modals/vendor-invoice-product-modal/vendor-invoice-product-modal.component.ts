import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { SwalService } from 'src/app/core/services/swal.service';

@Component({
  selector: 'app-vendor-invoice-product-modal',
  templateUrl: './vendor-invoice-product-modal.component.html',
  styleUrls: ['./vendor-invoice-product-modal.component.scss']
})
export class VendorInvoiceProductModalComponent implements OnInit {

  title: string;
  label: string;
  message: string;
  products: Array<IProductItemResponse>;
  itemForm: FormGroup;
  public event: EventEmitter<any> = new EventEmitter();
  i: number;
  e: IProductItemResponse;
  action: string;
  producto: IProductItemResponse;

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
        precio: this.e.precioCompra,
        cantidad: this.e.cantidad || 0,
        iva: this.e.ivaCompra || 0
      });
    }
  }

  // addToBudget(){
  //   console.log( "add to modal component" + this.itemForm.value.producto);
  //   this.sendObject(this.itemForm.value.producto);
  //   this.bsModalRef.hide();
  // }

  selectProduct(){}

  sendObject(item: string, pos?: number) {
    this.event.emit({data: item, position: pos, res: 200});
  }

  onSubmit(){
  this.itemForm.value.producto.cantidad = Number(this.itemForm.value.cantidad); 
  this.itemForm.value.producto.precioCompra = Number(this.itemForm.value.cantidad); 
  this.itemForm.value.producto.ivaCompra = Number(this.itemForm.value.iva); 

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
