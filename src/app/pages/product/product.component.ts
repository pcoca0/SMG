import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { ICategoryItemResponse } from 'src/app/core/interfaces/responses/category.response';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productos: Array<IProductItemResponse>;
  filterMatch: string = '';
  categorias: Array<ICategoryItemResponse>;
  bsModalRef: BsModalRef;
  product: IProductItemResponse;

  constructor(
    private productService: ProductService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      resp => (this.productos = resp.data.productos,
        console.log(resp.data.productos))
    );
    this.productService.getCategories().subscribe(
      resp => (this.categorias = resp.data.categorias,
        console.log(resp.data.categorias))
    )
  }

  search(term: string){
     //console.log("Recibiendo: "+ term)
     this.filterMatch = term;
   }


   addNewProduct(){
    console.log("Por agregar una Producto");
    this.bsModalRef = this.modalService.productAdd("Categorias", "Productos", this.product, this.categorias);
    this.bsModalRef.content.event.subscribe(
    resp => {
      this.productos.push(resp.data)
    });
  }

  editProduct(i: number){
    console.log("Por editar una Categoria");
    let codigo = this.categorias[i].codigo;
    this.bsModalRef = this.modalService.productEdit("Categorias", "Productos",  this.productos[i], this.categorias, i);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data),
      this.product = resp.data,
      this.product.codigo = codigo,
      this.productos.splice(i, 1, this.product)
    });
  }

  removeCategory(i){
    console.log("posicion: "+ i);
    this.productos.splice(i, 1);
}

}
