import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IClientItemResponse } from 'src/app/core/interfaces/responses/client.response';
import { ClientService } from 'src/app/core/services/client.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { IClientItemMovement } from '../../core/interfaces/utils';

@Component({
  selector: 'app-client-movement',
  templateUrl: './client-movement.component.html',
  styleUrls: ['./client-movement.component.scss']
})
export class ClientMovementComponent implements OnInit {

  filterMatch: string;
  clientes: Array<IClientItemResponse>;
  cliente: IClientItemResponse;
  movimientos: Array<IClientItemMovement>;
  bsModalRef: BsModalRef;

  client: IClientItemResponse;
  clientNew: IClientItemResponse;
  private suscriptions: Subscription[] = [];
  page: number  = 1
  idCliente: string;
  
  constructor(
    private clientService: ClientService,
    private modalService: ModalService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idCliente = this.activateRoute.snapshot.paramMap.get('id');
    this.suscriptions.push(
              this.clientService.getClients().subscribe(resp => {
                this.cliente = resp.data.clientes.find(c => c.id === this.idCliente);
              }),
              this.clientService.getClientMovement(this.idCliente).subscribe(resp => {
                                            this.movimientos = resp.data.movimientos,
                                            console.log(this.movimientos)
                                          })
      );
  }

  search(term: string) {
    this.filterMatch = term;
  }

  editInvoice(id: string) {
    console.log('id invoice' + id);
    this.router.navigate(['editarFactura', id]);
  }

  editPayOrder(id: string) {
    this.router.navigate(['editarCobro', id]);
  }


}
