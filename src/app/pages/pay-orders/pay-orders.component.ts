import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PayOrderService } from 'src/app/core/services/pay-order.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { VendorService } from 'src/app/core/services/vendor.service';
import Swal from 'sweetalert2';
import { IPayOrderItemResponse } from '../../core/interfaces/responses/pay-order.response';
import { IVendorItemResponse } from '../../core/interfaces/responses/vendor.response';

@Component({
  selector: 'app-pay-orders',
  templateUrl: './pay-orders.component.html',
  styleUrls: ['./pay-orders.component.scss']
})
export class PayOrdersComponent implements OnInit, OnDestroy {

  ordenesDePago: Array<IPayOrderItemResponse>;
  private suscriptions: Subscription[] = [];
  filterMatch: string;
  id: string;
  page  = 1;
  proveedor: IVendorItemResponse;


  constructor(
    private payOrderService: PayOrderService,
    private vendorService: VendorService,
    private swalService: SwalService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.suscriptions.push(
      this.vendorService.getVendors().subscribe(resp => {
            this.proveedor = resp.data.proveedores.find(p => p.id === this.id);
            }),
            this.payOrderService.getPayOrdersByVendor(this.id).subscribe(
                  response => this.ordenesDePago = response.data.ordenesDePago
            ));
  }

  search(term: string) {
    this.filterMatch = term;
  }

  addNewPayOrder(idProveedor: string) {
    this.router.navigate(['crearOrdenDePago', idProveedor]);
  }
  removeInvoice(id: string) {
    const pos = this.ordenesDePago.findIndex(p =>  p.id === id);
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
        this.suscriptions.push(this.payOrderService.deletePayOrder(id).subscribe(
          response => {
              this.ordenesDePago.splice(pos, 1),
              this.swalService.success('Eliminado!', `Factura eliminado con éxito`, 3000);
            },
            error => {
              this.swalService.error(`No se ha podido eliminar la orden de pago.`);
            })
        );
      }
    });
  }
  
  editPayOrder(id: string) {
    this.router.navigate(['editarOrdenDePago', id]);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach( suscription => suscription.unsubscribe());
  }
}
