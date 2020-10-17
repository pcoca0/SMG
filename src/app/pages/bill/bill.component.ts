import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBillItemResponse } from 'src/app/core/interfaces/responses/bill.response';
import { IClientItemResponse } from 'src/app/core/interfaces/responses/client.response';
import { BillingService } from 'src/app/core/services/billing.service';
import { ClientService } from 'src/app/core/services/client.service';
import { SwalService } from 'src/app/core/services/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit, OnDestroy {

  cobros: Array<IBillItemResponse>;
  private suscriptions: Subscription[] = [];
  filterMatch: string;
  id: string;
  page  = 1;
  cliente: IClientItemResponse;


  constructor(
    private billService: BillingService,
    private clientService: ClientService,
    private swalService: SwalService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.suscriptions.push(
      this.clientService.getClients().subscribe(resp => {
            this.cliente = resp.data.clientes.find(c => c.id === this.id);
            }),
            this.billService.getBillsByClient(this.id).subscribe(
                  response => this.cobros = response.data.cobros
            ));
  }

  search(term: string) {
    this.filterMatch = term;
  }

  addNewPayOrder(idcliente: string) {
    this.router.navigate(['crearCobro', idcliente]);
  }
  removeInvoice(id: string) {
    const pos = this.cobros.findIndex(p =>  p.id === id);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir este cambio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#DF1B1A',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) { // Llamar servicio
        this.suscriptions.push(this.billService.deleteBill(id).subscribe(
          response => {
              this.cobros.splice(pos, 1),
              this.swalService.success('Eliminado!', `Cobro eliminado con éxito`, 3000);
            },
            error => {
              this.swalService.error(`No se ha podido eliminar el cobro.`);
            })
        );
      }
    });
  }
  
  editPayOrder(id: string) {
    this.router.navigate(['editarCobro', id]);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach( suscription => suscription.unsubscribe());
  }

}
