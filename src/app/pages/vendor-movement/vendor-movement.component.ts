import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IClientItemResponse } from 'src/app/core/interfaces/responses/client.response';
import { IVendorItemResponse } from 'src/app/core/interfaces/responses/vendor.response';
import { IVendorItemMovement } from 'src/app/core/interfaces/utils';
import { ModalService } from 'src/app/core/services/modal.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-vendor-movement',
  templateUrl: './vendor-movement.component.html',
  styleUrls: ['./vendor-movement.component.scss']
})
export class VendorMovementComponent implements OnInit {

  filterMatch: string;
  proveedores: Array<IVendorItemResponse>;
  proveedor: IVendorItemResponse;
  movimientos: Array<IVendorItemMovement>;
  bsModalRef: BsModalRef;
  private suscriptions: Subscription[] = [];
  page: number  = 1
  idProveedor: string;
  
  constructor(
    private vendorService: VendorService,
    private modalService: ModalService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idProveedor = this.activateRoute.snapshot.paramMap.get('id');
    this.suscriptions.push(
              this.vendorService.getVendors().subscribe(resp => {
                this.proveedor = resp.data.proveedores.find(c => c.id === this.idProveedor);
              }),
              this.vendorService.getVendorMovement(this.idProveedor).subscribe(resp => {
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
    this.router.navigate(['editarFacturaProveedor', id]);
  }

  payOrderVendor(id: string) {
    this.router.navigate(['editarOrdenDePago', id]);
  }
}