import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClientItemResponse } from 'src/app/core/interfaces/responses/client.response';
import { ClientService } from 'src/app/core/services/client.service';
import { Subscription } from 'rxjs';
import { SwalService } from '../../core/services/swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import { IClientCategory, IProfileAFIP, ILocation } from 'src/app/core/interfaces/utils';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ClientCategoryService } from 'src/app/core/services/client-category.service';
import { IInvoiceRequest } from 'src/app/core/interfaces/requests/invoice.request';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { IInvoiceItemResponse } from 'src/app/core/interfaces/responses/invoice.response';
@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit, OnDestroy {

  today: number =  Date.now();
  totalizador: number;
  iva: number;
  iva21: number;
  iva10: number;
  
  totalizadorParcial = 0;
  productos: Array<IProductItemResponse>;
  facturas: Array<IInvoiceItemResponse> = [];
  bsModalRef: BsModalRef;
  listForm: FormGroup;
  element: IProductItemResponse;
  clients: Array<IClientItemResponse>;
  client: IClientItemResponse;
  clientView: IClientItemResponse;
  invoiceRequest: IInvoiceRequest = {cliente: null, ivaDesglose: false, productos: []};
  flagEdit = false;
  clientSelected = false;
  producto: IProductItemResponse;
  categoriaCliente: IClientCategory;
  localidades: Array<ILocation>;
  perfilesAFIP: Array<IProfileAFIP>;
  categoriasCliente: Array<IClientCategory>;
  flagDesgloseIVA: boolean = false;

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
      private clientService: ClientService,
      private invoiceService: InvoiceService,
      private fB: FormBuilder,
      private swalService: SwalService,
      private activateRoute: ActivatedRoute,
      private utilsService: UtilsService,
      private clientCategoryService: ClientCategoryService,
      private router: Router
  ) {
    this.listForm = this.fB.group({
      client: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.suscriptions.push(
        this.productService.getProducts().subscribe(resp => { this.productos = resp.data.productos}),
        this.clientService.getClients().subscribe(resp => {this.clients = resp.data.clientes}),
        this.utilsService.getLocalidades().subscribe(respL => this.localidades = respL),
        this.utilsService.getPerfilesAFIP().subscribe(respP => this.perfilesAFIP = respP),
        this.clientCategoryService.getClientCategories().subscribe(respC => this.categoriasCliente = respC?.data?.['categoriasCliente'])

   );
    if (this.activateRoute.snapshot.paramMap.get('id')) {
      this.flagEdit = true;
      this.clientSelected = true;
      this.suscriptions.push(
                  this.invoiceService.getInvoice(this.activateRoute.snapshot.paramMap.get('id')).subscribe(
                  resp => {
                            this.client = resp.data.facturas[0].cliente,
                            this.invoiceRequest = resp.data.facturas[0],
                            console.log(this.invoiceRequest);
                            this.clientView =  resp.data.facturas[0].cliente,
                            this.listForm.controls.client.setValue( resp.data.facturas[0].cliente),
                            this.flagDesgloseIVA = resp.data.facturas[0]?.ivaDesglose,
                            this.totalizador =  (resp.data.facturas[0]?.total - resp.data.facturas[0]?.totalIva) || 0,
                            this.iva21 = resp.data.facturas[0]?.totalIva21 || 0,
                            this.iva10 = resp.data.facturas[0]?.totalIva10 || 0,
                            this.iva = resp.data.facturas[0]?.totalIva || 0
                          })
                  );
    }

  }

  addBudgetItem() {
    this.bsModalRef = this.modalService.invoiceAdd('Factura', 'Productos', this.productos, this.categoriaCliente);
    this.bsModalRef.content.event.subscribe(
    resp => {
          if (this.invoiceRequest.productos.find(p => p.id === resp['data'].id)){
            this.swalService.warning(`El producto seleccionado ya esta en la lista.`)
          } else {
          console.log(resp['data']);
          this.invoiceRequest.productos.push(resp['data']);
          this.updateTotalizador();
          }
    });
 }


 addNewClient(){
  console.log('Por agregar una cliente');
  this.bsModalRef = this.modalService.clientAdd('Cliente', 'Clientes', this.client, this.perfilesAFIP,
  this.localidades, this.categoriasCliente);
  this.bsModalRef.content.event.subscribe(
  resp => {
    this.suscriptions.push(this.clientService.addClient(resp.data).subscribe(
                    response => {
                     this.clientView = response.data.clientes[0],
                    //this.clients.push(this.client),
                    //this.options = [...this.options, {id: 34, description: 'Adding new item'}];
                    //lo tengo que hacer asi por el change detec
                    this.clients = [...this.clients, this.clientView],
                    this.listForm.controls.client.setValue(this.clientView),
                    this.invoiceRequest.cliente = this.clientView,
                    this.clientSelected = true,
                    this.categoriaCliente = this.clientView.categoriaCliente,
                    console.log(this.clientView)
  }));
  });
}

  selectClient() {
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
