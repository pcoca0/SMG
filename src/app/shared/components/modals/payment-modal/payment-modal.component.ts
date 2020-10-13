import { UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ICheckRequest } from 'src/app/core/interfaces/requests/check.request';
import { ICheckItemResponse } from 'src/app/core/interfaces/responses/check.response';
import { IBank, ILocation, IPayment, ITypeOfPaymentMethods } from 'src/app/core/interfaces/utils';
import { CheckService } from 'src/app/core/services/check.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {

  title: string;
  label: string;
  message: string;
  typeOfPayments: Array<ITypeOfPaymentMethods>;
  checks: Array<ICheckItemResponse>;
  banks?: Array<IBank>;
  itemForm: FormGroup;
  public event: EventEmitter<any> = new EventEmitter();
  i: number;
  action: string;

  bancos: Array<IBank>;
  cheques: Array<ICheckItemResponse> = [];
  checkRequest: ICheckRequest;
  localidades: Array<ILocation>;


  chequeFlat = false;
  transferenciaFlat = false;
  efectivoFlat = false;
  tipoFormaDePago: ITypeOfPaymentMethods;
  chequeSelected: ICheckItemResponse;
  checkNew: ICheckItemResponse;
  private suscriptions: Subscription[] = [];
  payment: IPayment =  
  {  id: '',
     tipoDePago: {id: '', descripcion: '', referencia: ''},
     cheque: {id: '', banco: {id: '', descripcion: ''}, fechaEmision: null, fechaPago: null, fechaCarga: null, localidad: { id: '', descripcion:'', codigoPostal:0}, nroCheque: 0, importe: 0, echeque: false, comentario: ''},
     transferencia: {id: '', CBU: '', alias: '',titularCuenta: '', banco: { id: '', descripcion:''}, importe: 0, realizada: false, recibida: false},
     importe: 0
  };


  dropdownSetup: Object = {
    displayKey:'descripcion', //if objects array passed which key to be displayed defaults to description
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
  }

  dropdownSetupC: Object = {
    displayKey:'nroCheque', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Selecciona', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    //limitTo: options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'Más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No se encontraron resultados!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Buscar', // label thats displayed in search input,
    searchOnKey: 'nroCheque', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  dropdownSetupB: Object = {
    displayKey:'descripcion', //if objects array passed which key to be displayed defaults to description
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
  }

  constructor(
      private fb: FormBuilder,
      private bsModalRef: BsModalRef,
      private swalService: SwalService,
      private modalService: ModalService,
      private utilsService: UtilsService,
      private checkService: CheckService,

      ) {

    this.itemForm = this.fb.group({
      tipoDePago: ['', Validators.required],
      importe: ['', Validators.required],
      cheque: [''],
      CBU: [''],
      alias: [''],
      banco: [''],
      titularCuenta: [''],
      realizada: [''],
      payment: [this.payment]

      });

  }


    ngOnInit() {
      this.suscriptions.push(
        this.utilsService.getLocalidades().subscribe(respL => this.localidades = respL),
    );

      if (this.payment && this.action === 'edit') {
        console.log( this.payment);
        // this.itemForm.value.producto.se = this.payment;
        this.itemForm.patchValue({
        tipoDePago: this.payment.tipoDePago,
        importe: this.payment.importe,
        cheque: this.payment.cheque,
        CBU: this.payment.transferencia.CBU,
        alias: this.payment.transferencia.alias,
        banco: this.payment.transferencia.banco,
        titularCuenta: this.payment.transferencia.titularCuenta,
        realizada: this.payment.transferencia.realizada,
        payment: this.payment
      });
        this.selectTypeOfPayment();
        if (this.payment.cheque != null){
          this.chequeSelected = this.payment.cheque;
        }
      }
  }

  sendObject(item: string, pos?: number) {
    this.event.emit({data: item, position: pos, res: 200});
  }

  selectTypeOfPayment(){
    this.tipoFormaDePago = this.itemForm.value.tipoDePago;
    console.log("eligio forma de pago");
    console.log(this.tipoFormaDePago);
    switch ( this.tipoFormaDePago.referencia.toUpperCase( )) {
      case 'CHEQUE':
          this.chequeFlat = true;
          this.transferenciaFlat = false;
          this.efectivoFlat = false;
          break;
      case 'TRANSFERENCIA':
          this.chequeFlat = false;
          this.transferenciaFlat = true;
          this.efectivoFlat = false;
          break;
      case 'EFECTIVO':
          this.chequeFlat = false;
          this.transferenciaFlat = false;
          this.efectivoFlat = true;
          break;

      default:
        break;
    }
    // this.producto = this.itemForm.value.producto;
    // if (this.producto.stock > 0){
    //   this.precio = this.producto.precios.find( p => p.categoriaCliente.id === this.clientCategory.id);
    //   this.itemForm.controls.precio.setValue(this.precio.precio);
    //   this.itemForm.value.producto.precio = Number(this.precio.precio)
    //   this.stockDisponible = this.producto.stock;
    // } else {
    //   this.swalService.warning(`No hay Stock disponible del producto que desea agregar.`);
    // }  
  }

  selectCheck() {
    this.chequeSelected = this.itemForm.value.cheque;
    this.itemForm.controls.importe.setValue(this.chequeSelected.importe);
  }

  addNewCheck() {
    console.log('Por agregar una Cheque');
    this.bsModalRef = this.modalService.checkAdd('Cheques', 'Productos', this.checkRequest, this.banks, this.localidades);
    this.bsModalRef.content.event.subscribe(
    resp => {
             resp.data.fechaEmision = new Date(resp.data.fechaEmision);
             resp.data.fechaPago = new Date(resp.data.fechaPago);
             this.checkService.addCheck(resp.data).subscribe(
                  response => {
                        this.chequeSelected = response.data.cheques[0],
                        this.itemForm.controls.cheque.setValue(this.chequeSelected);
                        this.itemForm.controls.importe.setValue(this.chequeSelected.importe);

                        this.checks.push(this.chequeSelected),
                        this.swalService.success(`Cheque agregado con éxito`)
                       },
                  error => this.swalService.error(`No se ha podido agregar el cheque.`)
             );

    });
  }
  
  selectBank() {}

  onSubmit(){
    this.itemForm.value.payment.tipoDePago = this.itemForm.value.tipoDePago;
    this.itemForm.value.payment.transferencia.CBU = this.itemForm.value.CBU;
    this.itemForm.value.payment.transferencia.alias = this.itemForm.value.alias;
    this.itemForm.value.payment.transferencia.titularCuenta = this.itemForm.value.titularCuenta;
    this.itemForm.value.payment.transferencia.importe = this.itemForm.value.importe;

    if (this.itemForm.value.banco != null && this.itemForm.value.banco !== '' ){
      this.itemForm.value.payment.transferencia.banco = this.itemForm.value.banco;
    }

    if (this.itemForm.value.cheque != null && this.itemForm.value.cheque !== '' ){
      this.itemForm.value.payment.cheque = this.itemForm.value.cheque;
    }


    this.itemForm.value.payment.importe = this.itemForm.value.importe;
    if( !isUndefined(this.itemForm.value.CBU) && this.itemForm.value.CBU != null ){
      this.itemForm.value.payment.transferencia.realizada = true;
    }
    switch (this.action) {
      case 'add':
        this.sendObject(this.itemForm.value.payment);
        this.bsModalRef.hide();
        break;
      case 'edit':
        console.log( "Edit to modal component" + this.itemForm.value.payment);
        this.sendObject(this.itemForm.value.payment, this.i);
        this.bsModalRef.hide();
        break;
  
      default:
        break;
    }
}



close() {
  this.bsModalRef.hide();
}

}
