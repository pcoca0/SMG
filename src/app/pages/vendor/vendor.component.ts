import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';

import { ModalService } from 'src/app/core/services/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { SwalService } from '../../core/services/swal.service';
import { UtilsService } from '../../core/services/utils.service';
import { ILocation, IProfileAFIP, IClientCategory } from '../../core/interfaces/utils';
import { ClientCategoryService } from '../../core/services/client-category.service';
import Swal from 'sweetalert2';
import { VendorService } from 'src/app/core/services/vendor.service';
import { IVendorItemResponse } from 'src/app/core/interfaces/responses/vendor.response';
import { IVendorRequest } from 'src/app/core/interfaces/requests/vendor.request';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  today: number = Date.now();
  filterMatch: string;
  proveedores: Array<IVendorItemResponse>;
  localidades: Array<ILocation>;
  perfilesAFIP: Array<IProfileAFIP>;
  categoriasCliente: Array<IClientCategory>;
  bsModalRef: BsModalRef;
  public event: EventEmitter<any> = new EventEmitter();
  vendorRequest: IVendorRequest;
  client: IVendorItemResponse;
  vendorNew: IVendorItemResponse;
  private suscriptions: Subscription[] = [];


  constructor(
    private vendorService: VendorService,
    private modalService: ModalService,
    private swalService: SwalService,
    private utilsService: UtilsService,
    private clientCategoryService: ClientCategoryService

  ) { }

  ngOnInit() {
    this.suscriptions.push(
      this.vendorService.getVendors().subscribe(resp => this.proveedores = resp.data.proveedores),
      this.utilsService.getLocalidades().subscribe(respL => this.localidades = respL),
      this.utilsService.getPerfilesAFIP().subscribe(respP => this.perfilesAFIP = respP),
      this.clientCategoryService.getClientCategories().subscribe(respC => this.categoriasCliente = respC?.data?.['categoriasCliente'])
      );
  }
  search(term: string) {
    this.filterMatch = term;
  }

  addNewVendor() {
    console.log('Por agregar una Proveedor');
    this.bsModalRef = this.modalService.vendorAdd('Proveedor', 'proveedores', this.vendorNew, this.perfilesAFIP,
                                                  this.localidades, this.categoriasCliente);
    this.bsModalRef.content.event.subscribe(
    resp => {
          this.suscriptions.push(this.vendorService.addVendor(resp.data).subscribe(
                                  response => {
                                        this.vendorNew = response.data.proveedores[0],
                                        this.proveedores.push(this.vendorNew),
                                        this.swalService.success(`Proveedor creado con éxito`)
                                      },
                                  error => this.swalService.error(`No se ha podido crear el proveedor.`)
                                  ));
            });
  }

  removeVendor(id: string){
    const pos = this.proveedores.findIndex(p =>  p.id === id);
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
        this.suscriptions.push(this.vendorService.deleteVendor(id).subscribe(
            response => {
              this.proveedores.splice(pos, 1);
              this.swalService.success('Eliminado!', `El proveedor ha sido eliminado exitosamente`, 3000);
            },
            error => {
              this.swalService.error(`Error al eliminar el proveedor`);
            })
        );
      }
    });
  }

  editVendor(id: string){
    console.log('Por editar una proveedor');
    const pos = this.proveedores.findIndex(p =>  p.id === id);

    this.bsModalRef = this.modalService.vendorEdit('Proveedor', 'Productos', this.proveedores[pos],this.perfilesAFIP,
                                                    this.localidades, this.categoriasCliente, false, pos);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data);
      this.vendorRequest = resp.data,
      this.vendorRequest.id = id,
      this.suscriptions.push(this.vendorService.putVendor(this.vendorRequest.id, this.vendorRequest ).subscribe(
                            response => {
                                          this.proveedores.splice(pos, 1, response.data.proveedores[0]),
                                          this.swalService.success(`Proveedor editado con éxito`)
                                        },
                            error => this.swalService.error(`No se ha podido eliminar el Proveedor.`)
      ));
    });
  }

  viewVendor(id: string){
    const pos = this.proveedores.findIndex(p =>  p.id === id);
    this.bsModalRef = this.modalService.vendorEdit('Cliente', 'Productos', this.proveedores[pos], this.perfilesAFIP,
                                                    this.localidades, this.categoriasCliente, true, pos);
    this.bsModalRef.content.event.subscribe(
    resp => {

    });
  }

  trackBy(index: number, vendor: any): string {
    return vendor.id;
    }

  ngOnDestroy(): void {
    this.suscriptions.forEach(suscription => suscription.unsubscribe());
  }

}
