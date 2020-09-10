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
import Swal from 'sweetalert2';
import { VendorService } from 'src/app/core/services/vendor.service';
import { IVendorItemResponse } from 'src/app/core/interfaces/responses/vendor.response';
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
  clientRequest: IClientRequest;
  client: IClientItemResponse;
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
    console.log('Por agregar una cliente');
    this.bsModalRef = this.modalService.vendorAdd('Proveedor', 'proveedores', this.vendorNew, this.perfilesAFIP,
                                                  this.localidades, this.categoriasCliente);
    this.bsModalRef.content.event.subscribe(
    resp => {
          this.suscriptions.push(this.vendorService.addVendor(resp.data).subscribe(
                                  response => {
                                        this.vendorNew = response.data.proveedores[0],
                                        this.proveedores.push(this.vendorNew),
                                        this.swalService.success(`Cliente creado con éxito`)
                                      },
                                  error => this.swalService.error(`No se ha podido crear el cliente.`)
                                  ));
            });
  }

  removeVendor(i: number){
    console.log('posicion: ' + i);
    const id = this.proveedores[i].id;
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
              this.proveedores.splice(i, 1);
              this.swalService.success('Eliminado!', `El proveedor ha sido eliminado exitosamente`, 3000);
            },
            error => {
              this.swalService.error(`Error al eliminar el proveedor`);
            })
        );
      }
    });
  }

  editVendor(i: number){
    console.log('Por editar una proveedor');
    const id = this.proveedores[i].id;
    this.bsModalRef = this.modalService.vendorEdit('Cliente', 'Productos', this.proveedores[i],this.perfilesAFIP,
                                                    this.localidades, this.categoriasCliente, false, i);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data);
      this.clientRequest = resp.data,
      this.clientRequest.id = id,
      this.suscriptions.push(this.vendorService.putVendor(this.clientRequest.id, this.clientRequest ).subscribe(
                            response => {
                                          this.proveedores.splice(i, 1, response.data.proveedores[0]),
                                          this.swalService.success(`Cliente editado con éxito`)
                                        },
                            error => this.swalService.error(`No se ha podido eliminar el cliente.`)
      ));
    });
  }

  viewVendor(i: number){
    console.log('Por editar una cliente');
    this.bsModalRef = this.modalService.vendorEdit('Cliente', 'Productos', this.proveedores[i],this.perfilesAFIP,
                                                    this.localidades, this.categoriasCliente, true, i);
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
