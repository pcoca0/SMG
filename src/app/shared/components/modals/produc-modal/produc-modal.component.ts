import { Component, OnInit, EventEmitter } from '@angular/core';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ICategoryItemResponse } from 'src/app/core/interfaces/responses/category.response';

@Component({
  selector: 'app-produc-modal',
  templateUrl: './produc-modal.component.html',
  styleUrls: ['./produc-modal.component.scss']
})
export class ProducModalComponent implements OnInit {

  title: string;
  message: string;
  product: IProductItemResponse;
  public event: EventEmitter<any> = new EventEmitter();
  formProduct: FormGroup;
  action: string;
  i: number;
  view: boolean;
  categories: Array<ICategoryItemResponse>;

  // codigo: number;
  // descripcion: string;
  // precio: number;
  // categoria: ICategoryItemResponse;

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
  ) {
    this.formProduct = this.fb.group({
      descripcion: ['', Validators.required],
      precio: [0, Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.product);
    if (this.product){
      this.formProduct.patchValue({
      descripcion: this.product.descripcion,
      precio: this.product.precio,
      category: this.product.categoria
      });
    }
  }

  close() {
    this.bsModalRef.hide();
  }

  sendObject(item: string, pos?: number) {
    this.event.emit({data: item, position: pos, res: 200});
  }


  onSubmit(){
    switch (this.action) {
      case 'add':
        console.log( "add to modal component" + this.formProduct.value);
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
