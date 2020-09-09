import { Component, OnInit, EventEmitter } from '@angular/core';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ICategoryItemResponse } from 'src/app/core/interfaces/responses/category.response';
import { IPriceClientCategory, IClientCategory } from 'src/app/core/interfaces/utils';

@Component({
  selector: 'app-produc-modal',
  templateUrl: './produc-modal.component.html',
  styleUrls: ['./produc-modal.component.scss']
})
export class ProducModalComponent implements OnInit {

  title: string;
  message: string;
  product: IProductItemResponse;
  categoriesClient: Array<IClientCategory>;
  public event: EventEmitter<any> = new EventEmitter();
  formProduct: FormGroup;
  action: string;
  i: number;
  view: boolean;
  categories: Array<ICategoryItemResponse>;
  preciosArray: FormArray;

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
  };

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
  ) {
    this.formProduct = this.fb.group({
      descripcion: ['', Validators.required],
      codigo: [0, Validators.required],
      precio: [0, Validators.required],
      iva: ['', Validators.required],
      stock: ['', Validators.required],
      precios: this.fb.array([])
    });

  }

  ngOnInit() {
    console.log(this.product);
    this.preciosArray = this.formProduct.controls.precios as FormArray;

    if (this.action === 'edit') {
      this.formProduct.patchValue({
      descripcion: this.product.descripcion,
      codigo: this.product.codigo,
      iva: this.product.iva,
      stock: this.product.stock,
      });
      this.product.precios.forEach((p) => {
        console.log(p);
        this.preciosArray.push(this.fb.group({
          id: [p.categoriaCliente.id],
          categoria: [ {value : 'Precio para ' + p.categoriaCliente.descripcion,  disabled: true} ],
          precio: [ p.precio, Validators.required]
       }));
       console.log(this.preciosArray);
      });
    }else{
    this.categoriesClient.forEach(c =>
                                    this.preciosArray.push(this.fb.group({
                                    id: [c.id],
                                    categoria: [ {value : 'Precio para ' + c.descripcion,  disabled: true} ],
                                    precio: [ 0, Validators.required]
                                 }))
    );
   }
  }

  close() {
    this.bsModalRef.hide();
  }

  sendObject(item: string, pos?: number) {
    this.event.emit({data: item, position: pos, res: 200});
  }

  selectCategory(){}


  onSubmit(){
    switch (this.action) {
      case 'add':
        console.log( "add to modal component" + this.formProduct.value);
        console.log( this.formProduct.value);
        this.sendObject(this.formProduct.value);
        this.bsModalRef.hide();
        break;
      case 'edit':
        console.log( "Edit to modal component" + this.formProduct.value);
        this.sendObject(this.formProduct.value, this.i);
        this.bsModalRef.hide();
        break;

      default:
        break;
    }
  }

}
