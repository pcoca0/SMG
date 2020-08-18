import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/core/services/client.service';
import { IClientItemResponse } from 'src/app/core/interfaces/responses/client.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IClientRequest } from '../../core/interfaces/requests/client.request';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  today: number = Date.now();
  filterMatch: '';
  clientes: Array<IClientItemResponse>;
  bsModalRef: BsModalRef;
  public event: EventEmitter<any> = new EventEmitter();
  clientRequest: IClientRequest;
  client: IClientItemResponse;
  clientNew: IClientItemResponse;
  private suscriptions: Subscription[] = [];


  constructor(
    private clientService: ClientService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.suscriptions.push(this.clientService.getClients().subscribe(
                          resp => { this.clientes = resp.data.clientes
                                  }
                          ));
  }
  search(term: string){
    //console.log("Recibiendo: "+ term)
    this.filterMatch = term;
  }

  addNewClient() {
    console.log("Por agregar una cliente");
    this.bsModalRef = this.modalService.clientAdd("Cliente", "Productos", this.clientNew);
    this.bsModalRef.content.event.subscribe(
    resp => {
          this.suscriptions.push(this.clientService.addClient(resp.data).subscribe(
                                  c => {
                                        this.clientNew = c.data.clientes[0],
                                        this.clientes.push(this.clientNew)
                                      }
                                  ));
            });
  }

  removeClient(i: number){
    console.log("posicion: "+ i);
    let id = this.clientes[i].id;
    this.clientes.splice(i, 1);
    this.suscriptions.push(this.clientService.deleteClient(id).subscribe());
  }

  editClient(i: number){
    console.log("Por editar una cliente");
    let id = this.clientes[i].id;
    this.bsModalRef = this.modalService.clientEdit("Cliente", "Productos", this.clientes[i], false, i);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data);
      this.clientRequest = resp.data,
      this.clientRequest.id = id,
      this.suscriptions.push(this.clientService.putClient(this.clientRequest.id, this.clientRequest ).subscribe(
                            response => this.clientes.splice(i, 1, response.data.clientes[0])
      ));
    });
  }

  viewClient(i: number){
    console.log("Por editar una cliente");
    this.bsModalRef = this.modalService.clientEdit("Cliente", "Productos", this.clientes[i], true, i);
    this.bsModalRef.content.event.subscribe(
    resp => {

    });
  }

  trackBy(index: number, client: any): string {
    return client.codigo;
    }

  ngOnDestroy(): void {
    this.suscriptions.forEach(suscription => suscription.unsubscribe());
  }


}

