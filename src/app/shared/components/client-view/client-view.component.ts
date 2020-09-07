import { Component, OnInit, Input } from '@angular/core';
import { IClientItemResponse } from 'src/app/core/interfaces/responses/client.response';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

  @Input() client: IClientItemResponse;
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
    console.log(this.client);
    if(this.client){
      this.formView.patchValue({
        nombre: this.client.nombre,
        apellido: this.client.apellido,
        calle: this.client.calle,
        numero: this.client.numero

      });
    }
    console.log(this.client);
  }

}
