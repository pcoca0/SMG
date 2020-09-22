import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IInvoiceRequest } from 'src/app/core/interfaces/requests/invoice.request';
import { IVendorInvoiceRequest } from 'src/app/core/interfaces/requests/vendor-invoice.request';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { IVendorInvoiceItemResponse } from 'src/app/core/interfaces/responses/vendor-invoice.response';
import { IVendorItemResponse } from 'src/app/core/interfaces/responses/vendor.response';
import { IClientCategory, ILocation, IProfileAFIP } from 'src/app/core/interfaces/utils';
import { ClientService } from 'src/app/core/services/client.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { VendorInvoiceService } from 'src/app/core/services/vendor-invoice.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-add-vendor-invoice',
  templateUrl: './add-vendor-invoice.component.html',
  styleUrls: ['./add-vendor-invoice.component.scss']
})
export class AddVendorInvoiceComponent implements OnInit {

  today: number =  Date.now();
  totalizador: number;
  iva: number;

  
  totalizadorParcial = 0;
  productos: Array<IProductItemResponse>;
  facturasProveedores: Array<IVendorInvoiceItemResponse> = [];
  bsModalRef: BsModalRef;
  listForm: FormGroup;
  element: IProductItemResponse;
  proveedores: Array<IVendorItemResponse>;
  proveedor: IVendorItemResponse;
  proveedorView: IVendorItemResponse;
  vendorNew: IVendorItemResponse;
  vendorInvoiceRequest: IVendorInvoiceRequest = {numero: 0, proveedor: null, concepto: '', totalIva: 0, total: 0, subTotal:0, productos: []};
  flagEdit = false;
  proveedorSelected = false;
  producto: IProductItemResponse;
  localidades: Array<ILocation>;
  perfilesAFIP: Array<IProfileAFIP>;
  categoriasCliente: Array<IClientCategory>;

  private suscriptions: Subscription[] = [];


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
      private productService: ProductService,
      private vendorService: VendorService,
      private vendorInvoiceService: VendorInvoiceService,
      private fB: FormBuilder,
      private swalService: SwalService,
      private activateRoute: ActivatedRoute,
      private utilsService: UtilsService,
      private router: Router
  ) {
    this.listForm = this.fB.group({
      proveedor: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.suscriptions.push(
        this.productService.getProducts().subscribe(resp => { this.productos = resp.data.productos}),
        this.vendorService.getVendors().subscribe(resp => {this.proveedores = resp.data.proveedores}),
        this.utilsService.getLocalidades().subscribe(respL => this.localidades = respL),
        this.utilsService.getPerfilesAFIP().subscribe(respP => this.perfilesAFIP = respP)
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
                            this.listForm.controls.proveedor.setValue( resp.data.facturasProveedores[0].proveedores),
                            this.totalizador =  (resp.data.facturasProveedores[0]?.total - resp.data.facturasProveedores[0]?.totalIva) || 0,
                            this.iva = resp.data.facturasProveedores[0]?.totalIva || 0
                          })
                  );
    }

  }

  addVendorInvoiceItem() {
    this.bsModalRef = this.modalService.vendorInvoiceAdd('Factura', 'Productos', this.productos);
    this.bsModalRef.content.event.subscribe(
    resp => {
          if (this.vendorInvoiceRequest.productos.find(p => p.id === resp['data'].id)){
            this.swalService.warning(`El producto seleccionado ya esta en la lista.`)
          } else {
          console.log(resp['data']);
          this.vendorInvoiceRequest.productos.push(resp['data']);
          this.updateTotalizador();
          }
    });
 }


 addNewVendor(){
  console.log('Por agregar una Proveedor');
  this.bsModalRef = this.modalService.vendorAdd('Proveedor', 'Proveedores',   this.vendorNew , this.perfilesAFIP,
  this.localidades, this.categoriasCliente);
  this.bsModalRef.content.event.subscribe(
  resp => {
    this.suscriptions.push(this.vendorService.addVendor(resp.data).subscribe(
                    response => {
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
  this.clientView = this.listForm.value.client;
  this.clientSelected = true;
  this.flagDesgloseIVA = this.breakDown();
  this.categoriaCliente = this.clientView.categoriaCliente;
  this.invoiceRequest.cliente = this.clientView;
  console.log(this.clientView);
  }


  updateTotalizador() {
    console.log("subida");
    this.totalizador = 0.00;
    this.iva = 0.00;
    this.iva21 = 0.00;
    this.iva10 = 0.00;
    this.invoiceRequest.productos.forEach( i => {
      this.totalizador = this.totalizador + (i.precio * i.cantidad);
      this.iva = this.iva + (((i.precio * i.cantidad) * Number(i.iva.iva) ) / 100 );
      if ( i.iva.iva === 21 ) {
        this.iva21 = this.iva21 + (((i.precio * i.cantidad) * Number(i.iva.iva) ) / 100 );
      }else {
        this.iva10 = this.iva10 + (((i.precio * i.cantidad) * Number(i.iva.iva) ) / 100 );
      }
    });
  }

  removeElement(i: number) {
    console.log('posicion: ' + i);
    this.invoiceRequest.productos.splice(i, 1);
    this.updateTotalizador();
  }

  updateElement(i: number) {
    this.bsModalRef = this.modalService.invoiceEdit('Factura', 'Editar Producto', this.productos, this.invoiceRequest.productos[i], i );
    this.bsModalRef.content.event.subscribe(
      resp => {
        this.invoiceRequest.productos.splice(i, 1, resp.data),
        this.updateTotalizador()
      });
  }

  generateFormsControls(){

  }

  saveBudget() {
    this.invoiceRequest.ivaDesglose = this.flagDesgloseIVA;
    this.invoiceRequest.subTotal = this.totalizador;
    this.invoiceRequest.totalIva = this.iva,
    this.invoiceRequest.totalIva21 = this.iva21,
    this.invoiceRequest.totalIva10 = this.iva10,
    this.invoiceRequest.total = Number(this.totalizador + this.iva),

    this.invoiceRequest.fecha = new Date();
    console.log(this.invoiceRequest);
    if (this.flagEdit) {
      this.suscriptions.push(
        this.invoiceService.putInvoice(this.invoiceRequest.id, this.invoiceRequest).subscribe(
          response => this.swalService.success(`factura editada con éxito`),
          error => this.swalService.error(`No se ha podido editar la factura.`)
        )
      );
    } else {
      this.suscriptions.push(
        this.invoiceService.addInvoice(this.invoiceRequest).subscribe(
          response => {
                        this.swalService.success(`factura creada con éxito`),
                        this.router.navigate(['editarFactura', response.data.facturas[0].id]);
                      },
          error => this.swalService.error(`No se ha podido crear la factura.`)
        )
      );
    }
  }

 ngOnDestroy(): void {
    this.suscriptions.forEach( suscription => suscription.unsubscribe());
  }


  imprimirPDF(){
    this.router.navigate(['imprimirfacturas', this.invoiceRequest.id]);
  }

  breakDown(): boolean{
    if (this.clientView.perfilAFIP.descripcion.toUpperCase() === 'RESPONSABLE INSCRIPTO'){
      console.log(this.clientView.perfilAFIP.descripcion.toUpperCase());
     return true;
    }
    return false;
  }

}
