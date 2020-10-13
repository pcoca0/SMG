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
import { TokenService } from 'src/app/core/services/token.service';
import { IClientCategory, IIva, IPriceClientCategory } from '../../core/interfaces/utils';
import { ClientCategoryService } from '../../core/services/client-category.service';
import { PriceClientCategory } from 'src/app/core/models/utils';
import { UtilsService } from 'src/app/core/services/utils.service';
import { VendorService } from 'src/app/core/services/vendor.service';
import { IVendorItemResponse } from '../../core/interfaces/responses/vendor.response';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  productos: Array<IProductItemResponse>;
  proveedores: Array<IVendorItemResponse>;
  filterMatch: string;
  categorias: Array<ICategoryItemResponse>;
  bsModalRef: BsModalRef;
  product: IProductItemResponse = { id:'', descripcion:'', precioCompra: 0, ivaCompra: 0,cantidad:0, codigo:0, precio: 0, iva: { id: '', iva: 0}, stock: 0, precios: [], proveedor: null, comentario:''};
  productRequest: IProductRequest = { id:'', descripcion:'', precioCompra: 0, ivaCompra: 0,cantidad:0, codigo:0, precio: 0, iva: { id: '', iva: 0}, stock: 0, precios: [], proveedor: null, comentario:''};
  productNew: IProductItemResponse;
  isAdmin: boolean = true;
  ivas: Array<IIva>;
  categoriasCliente: Array<IClientCategory>;
  preciosCategoriasCliente: Array<IPriceClientCategory> = [];
  precioCategoriaCliente: IPriceClientCategory = {id: '',  categoriaCliente: {id: '', descripcion: ''} , precio: 0 };
  private suscriptions: Subscription[] = [];
  page: number  = 1;



  constructor(
    private productService: ProductService,
    private modalService: ModalService,
    private swalService: SwalService,
    private tokenService: TokenService,
    private utilsService: UtilsService,
    private clientCategoryService: ClientCategoryService,
    private vendorService: VendorService,

  ) { }





  ngOnInit() {
    this.suscriptions.push(
                this.productService.getProducts().subscribe(resp => this.productos = resp.data.productos),
                this.clientCategoryService.getClientCategories().subscribe(respC =>
                                           this.categoriasCliente = respC?.data?.['categoriasCliente']
                                      ),
                this.utilsService.getIvas().subscribe( respIva => this.ivas = respIva),
                this.vendorService.getVendors().subscribe(resp => this.proveedores = resp.data.proveedores),

  );

    this.tokenService.getAuthorities().forEach(
      rol => {if (rol['authority'] === 'ROL_ADMIN') { this.isAdmin = true; } }
    );
  }

  search(term: string){
     this.filterMatch = term;
   }

   constructorRequest(resp: any){
     console.log(resp);
     this.productRequest.descripcion = resp.descripcion;
     this.productRequest.codigo = resp.codigo;
     this.productRequest.iva = resp.iva;
     this.productRequest.proveedor = resp.proveedor;
     this.productRequest.stock = resp.stock;
     this.productRequest.comentario = resp.comentario;

     this.productRequest.precios = [];
     for (let i = 0; i < resp.precios.length; i++) {
        this.precioCategoriaCliente = {id: '',  categoriaCliente: {id: '', descripcion: ''} , precio: 0 };
        this.precioCategoriaCliente.categoriaCliente.id = resp.precios[i].id;
        this.precioCategoriaCliente.precio = resp.precios[i].precio;
        this.productRequest.precios.push(this.precioCategoriaCliente);
      }
     console.log(this.productRequest);
     return this.productRequest;
   }

   addNewProduct(){
    console.log('Por agregar una Producto');

    console.log(this.preciosCategoriasCliente);
    this.bsModalRef = this.modalService.productAdd('Producto', 'Productos', this.product, this.categoriasCliente,
                                                    this.proveedores, this.ivas);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log("disparo"),
      console.log(resp.data),
              this.suscriptions.push(this.productService.addProduct( this.constructorRequest(resp.data)).subscribe(
                  response => {
                    console.log(response),
                     this.productNew = response.data.productos[0],
                     console.log(this.productNew),
                     this.productos.push(this.productNew),
                     this.swalService.success(`Producto creado con éxito`)
                   },
                  error => this.swalService.error(`No se ha podido crear el producto.`)
             ));
    });
  }

  editProduct(id: string){

    console.log('Por editar una Categoria');
    const pos = this.productos.findIndex(p =>  p.id === id);

    console.log(pos);
    this.bsModalRef = this.modalService.productEdit('Producto', 'Productos',  this.productos[pos], this.categoriasCliente,
                                                     this.proveedores, this.ivas,  pos);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data),
      console.log(id);
      this.productRequest = this.constructorRequest(resp.data),
      this.productRequest.id = id,
      this.suscriptions.push( this.productService.putProduct(id, this.productRequest).subscribe(
                              response => {
                                           this.productos.splice(pos, 1, response.data.productos[0]),
                                           this.swalService.success(`Producto editado con éxito`)
                                          },
                              error =>  this.swalService.error(`No se ha podido editar el producto.`)
                            )
      );
    });
  }

  removeProduct(id: string) {
    //console.log('posicion: ' + i);
    const pos = this.productos.findIndex(p =>  p.id === id);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir este cambio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#DF1B1A',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) { // Llamar servicio
        this.suscriptions.push(this.productService.deleteProduct(id).subscribe(
          response => {
              this.productos.splice(pos, 1),
              this.swalService.success(`Producto eliminado con éxito`)
            },
            error => {
              this.swalService.error(`No se ha podido eliminar el producto.`)
            })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach(suscription => suscription.unsubscribe());
  }

}
