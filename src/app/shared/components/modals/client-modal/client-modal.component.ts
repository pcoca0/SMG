import { Component, OnInit, EventEmitter } from '@angular/core';
import { IClientItemResponse } from 'src/app/core/interfaces/responses/client.response';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss']
})
export class ClientModalComponent implements OnInit {

  title: string;
  message: string;
  client: IClientItemResponse;
  public event: EventEmitter<any> = new EventEmitter();
  formClient: FormGroup;
  action: string;
  i: number;
  view: boolean;

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) {
    this.formClient = this.fb.group({
      razonSocial: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      domicilio: ['', Validators.required]
    });
  }
  ngOnInit() {
    if(this.client){
      this.formClient.patchValue({
        razonSocial: this.client.razonSocial,
        apellido: this.client.apellido,
        nombre: this.client.nombre,
        domicilio: this.client.domicilio
      });
    }
  }


  sendObject(item: string, pos?: number) {
    this.event.emit({data: item, position: pos, res: 200});
  }

  // onSubmit(){
  //   console.log( "add to Client component" + this.formClient.value);
  //   this.sendObject(this.formClient.value);
  //   this.bsModalRef.hide();
  // }

  onSubmit(){
    switch (this.action) {
      case 'add':
        console.log( "add to modal component" + this.formClient.value);
        this.sendObject(this.formClient.value);
        this.bsModalRef.hide();
        break;
      case 'edit':
        console.log( "Edit to modal component" + this.formClient.value);
        this.sendObject(this.formClient.value, this.i);
        this.bsModalRef.hide();
        break;

      default:
        break;
    }
  }
}
