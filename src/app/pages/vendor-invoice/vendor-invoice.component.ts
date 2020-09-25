import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IVendorInvoiceItemResponse } from 'src/app/core/interfaces/responses/vendor-invoice.response';
import { SwalService } from 'src/app/core/services/swal.service';
import { VendorInvoiceService } from 'src/app/core/services/vendor-invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-invoice',
  templateUrl: './vendor-invoice.component.html',
  styleUrls: ['./vendor-invoice.component.scss']
})
export class VendorInvoiceComponent implements OnInit, OnDestroy {
  
  facturasProveedores: Array<IVendorInvoiceItemResponse>;
  private suscriptions: Subscription[] = [];
  filterMatch: string;
  page: number  = 1;


  constructor(
    private vendorInvoiceService: VendorInvoiceService,
    private swalService: SwalService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.suscriptions.push(
            this.vendorInvoiceService.getVendorInvoices().subscribe(
                  response => this.facturasProveedores = response.data.facturasProveedores
            ));
  }

  search(term: string) {
    this.filterMatch = term;
  }

  addNewInvoice() {
    this.router.navigate(['crearFactura']);
  }
  removeVendorInvoice(id: string) {
    const pos = this.facturasProveedores.findIndex(p =>  p.id === id);
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
        this.suscriptions.push(this.vendorInvoiceService.deleteVendorInvoice(id).subscribe(
          response => {
              this.facturasProveedores.splice(pos, 1),
              this.swalService.success('Eliminado!', `La factura del proveedor eliminada con éxito`, 3000);
            },
            error => {
              this.swalService.error(`No se ha podido eliminar la factura del proveedor.`);
            })
        );
      }
    });
  }
  editVendorInvoice(id: string) {
    console.log('id Vendorinvoice' + id);
    this.router.navigate(['editarFacturaProveedor', id]);
  }

  editVendorInvoiceSpend(id: string) {
    console.log('id Vendorinvoice' + id);
    this.router.navigate(['editarGastoProveedor', id]);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach( suscription => suscription.unsubscribe());
  }

}
