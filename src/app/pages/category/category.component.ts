import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ICategoryResponse, ICategoryItemResponse } from 'src/app/core/interfaces/responses/category.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  today: number = Date.now();
  categorias: Array<ICategoryItemResponse>;
  filterMatch: string = '';
  bsModalRef: BsModalRef;
  category: ICategoryItemResponse;

  constructor(
    private productService: ProductService,
    private modalService: ModalService
  ) { }e

  ngOnInit() {
    this.productService.getCategories().subscribe(
      resp => (this.categorias = resp.data.categorias,
        console.log(resp.data.categorias))
    )
  }

  search(term: string){
    //console.log("Recibiendo: "+ term)
    this.filterMatch = term;
  }

  removeCategory(i){
      console.log("posicion: "+ i);
      this.categorias.splice(i, 1);
  }

  addNewCategory(){
    console.log("Por agregar una Categoria");
    this.bsModalRef = this.modalService.categoryAdd("Categorias", "Productos", this.category);
    this.bsModalRef.content.event.subscribe(
    resp => {
      this.categorias.push(resp.data)
    });
  }

  editCategory(i: number){
    console.log("Por editar una Categoria");
    let codigo = this.categorias[i].codigo;
    this.bsModalRef = this.modalService.categoryEdit("Categorias", "Productos", this.categorias[i], i);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data),
      this.category = resp.data,
      this.category.codigo = codigo,
      this.categorias.splice(i, 1, this.category)
    });
  }

}
