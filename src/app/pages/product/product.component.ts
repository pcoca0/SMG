import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { ICategoryItemResponse } from 'src/app/core/interfaces/responses/category.response';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IProductRequest } from 'src/app/core/interfaces/requests/product.request';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/core/services/swal.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  productos: Array<IProductItemResponse>;
  filterMatch: string;
  categorias: Array<ICategoryItemResponse>;
  bsModalRef: BsModalRef;
  product: IProductItemResponse = { id:'', descripcion:'', precio: 0, categoria: {id:'',descripcion:''}};
  productRequest: IProductRequest = { id:'', descripcion:'', precio: 0, categoria: {id:'',descripcion:''}};
  productNew: IProductItemResponse;
  private suscriptions: Subscription[] = [];


  constructor(
    private productService: ProductService,
    private modalService: ModalService,
    private swalService: SwalService

  ) { }

  ngOnInit() {
    this.suscriptions.push(this.productService.getProducts().subscribe(
                            resp => (this.productos = resp.data.productos,
                              console.log(resp.data.productos))
                          ));
    this.suscriptions.push(this.productService.getCategories().subscribe(
                          resp => (this.categorias = resp.data.categorias,
                            console.log(resp.data.categorias))
                          ));
  }

  search(term: string){
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
    this.productRequest.descripcion = resp.descripcion;
    this.productRequest.categoria.id = resp.category.id;
    this.productRequest.precio = resp.precio;
    console.log(this.productRequest);
    return this.productRequest;
  }


   addNewProduct(){
    console.log('Por agregar una Producto');
    this.bsModalRef = this.modalService.productAdd('Categorias', 'Productos', this.product, this.categorias);
    this.bsModalRef.content.event.subscribe(
    resp => {
              this.suscriptions.push(this.productService.addProduct( this.constructorRequest(resp.data)).subscribe(
                  response => {
                     this.productNew = response.data.productos[0],
                     console.log(this.productNew),
                     this.productos.push(this.productNew),
                     this.swalService.success(`Producto creado con éxito`)
                   },
                  error => this.swalService.error(`No se ha podido crear el producto.`)
             ));
    });
  }

  editProduct(i: number){
    console.log('Por editar una Categoria');
    const id = this.productos[i].id;
    console.log(id);
    this.bsModalRef = this.modalService.productEdit('Categorias', 'Productos',  this.productos[i], this.categorias, i);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data),
      console.log(id);
      this.productRequest = this.constructorRequest(resp.data),
      this.productRequest.id = id,
      this.suscriptions.push( this.productService.putProduct(id, this.productRequest).subscribe(
                              response => {
                                           this.productos.splice(i, 1, response.data.productos[0]),
                                           this.swalService.success(`Producto editado con éxito`)
                                          },
                              error =>  this.swalService.error(`No se ha podido editar el producto.`)
                            )
      );
    });
  }

  removeProduct(i) {
    console.log('posicion: ' + i);
    const id = this.productos[i].id;
    this.productos.splice(i, 1);
    this.suscriptions.push(this.productService.deleteProduct(id).subscribe(
      response => this.swalService.success(`Producto eliminado con éxito`),
      error => this.swalService.error(`No se ha podido eliminar el producto.`)
    ));
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach(suscription => suscription.unsubscribe());
  }

}
