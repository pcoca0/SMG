import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IVendorInvoiceItemResponse } from 'src/app/core/interfaces/responses/vendor-invoice.response';
import { IBank, ILocation, IPayment } from 'src/app/core/interfaces/utils';
import { ModalService } from 'src/app/core/services/modal.service';
import { ITypeOfPaymentMethods } from '../../core/interfaces/utils';
import { IPayOrderRequest } from '../../core/interfaces/requests/pay-order.request';
import { PayOrderService } from 'src/app/core/services/pay-order.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/core/services/utils.service';
import { VendorInvoiceService } from 'src/app/core/services/vendor-invoice.service';
import { CheckService } from '../../core/services/check.service';
import { ICheckItemResponse } from '../../core/interfaces/responses/check.response';
import { Subscription } from 'rxjs';
import { IVendorInvoiceResponse } from '../../core/interfaces/responses/vendor-invoice.response';

@Component({
  selector: 'app-add-pay-orders',
  templateUrl: './add-pay-orders.component.html',
  styleUrls: ['./add-pay-orders.component.scss']
})
export class AddPayOrdersComponent implements OnInit, OnDestroy {

  today: number =  Date.now();
  totalizador: number;

  totalizadorParcial = 0;
  pagos: Array<IPayment>;
  bancos: Array<IBank>;
  cheques: Array<ICheckItemResponse>;
  tiposDePago: Array<ITypeOfPaymentMethods>;
  facturasProveedor: Array<IVendorInvoiceItemResponse> = [];
  bsModalRef: BsModalRef;
  listForm: FormGroup;
  element: IPayment;
  facturaProveedorView: IVendorInvoiceItemResponse;
  payOrderRequest: IPayOrderRequest = {id:'', fechaPago: null , numero: 0, facturaProveedor: null, pagos:[] ,totalPago: 0,saldoAdeudado: 0,saldoAFavor: 0 };
  flagEdit = false;
  clientSelected = false;
  localidades: Array<ILocation>;
  idProveedor: string;
  invoiceView: IVendorInvoiceItemResponse;
  invoiceSelected: boolean;
  totalFactura: number;

  private suscriptions: Subscription[] = [];


  dropdownSetup: object = {
    displayKey:'numero', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Selecciona', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'Más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No se encontraron resultados!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Buscar', // label thats displayed in search input,
    searchOnKey: 'numero', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  constructor(
    private modalService: ModalService,
    private payOrderService: PayOrderService,
    private checkService: CheckService,
    private fB: FormBuilder,
    private swalService: SwalService,
    private activateRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private vendorInvoiceService: VendorInvoiceService,
    private router: Router
) {
  this.listForm = this.fB.group({
    vendorInvoice: ['', Validators.required]
  });
}

ngOnInit() {
  this.idProveedor = this.activateRoute.snapshot.paramMap.get('idProveedor');
  this.suscriptions.push(
      this.vendorInvoiceService.getVendorInvoiceUnPaid(this.idProveedor).
                        subscribe(resp => this.facturasProveedor = resp.data.facturasProveedores),
      this.utilsService.getBancos().subscribe(resp => this.bancos = resp ),
      this.utilsService.getTiposDePagos().subscribe(respT => this.tiposDePago = respT),
      this.utilsService.getLocalidades().subscribe(respL => this.localidades = respL),
      this.checkService.getFreeChecks().subscribe(respC => this.cheques = respC.data.cheques)
 );
  if (this.activateRoute.snapshot.paramMap.get('id')) {
    this.flagEdit = true;
    this.invoiceSelected = true;
    this.suscriptions.push(
                this.payOrderService.getPayOrder(this.activateRoute.snapshot.paramMap.get('id')).subscribe(
                resp => {
                          this.facturaProveedorView = resp.data.ordenesDePago[0].facturaProveedor,
                          this.invoiceView =  resp.data.ordenesDePago[0].facturaProveedor,
                          this.listForm.value.vendorInvoice = resp.data.ordenesDePago[0].facturaProveedor,
                          this.payOrderRequest = resp.data.ordenesDePago[0],
                          this.totalFactura = this.invoiceView.total,
                          this.totalizador =  resp.data.ordenesDePago[0].totalPago
                        })
                );
  }

}

addPaymentItem() {
  this.bsModalRef = this.modalService.paymentAdd('Orden de Pago', 'Pago', this.tiposDePago, this.cheques, this.bancos);
  this.bsModalRef.content.event.subscribe(
  resp => {
        if (this.payOrderRequest.pagos.find(p => p.tipoDePago.id === resp.data.tipoDePago.id )){
          if ( resp.data.tipoDePago.referencia === 'CHEQUE' &&  this.payOrderRequest.pagos.find(p => p.cheque.nroCheque === resp.data.cheque.nroCheque)) {
            this.swalService.warning(`El cheque seleccionado ya esta ingresado como forma de pago.`);
           } else if(resp.data.tipoDePago.referencia === 'EFECTIVO') {
            this.swalService.warning(`Ya agrego efectivo como forma pago, edite el importe de la existente`);
           } else {
            console.log(resp);
            this.payOrderRequest.pagos.push(resp.data);
            this.updateTotalizador();
           }
        } else {
          console.log(resp);
          this.payOrderRequest.pagos.push(resp.data);
          this.updateTotalizador();
        }
  });
}

selectInvoice() {
this.invoiceView = this.listForm.value.vendorInvoice;
this.invoiceSelected = true;
this.payOrderRequest.facturaProveedor = this.invoiceView;
this.totalFactura = this.invoiceView.total;
console.log(this.invoiceView);
}


updateTotalizador() {
  console.log("subida");
  this.totalizador = 0.00;
  this.payOrderRequest.pagos.forEach( i => {
  this.totalizador = this.totalizador + Number(i.importe);
  });
}

removeElement(i: number) {
  console.log('posicion: ' + i);
  this.payOrderRequest.pagos.splice(i, 1);
  this.updateTotalizador();
}

updateElement(i: number) {
  console.log( this.payOrderRequest.pagos[i]);
  this.bsModalRef = this.modalService.paymentEdit('Orden de Pago', 'Pago', this.tiposDePago, this.cheques, this.bancos,
                    this.payOrderRequest.pagos[i], i );
  this.bsModalRef.content.event.subscribe(
    resp => {
      this.payOrderRequest.pagos.splice(i, 1, resp.data);
      this.updateTotalizador();
    });
}

savePayOrder() {
  this.payOrderRequest.fechaPago = new Date();
  this.payOrderRequest.facturaProveedor = this.invoiceView;
  this.payOrderRequest.totalPago = this.totalizador;
  if(this.totalizador > this.totalFactura){
    this.payOrderRequest.saldoAFavor = this.totalizador -  this.totalFactura;
  }
  console.log(this.payOrderRequest);
  
  this.suscriptions.push(
    this.payOrderService.addPayOrder(this.payOrderRequest).subscribe(
      response => {
                    this.swalService.success(`Orden de Pago creada con éxito`)
                    this.router.navigate(['editarOrdenDePago', response.data.ordenesDePago[0].id]);
                  },
      error => this.swalService.error(`No se ha podido crear la orden de pago.`)
    )
    );
  
}

ngOnDestroy(): void {
  this.suscriptions.forEach( suscription => suscription.unsubscribe());
}

}
