import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { ICategoryItemResponse } from 'src/app/core/interfaces/responses/category.response';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IProductRequest } from 'src/app/core/interfaces/requests/product.request';

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
  product: IProductItemResponse = { id:'', descripcion:'', precio: 0, categoria: {id:'',descripcion:''}};
  productRequest: IProductItemResponse = { id:'', descripcion:'', precio: 0, categoria: {id:'',descripcion:''}};
  productNew: IProductItemResponse;


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

   constructorRequest(resp: any){
     console.log(resp);
     this.productRequest.descripcion = resp.descripcion;
     this.productRequest.categoria.id = this.categorias[Number(resp.category)].id;
     this.productRequest.precio = resp.precio;
     console.log(this.productRequest);
     return this.productRequest;
   }

   constructorRequestEdit(resp: any){
    console.log(resp);
    console.log("hola");
    this.productRequest.descripcion = resp.descripcion;
    this.productRequest.categoria.id = resp.category.id;
    this.productRequest.precio = resp.precio;
    console.log(this.productRequest);
    return this.productRequest;
  }


   addNewProduct(){
    let pos;
    console.log("Por agregar una Producto");
    this.bsModalRef = this.modalService.productAdd("Categorias", "Productos", this.product, this.categorias);
    this.bsModalRef.content.event.subscribe(

    resp => {
              console.log(resp.data),
              this.productService.addProduct ( this.constructorRequest(resp.data)).subscribe(
              c => {
                 this.productNew = c.data.productos[0],
                 console.log(this.productNew),
                 this.productos.push(this.productNew)
             }
 )
    });
  }

  editProduct(i: number){
    console.log("Por editar una Categoria");
    let id = this.productos[i].id;
    console.log(id);
    this.bsModalRef = this.modalService.productEdit("Categorias", "Productos",  this.productos[i], this.categorias, i);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data),
      console.log(id);
      this.product = this.constructorRequestEdit(resp.data),
      this.product.id = id,
      // console.log(this.product),
      // /*to do refactor*/
      // this.product.categoria.id = resp.data.category.id;
      // console.log(this.product),
      this.productos.splice(i, 1, this.product),
      this.productService.putProduct(this.product.id, this.product ).subscribe()

    });
  }

  removeProduct(i){
    console.log("posicion: "+ i);
    let id = this.productos[i].id;
    this.productos.splice(i, 1);
    this.productService.deleteProduct(id).subscribe();

}

}
