import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IProductRequest } from 'src/app/core/interfaces/requests/product.request';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { IVendorItemResponse } from 'src/app/core/interfaces/responses/vendor.response';
import { IClientCategory, IIva, ILocation, IPriceClientCategory, IProfileAFIP } from 'src/app/core/interfaces/utils';
import { ClientCategoryService } from 'src/app/core/services/client-category.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { VendorService } from 'src/app/core/services/vendor.service';
import { ITrackInfo } from '../../core/interfaces/utils';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  formProduct: FormGroup;
  product: IProductItemResponse = { id:'', descripcion:'', cantidad:0, precioCompra:0, ivaCompra:0, codigo:0, precio: 0, iva: { id: '', iva: 0}, stock: 0, precios: [], proveedor: null, comentario: '', seguimiento: false, seguimientoInfo: []};
  productRequest: IProductRequest = { id:'', descripcion:'', cantidad:0, precioCompra:0, ivaCompra:0, codigo:0, precio: 0, iva: { id: '', iva: 0}, stock: 0,
                                      precios: [], proveedor: null, comentario: '', seguimiento: false, seguimientoInfo: [] };
  categoriasCliente: Array<IClientCategory>;
  ivas: Array<IIva>;
  action: string;
  i: number;
  view: boolean;
  preciosArray: FormArray;
  preciosCategoriasCliente: Array<IPriceClientCategory> = [];
  precioCategoriaCliente: IPriceClientCategory = {id: '',  categoriaCliente: {id: '', descripcion: ''} , precio: 0 };
  proveedores: Array<IVendorItemResponse>;
  bsModalRef: BsModalRef;
  localidades: Array<ILocation>;
  perfilesAFIP: Array<IProfileAFIP>;
  vendorNew: IVendorItemResponse;
  productNew: IProductItemResponse;
  tracking: ITrackInfo;


  private suscriptions: Subscription[] = [];

  dropdownSetup : Object = {
    displayKey:'iva', //if objects array passed which key to be displayed defaults to description
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

  dropdownSetupProv : Object = {
    displayKey:'razonSocial', //if objects array passed which key to be displayed defaults to description
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
    private fb: FormBuilder,
    private productService: ProductService,
    private modalService: ModalService,
    private swalService: SwalService,
    private utilsService: UtilsService,
    private clientCategoryService: ClientCategoryService,
    private vendorService: VendorService,
    private router: Router

  ) {
    this.formProduct = this.fb.group({
      descripcion: ['', Validators.required],
      codigo: [0, Validators.required],
      precio: [0, Validators.required],
      iva: ['', Validators.required],
      proveedor: ['', Validators.required],
      stock: ['', Validators.required],
      comentario: [''],
      precios: this.fb.array([]),
      seguimiento: [''],
      seguimientoInfo: this.fb.array([])
    });
  }





  ngOnInit(): void {
    this.preciosArray = this.formProduct.controls.precios as FormArray;
    this.suscriptions.push(
      this.clientCategoryService.getClientCategories().subscribe(respC => {
                                                                  this.categoriasCliente = respC?.data?.['categoriasCliente'],
                                                                  this.categoriasCliente.forEach(c =>
                                                                  this.preciosArray.push(this.fb.group({
                                                                  id: [c.id],
                                                                  categoria: [ {value : 'Precio para ' + c.descripcion,  disabled: true} ],
                                                                  precio: [ 0, Validators.required]
                                                                  })))
                                                              }),
      this.utilsService.getIvas().subscribe( respIva => this.ivas = respIva),
      this.vendorService.getVendors().subscribe(resp => this.proveedores = resp.data.proveedores),
      this.utilsService.getLocalidades().subscribe(respL => this.localidades = respL),
      this.utilsService.getPerfilesAFIP().subscribe(respP => this.perfilesAFIP = respP),

      );
  }


  addNewVendor(){
    console.log('Por agregar una Proveedor');
    this.bsModalRef = this.modalService.vendorAdd('Proveedor', 'proveedores', this.vendorNew, this.perfilesAFIP,
                                                  this.localidades, this.categoriasCliente);
    this.bsModalRef.content.event.subscribe(
    resp => {
          this.suscriptions.push(this.vendorService.addVendor(resp.data).subscribe(
                                  response => {
                                        this.vendorNew = response.data.proveedores[0],
                                       //this.proveedores.push(this.vendorNew),
                                        this.proveedores = [...this.proveedores, this.vendorNew],
                                        this.formProduct.controls.proveedor.setValue(this.vendorNew),
                                        this.productRequest.proveedor = this.vendorNew,
                                        this.swalService.success(`Proveedor creado con éxito`)
                                      },
                                  error => this.swalService.error(`No se ha podido crear el proveedor.`)
                                  ));
            });

  }

  constructorRequest(resp: any){
    console.log(resp);
    this.productRequest.descripcion = resp.descripcion;
    this.productRequest.codigo = resp.codigo;
    this.productRequest.iva = resp.iva;
    this.productRequest.proveedor = resp.proveedor;
    this.productRequest.stock = resp.stock;
    this.productRequest.comentario = resp.comentario;
    this.productRequest.seguimiento =  resp.seguimiento;
    resp.seguimientoInfo.forEach( s =>
      {  
         this.tracking = {id: '', facturaCompra: null, codigo: '', facturaVenta: null, vendido: false, producto: null},
         this.tracking.codigo = s.codigo;
         this.productRequest.seguimientoInfo.push(this.tracking)
      }
    );
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

  get seguimientoInfo(): FormArray {
    return this.formProduct.get('seguimientoInfo') as FormArray;
  }

  trackInfo(){
   if(this.formProduct.controls.seguimiento.value){ 
      const c =  Number(this.formProduct.controls.stock.value);
      for (let index = 0; index < c; index++) {
        const track = this.fb.group({
          codigo : new FormControl('')
        });
        this.seguimientoInfo.push(track);
      }
   }
  }

  onSubmit(){
    console.log(this.formProduct.value);
    this.suscriptions.push(
      this.productService.addProduct( this.constructorRequest(this.formProduct.value)).subscribe(
      response => {
        console.log(response),
         this.productNew = response.data.productos[0],
         console.log(this.productNew),
         this.swalService.success(`Producto creado con éxito`),
         this.router.navigate(['productos'])
       },
      error => this.swalService.error(`No se ha podido crear el producto.`)
 ));
  }

}
