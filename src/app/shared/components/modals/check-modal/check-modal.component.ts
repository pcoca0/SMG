import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ICheckItemResponse } from 'src/app/core/interfaces/responses/check.response';
import { IBank } from 'src/app/core/interfaces/utils';

@Component({
  selector: 'app-check-modal',
  templateUrl: './check-modal.component.html',
  styleUrls: ['./check-modal.component.scss']
})
export class CheckModalComponent implements OnInit {

  title: string;
  message: string;
  check: ICheckItemResponse;
  banks: Array<IBank>;
  locations: Array<Location>;
  public event: EventEmitter<any> = new EventEmitter();
  formCheck: FormGroup;
  action: string;
  i: number;
  view: boolean;
  bsValueE: Date = new Date();
  bsValueP: Date = new Date();
  myDateValue: Date;
  dateCustomClasses = [
    {  classes: [] },
    {  classes: ['bg-warning'] },
    {  classes: ['bg-danger', 'text-warning'] }
  ];
 

  dropdownSetup: Object = {
    displayKey:'descripcion', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Selecciona', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 5, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'Más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No se encontraron resultados!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Buscar', // label thats displayed in search input,
    searchOnKey: 'descripcion', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  };

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) {
    this.formCheck = this.fb.group({
      banco: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      fechaPago: ['', Validators.required],
      localidad: ['', Validators.required],
      nroCheque: ['', Validators.required],
      importe: ['', Validators.required],
      echeque: [false],
      comentario: ['']
    });
  }
  ngOnInit() {
    console.log(this.banks);
    if (this.check) {
      this.formCheck.patchValue({
        banco: this.check.banco,
        fechaEmision: new Date(this.check.fechaEmision),
        fechaPago: new Date(this.check.fechaPago),
        localidad: this.check.localidad,
        nroCheque: this.check.nroCheque,
        echeque: this.check.echeque,
        importe: this.check.importe,
        comentarios: this.check.comentario
      });
      this.bsValueE = new Date( this.check.fechaEmision);
      this.bsValueP = new Date( this.check.fechaPago);

      // console.log(this.check.fechaEmision);
      // console.log(new Date( this.check.fechaEmision));
      // console.log(this.formCheck.controls.fechaEmision.value);
      // const date = formatDate(this.check.fechaEmision, this.bsConfig.dateInputFormat, this.locale);



    }
  }

  selectBanco() { }
  selectLocation(){ }
  selectProfileAFIP() { }

  sendObject(item: string, pos?: number) {
    this.event.emit({data: item, position: pos, res: 200});
  }

  // onSubmit(){
  //   console.log( "add to Client component" + this.formCheck.value);
  //   this.sendObject(this.formCheck.value);
  //   this.bsModalRef.hide();
  // }

  onSubmit(){
    switch (this.action) {
      case 'add':
        console.log( "add to modal component" + this.formCheck.value);
        this.sendObject(this.formCheck.value);
        this.bsModalRef.hide();
        break;
      case 'edit':
        console.log( "Edit to modal component" + this.formCheck.value);
        this.sendObject(this.formCheck.value, this.i);
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
