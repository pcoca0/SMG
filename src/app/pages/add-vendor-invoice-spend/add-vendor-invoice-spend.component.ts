import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IProductRequest } from 'src/app/core/interfaces/requests/product.request';
import { IVendorInvoiceRequest } from 'src/app/core/interfaces/requests/vendor-invoice.request';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { IVendorItemResponse } from 'src/app/core/interfaces/responses/vendor.response';
import { IClientCategory, IIva, ILocation, IProfileAFIP } from 'src/app/core/interfaces/utils';
import { ClientCategoryService } from 'src/app/core/services/client-category.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { VendorInvoiceService } from 'src/app/core/services/vendor-invoice.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-add-vendor-invoice-spend',
  templateUrl: './add-vendor-invoice-spend.component.html',
  styleUrls: ['./add-vendor-invoice-spend.component.scss']
})
export class AddVendorInvoiceSpendComponent implements OnInit, OnDestroy {

  today: number =  Date.now();
  totalizador: number;
  iva: number;

   
  totalizadorParcial = 0;
  bsModalRef: BsModalRef;

  listForm: FormGroup;
  proveedores: Array<IVendorItemResponse>;
  proveedor: IVendorItemResponse;
  proveedorView: IVendorItemResponse;
  vendorNew: IVendorItemResponse;
  vendorInvoiceRequest: IVendorInvoiceRequest = {numero: 0, proveedor: null, concepto: '', totalIva: 0, total: 0, subTotal:0, productos: []};
  flagEdit = false;
  proveedorSelected = false;
  localidades: Array<ILocation>;
  perfilesAFIP: Array<IProfileAFIP>;
  product: IProductItemResponse = { id:'', descripcion:'', precioCompra: 0, ivaCompra: 0,cantidad:0, codigo:0, precio: 0, iva: { id: '', iva: 0}, stock: 0, precios: [], proveedor: null, comentario:''};
  productRequest: IProductRequest = { id:'', descripcion:'', precioCompra: 0, ivaCompra: 0,cantidad:0, codigo:0, precio: 0, iva: { id: '', iva: 0}, stock: 0, precios: [], proveedor: null, comentario:''};
  productNew: IProductItemResponse;
  ivas: Array<IIva>;
  categoriasCliente: Array<IClientCategory>;
  bsValue: Date = new Date();

  private suscriptions: Subscription[] = [];
  myDateValue: Date;
  dateCustomClasses = [
    {  classes: [] },
    { classes: ['bg-warning'] },
    {  classes: ['bg-danger', 'text-warning'] }
  ];

  dropdownSetup: object = {
    displayKey:'razonSocial', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Selecciona', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    //limitTo: options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'Más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No se encontraron resultados!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Buscar', // label thats displayed in search input,
    searchOnKey: 'razonSocial', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  constructor(
      private modalService: ModalService,
      private vendorService: VendorService,
      private vendorInvoiceService: VendorInvoiceService,
      private fB: FormBuilder,
      private swalService: SwalService,
      private activateRoute: ActivatedRoute,
      private utilsService: UtilsService,
      private clientCategoryService: ClientCategoryService,
      private router: Router
  ) {
    this.listForm = this.fB.group({
      proveedor: ['', Validators.required],
      numero: ['', Validators.required],
      fecha: ['', Validators.required],
      concepto: ['', Validators.required],
      subtotal: ['', Validators.required],
      iva: ['', Validators.required],
      total: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.suscriptions.push(
        // this.productService.getProducts().subscribe(resp => { this.productos = resp.data.productos}),
        this.utilsService.getLocalidades().subscribe(respL => this.localidades = respL),
        this.utilsService.getPerfilesAFIP().subscribe(respP => this.perfilesAFIP = respP),
        this.utilsService.getIvas().subscribe( respIva => this.ivas = respIva),
        this.vendorService.getVendors().subscribe(resp => this.proveedores = resp.data.proveedores),
   );
    if (this.activateRoute.snapshot.paramMap.get('id')) {
      this.flagEdit = true;
      this.proveedorSelected = true;
      this.suscriptions.push(
                  this.vendorInvoiceService.getVendorInvoice(this.activateRoute.snapshot.paramMap.get('id')).subscribe(
                  resp => {
                            this.proveedor = resp.data.facturasProveedores[0].proveedor,
                            this.vendorInvoiceRequest = resp.data.facturasProveedores[0],
                            console.log(this.vendorInvoiceRequest);
                            this.proveedorView =  resp.data.facturasProveedores[0].proveedor,
                            this.listForm.controls.proveedor.setValue( resp.data.facturasProveedores[0].proveedor),
                            this.listForm.controls.concepto.setValue( resp.data.facturasProveedores[0].concepto),
                            this.listForm.controls.fecha.setValue( resp.data.facturasProveedores[0].fecha),
                            this.bsValue = new Date(resp.data.facturasProveedores[0].fecha);
                            this.listForm.controls.numero.setValue( resp.data.facturasProveedores[0].numero),
                            this.listForm.controls.iva.setValue( resp.data.facturasProveedores[0].totalIva),
                            this.listForm.controls.subtotal.setValue( resp.data.facturasProveedores[0].subTotal),
                            this.listForm.controls.total.setValue( resp.data.facturasProveedores[0].total)

                          })
                  );
    }

  }

 addNewVendor(){
  console.log('Por agregar una Proveedor');
  this.bsModalRef = this.modalService.vendorAdd('Proveedor', 'Proveedores',   this.vendorNew , this.perfilesAFIP,
  this.localidades, this.categoriasCliente);
  this.bsModalRef.content.event.subscribe(
  resp => {
    console.log('del modal lo que viene');
    console.log(resp);
    this.suscriptions.push(this.vendorService.addVendor(resp.data).subscribe(
                    response => {
                     console.log(response);
                     this.proveedorView = response.data.proveedores[0],
                    //this.clients.push(this.client),
                    //this.options = [...this.options, {id: 34, description: 'Adding new item'}];
                    //lo tengo que hacer asi por el change detec
                    this.proveedores = [...this.proveedores, this.proveedorView],
                    this.listForm.controls.proveedor.setValue(this.proveedorView),
                    this.vendorInvoiceRequest.proveedor = this.proveedorView,
                    this.proveedorSelected = true
  }));
  });
}

selectProveedor() {
  this.proveedorView = this.listForm.value.proveedor;
  this.proveedorSelected = true;
  this.vendorInvoiceRequest.proveedor = this.proveedorView;
  console.log('proveedor' + this.proveedorView);
  }


  // removeElement(i: number) {
  //   console.log('posicion: ' + i);
  //   this.vendorInvoiceRequest.productos.splice(i, 1);
  //   this.updateTotalizador();
  // }

  // updateElement(i: number) {
  //   this.bsModalRef = this.modalService.vendorInvoiceEdit('Factura', 'Editar Producto', this.productos, this.vendorInvoiceRequest.productos[i], i );
  //   this.bsModalRef.content.event.subscribe(
  //     resp => {
  //       this.vendorInvoiceRequest.productos.splice(i, 1, resp.data),
  //       this.updateTotalizador()
  //     });
  // }

  saveVendorSpend() {
    this.vendorInvoiceRequest.subTotal = this.listForm.value.subtotal;
    this.vendorInvoiceRequest.totalIva = this.listForm.value.iva,
    this.vendorInvoiceRequest.total = this.listForm.value.total,
    this.vendorInvoiceRequest.concepto = this.listForm.value.concepto;
    this.vendorInvoiceRequest.fecha = this.listForm.value.fecha;
    this.vendorInvoiceRequest.numero = this.listForm.value.numero;


    console.log(this.vendorInvoiceRequest);
    if (this.flagEdit) {
      // this.suscriptions.push(
      //   this.vendorInvoiceService.putVendorInvoice(this.vendorInvoiceRequest.id, this.vendorInvoiceRequest).subscribe(
      //     response => this.swalService.success(`Factura proveedor editada con éxito`),
      //     error => this.swalService.error(`No se ha podido editar la factura.`)
      //   )
      // );
    } else {
      this.suscriptions.push(
        this.vendorInvoiceService.addVendorInvoice(this.vendorInvoiceRequest).subscribe(
          response => {
                        this.swalService.success(`Factura  Proveedor creada con éxito`),
                        this.router.navigate(['editarGastoProveedor', response.data.facturasProveedores[0].id]);
                      },
          error => this.swalService.error(`No se ha podido crear la factura.`)
        )
      );
    }
  }

 ngOnDestroy(): void {
    this.suscriptions.forEach( suscription => suscription.unsubscribe());
  }


}
