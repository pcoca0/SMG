import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IVendorItemResponse } from 'src/app/core/interfaces/responses/vendor.response';

@Component({
  selector: 'app-vendor-view',
  templateUrl: './vendor-view.component.html',
  styleUrls: ['./vendor-view.component.scss']
})
export class VendorViewComponent implements OnInit {

  @Input() vendor: IVendorItemResponse;
  formView: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.formView = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        calle: ['', Validators.required],
        nro: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.vendor);
    if (this.vendor){
      this.formView.patchValue({
        nombre: this.vendor.nombre,
        apellido: this.vendor.apellido,
        calle: this.vendor.calle,
        numero: this.vendor.numero

      });
    }
    console.log(this.vendor);
  }


}
