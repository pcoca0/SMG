import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IInvoiceItemResponse } from 'src/app/core/interfaces/responses/invoice.response';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {

  facturas: Array<IInvoiceItemResponse>;
  private suscriptions: Subscription[] = [];
  filterMatch: string;

  constructor(
    private invoiceService: InvoiceService,
    private swalService: SwalService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.suscriptions.push(
            this.invoiceService.getInvoices().subscribe(
                  response => this.facturas = response.data.facturas
            ));
  }

  search(term: string) {
    this.filterMatch = term;
  }

  addNewInvoice() {
    this.router.navigate(['crearFactura']);
  }
  removeInvoice(id: string) {
    const pos = this.facturas.findIndex(p =>  p.id === id);
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
        this.suscriptions.push(this.invoiceService.deleteInvoice(id).subscribe(
          response => {
              this.facturas.splice(pos, 1),
              this.swalService.success('Eliminado!', `Factura eliminado con éxito`, 3000);
            },
            error => {
              this.swalService.error(`No se ha podido eliminar el factura.`);
            })
        );
      }
    });
  }
  editInvoice(id: string) {
    console.log('id invoice' + id);
    this.router.navigate(['editarFactura', id]);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach( suscription => suscription.unsubscribe());
  }

}
