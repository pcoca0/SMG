import { Component, OnInit, EventEmitter } from '@angular/core';
import { ClientService } from 'src/app/core/services/client.service';
import { IClientItemResponse } from 'src/app/core/interfaces/responses/client.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  today: number = Date.now();
  filterMatch: string = '';
  clientes: Array<IClientItemResponse>;
  bsModalRef: BsModalRef;
  public event: EventEmitter<any> = new EventEmitter();
  client: IClientItemResponse;
  clientNew: IClientItemResponse;

  constructor(
    private clientService: ClientService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      resp => {this.clientes = resp.data.clientes
      }
    )
  }
  search(term: string){
    //console.log("Recibiendo: "+ term)
    this.filterMatch = term;
  }

  addNewClient(){
    console.log("Por agregar una cliente");
    this.bsModalRef = this.modalService.clientAdd("Cliente", "Productos", this.clientNew);
    this.bsModalRef.content.event.subscribe(
    resp => {
          this.clientService.addClient(resp.data).subscribe(
          c => {
                this.clientNew = c.data.clientes[0],
                this.clientes.push(this.clientNew)
              }
          )
    });
  }

  removeClient(i: number){
    console.log("posicion: "+ i);
    let id = this.clientes[i].id;
    this.clientes.splice(i, 1);
    this.clientService.deleteClient(id).subscribe();

  }

  editClient(i: number){
    console.log("Por editar una cliente");
    let id = this.clientes[i].id;
    this.bsModalRef = this.modalService.clientEdit("Cliente", "Productos", this.clientes[i], false, i);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data);
      this.client = resp.data,
      this.client.id = id,
      this.clientes.splice(i, 1, this.client),
      this.clientService.putClient(this.client.id, this.client ).subscribe()

    });
  }
  viewClient(i: number){
    console.log("Por editar una cliente");
    this.bsModalRef = this.modalService.clientEdit("Cliente", "Productos", this.clientes[i],true, i);
    this.bsModalRef.content.event.subscribe(
    resp => {

    });
  }


  trackBy(index: number, client: any): string {
    return client.codigo;
    }


}

