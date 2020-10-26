import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IBillRequest } from 'src/app/core/interfaces/requests/bill.request';
import { ICheckItemResponse } from 'src/app/core/interfaces/responses/check.response';
import { IInvoiceItemResponse } from 'src/app/core/interfaces/responses/invoice.response';
import { IVendorInvoiceItemResponse } from 'src/app/core/interfaces/responses/vendor-invoice.response';
import { IBank, ILocation, IPayment, ITypeOfPaymentMethods } from 'src/app/core/interfaces/utils';
import { BillingService } from 'src/app/core/services/billing.service';
import { CheckService } from 'src/app/core/services/check.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit, OnDestroy {
  today: number =  Date.now();
  totalizador: number;

  totalizadorParcial = 0;
  pagos: Array<IPayment>;
  bancos: Array<IBank>;
  cheques: Array<ICheckItemResponse>;
  tiposDePago: Array<ITypeOfPaymentMethods>;
  facturas: Array<IInvoiceItemResponse> = [];
  bsModalRef: BsModalRef;
  listForm: FormGroup;
  element: IPayment;
  facturaView: IInvoiceItemResponse;
  billRequest: IBillRequest = {id:'', fechaCobro: null , numero: 0, factura: null, pagosRecibidos: [] ,totalCobro: 0, saldoAFavorCliente: 0 };
  flagEdit = false;
  clientSelected = false;
  localidades: Array<ILocation>;
  idCliente: string;
  invoiceView: IInvoiceItemResponse;
  invoiceSelected: boolean;
  totalFactura: number;
  elementTwo: IPayment;


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
    private billService: BillingService,
    private checkService: CheckService,
    private fB: FormBuilder,
    private swalService: SwalService,
    private activateRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private invoiceService: InvoiceService,
    private router: Router
) {
  this.listForm = this.fB.group({
    invoice: ['', Validators.required]
  });
}

ngOnInit() {
  this.idCliente = this.activateRoute.snapshot.paramMap.get('idCliente');
  this.suscriptions.push(
      this.invoiceService.geInvoiceUnPaid(this.idCliente).
                        subscribe(resp => this.facturas = resp.data.facturas),
      this.utilsService.getBancos().subscribe(resp => this.bancos = resp ),
      this.utilsService.getTiposDePagos().subscribe(respT => this.tiposDePago = respT),
      this.utilsService.getLocalidades().subscribe(respL => this.localidades = respL),
      this.checkService.getFreeChecks().subscribe(respC => this.cheques = respC.data.cheques)
 );
  if (this.activateRoute.snapshot.paramMap.get('id')) {
    this.flagEdit = true;
    this.invoiceSelected = true;
    this.suscriptions.push(
                this.billService.getBill(this.activateRoute.snapshot.paramMap.get('id')).subscribe(
                resp => {
                          this.facturaView = resp.data.cobros[0].factura,
                          this.invoiceView =  resp.data.cobros[0].factura,
                          this.listForm.value.vendorInvoice = resp.data.cobros[0].factura,
                          this.billRequest = resp.data.cobros[0],
                          this.totalFactura = this.invoiceView.total,
                          this.totalizador =  resp.data.cobros[0].totalCobro
                        })
                );
  }

}

addPaymentItem() {
  this.bsModalRef = this.modalService.paymentAdd('Cobro', 'Pago Recibido', this.tiposDePago, this.cheques, this.bancos);
  this.bsModalRef.content.event.subscribe(
  resp => {
        if (this.billRequest.pagosRecibidos.find(p => p.tipoDePago.id === resp.data.tipoDePago.id )){
          if (this.billRequest.pagosRecibidos.find(p => p.cheque.nroCheque === resp.data.cheque.nroCheque)) {
            this.swalService.warning(`El cheque seleccionado ya esta ingresado como forma de pago.`);
           } else if(resp.data.tipoDePago.referencia === 'EFECTIVO') {
            this.swalService.warning(`Ya agrego efectivo como forma pago, edite el importe de la existente`); 
           } else {
            this.billRequest.pagosRecibidos.push(resp.data);
            this.updateTotalizador();
           }

        } else {
          console.log(resp);
          this.billRequest.pagosRecibidos.push(resp.data);
          this.updateTotalizador();
        }
  });
}

selectInvoice() {
this.invoiceView = this.listForm.value.invoice;
this.invoiceSelected = true;
this.billRequest.factura = this.invoiceView;
this.totalFactura = this.invoiceView.total;
console.log(this.invoiceView);
}


updateTotalizador() {
  console.log("subida");
  this.totalizador = 0.00;
  this.billRequest.pagosRecibidos.forEach( i => {
  this.totalizador = this.totalizador + Number(i.importe);
  });
}

removeElement(i: number) {
  console.log('posicion: ' + i);
  this.billRequest.pagosRecibidos.splice(i, 1);
  this.updateTotalizador();
}

updateElement(i: number) {
  console.log( this.billRequest.pagosRecibidos[i]);
  this.bsModalRef = this.modalService.paymentEdit('Cobros', 'Pago Recibido', this.tiposDePago, this.cheques, this.bancos,
                    this.billRequest.pagosRecibidos[i], i );
  this.bsModalRef.content.event.subscribe(
    resp => {
      this.billRequest.pagosRecibidos.splice(i, 1, resp.data);
      this.updateTotalizador();
    });
}

saveBill() {
  this.billRequest.fechaCobro = new Date();
  this.billRequest.factura = this.invoiceView;
  this.billRequest.totalCobro = this.totalizador;
  if(this.totalizador > this.totalFactura){
    this.billRequest.saldoAFavorCliente = this.totalizador -  this.totalFactura;
  }
  console.log(this.billRequest);

  this.suscriptions.push(
    this.billService.addBill(this.billRequest).subscribe(
      response => {
                    this.swalService.success(`Cobro registrado con éxito`)
                    this.router.navigate(['editarCobro', response.data.cobros[0].id]);
                  },
      error => this.swalService.error(`No se ha podido registar el cobro.`)
    )
    );
}

ngOnDestroy(): void {
  this.suscriptions.forEach( suscription => suscription.unsubscribe());
}

}
