import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/core/services/client.service';
import { IClientItemResponse } from 'src/app/core/interfaces/responses/client.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IClientRequest } from '../../core/interfaces/requests/client.request';
import { SwalService } from '../../core/services/swal.service';
import { UtilsService } from '../../core/services/utils.service';
import { ILocation, IProfileAFIP, IClientCategory } from '../../core/interfaces/utils';
import { ClientCategoryService } from '../../core/services/client-category.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  today: number = Date.now();
  filterMatch: string;
  clientes: Array<IClientItemResponse>;
  localidades: Array<ILocation>;
  perfilesAFIP: Array<IProfileAFIP>;
  categoriasCliente: Array<IClientCategory>;
  bsModalRef: BsModalRef;
  public event: EventEmitter<any> = new EventEmitter();
  clientRequest: IClientRequest;
  client: IClientItemResponse;
  clientNew: IClientItemResponse;
  private suscriptions: Subscription[] = [];


  constructor(
    private clientService: ClientService,
    private modalService: ModalService,
    private swalService: SwalService,
    private utilsService: UtilsService,
    private clientCategoryService: ClientCategoryService

  ) { }

  ngOnInit() {
    this.suscriptions.push(
      this.clientService.getClients().subscribe(resp => this.clientes = resp.data.clientes),
      this.utilsService.getLocalidades().subscribe(respL => this.localidades = respL),
      this.utilsService.getPerfilesAFIP().subscribe(respP => this.perfilesAFIP = respP),
      this.clientCategoryService.getClientCategories().subscribe(respC => this.categoriasCliente = respC?.data?.['categoriasCliente'])
      );
  }
  search(term: string) {
    this.filterMatch = term;
  }

  addNewClient() {
    console.log('Por agregar una cliente');
    this.bsModalRef = this.modalService.clientAdd('Cliente', 'Clientes', this.clientNew, this.perfilesAFIP, 
                                                  this.localidades, this.categoriasCliente);
    this.bsModalRef.content.event.subscribe(
    resp => {
          this.suscriptions.push(this.clientService.addClient(resp.data).subscribe(
                                  response => {
                                        this.clientNew = response.data.clientes[0],
                                        this.clientes.push(this.clientNew),
                                        this.swalService.success(`Cliente creado con éxito`)
                                      },
                                  error => this.swalService.error(`No se ha podido crear el cliente.`)
                                  ));
            });
  }

  removeClient(i: number){
    console.log('posicion: ' + i);
    const id = this.clientes[i].id;
    this.clientes.splice(i, 1);
    this.suscriptions.push(this.clientService.deleteClient(id).subscribe(
      response => this.swalService.success(`Cliente eliminado con éxito`),
      error => this.swalService.error(`No se ha podido eliminar el cliente.`)
    ));
  }

  editClient(i: number){
    console.log('Por editar una cliente');
    const id = this.clientes[i].id;
    this.bsModalRef = this.modalService.clientEdit('Cliente', 'Productos', this.clientes[i], false, i);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data);
      this.clientRequest = resp.data,
      this.clientRequest.id = id,
      this.suscriptions.push(this.clientService.putClient(this.clientRequest.id, this.clientRequest ).subscribe(
                            response => {
                                          this.clientes.splice(i, 1, response.data.clientes[0]),
                                          this.swalService.success(`Cliente editado con éxito`)
                                        },
                            error => this.swalService.error(`No se ha podido eliminar el cliente.`)
      ));
    });
  }

  viewClient(i: number){
    console.log('Por editar una cliente');
    this.bsModalRef = this.modalService.clientEdit('Cliente', 'Productos', this.clientes[i], true, i);
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

