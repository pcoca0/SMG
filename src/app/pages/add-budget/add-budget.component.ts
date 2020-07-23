import { Component, OnInit } from '@angular/core';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ICategoryItemResponse } from 'src/app/core/interfaces/responses/category.response';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss']
})
export class AddBudgetComponent implements OnInit {

  totalizador: number;
  totalizadorParcial: number = 0.00;
  productos: Array<IProductItemResponse>;
  presupuesto: Array<IProductItemResponse> = [];
  bsModalRef: BsModalRef;

  constructor(
      private modalService: ModalService,
      private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      resp => (this.productos = resp.data.productos,
        console.log(resp.data.productos)))
  }

  addBudget(){
    this.bsModalRef = this.modalService.budgetAdd("Presupuesto", "Productos", this.productos);

    this.bsModalRef.content.event.subscribe(
    resp => {
      this.presupuesto.push(resp['data']),
      this.updateTotaliador()
    });

  }

  updateTotaliador(){
    this.totalizador = 0.00;
    this.presupuesto.forEach( i =>
     { this.totalizador = this.totalizador + i.precio,
      console.log("Precio: "+i.precio),
      console.log("Acumulador: "+ this.totalizador)
      console.log(this.presupuesto.length)
    })
  }

}