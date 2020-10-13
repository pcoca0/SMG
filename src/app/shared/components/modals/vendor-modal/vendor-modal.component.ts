import { Component, OnInit, EventEmitter } from '@angular/core';
import { IVendorItemResponse } from 'src/app/core/interfaces/responses/vendor.response';
import { IProfileAFIP, IClientCategory } from 'src/app/core/interfaces/utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-vendor-modal',
  templateUrl: './vendor-modal.component.html',
  styleUrls: ['./vendor-modal.component.scss']
})
export class VendorModalComponent implements OnInit {


  title: string;
  message: string;
  vendor: IVendorItemResponse;
  profilesAFIP: Array<IProfileAFIP>;
  locations: Array<Location>;
  clientCategories: Array<IClientCategory>;
  public event: EventEmitter<any> = new EventEmitter();
  formVendor: FormGroup;
  action: string;
  i: number;
  view: boolean;

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
    this.formVendor = this.fb.group({
      razonSocial: ['', Validators.required],
      cuit: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      localidad: ['', Validators.required],
      perfilAFIP: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      contacto: ['', Validators.required],
      nota: ['', Validators.required],
      rol: ['', Validators.required],

    });
  }
  ngOnInit() {
    if (this.vendor) {
      this.formVendor.patchValue({
        razonSocial: this.vendor.razonSocial,
        cuit: this.vendor.cuit,
        apellido: this.vendor.apellido,
        nombre: this.vendor.nombre,
        calle: this.vendor.calle,
        numero: this.vendor.numero,
        localidad: this.vendor.localidad,
        perfilAFIP: this.vendor.perfilAFIP,
        telefono: this.vendor.telefono,
        email: this.vendor.email,
        contacto: this.vendor.contacto,
        nota: this.vendor.nota,
        rol: this.vendor.rol,

      });
    }
  }

  selectLocation() { }
  selectProfileAFIP() { }

  sendObject(item: string, pos?: number) {
    this.event.emit({data: item, position: pos, res: 200});
  }

  // onSubmit(){
  //   console.log( "add to Client component" + this.formVendor.value);
  //   this.sendObject(this.formVendor.value);
  //   this.bsModalRef.hide();
  // }

  onSubmit(){
    switch (this.action) {
      case 'add':
        console.log( "add to modal component" + this.formVendor.value);
        this.sendObject(this.formVendor.value);
        this.bsModalRef.hide();
        break;
      case 'edit':
        console.log( "Edit to modal component" + this.formVendor.value);
        this.sendObject(this.formVendor.value, this.i);
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
