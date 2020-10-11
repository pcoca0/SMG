import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ICheckRequest } from 'src/app/core/interfaces/requests/check.request';
import { ICheckItemResponse, ICheckResponse } from 'src/app/core/interfaces/responses/check.response';
import { CheckService } from 'src/app/core/services/check.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import Swal from 'sweetalert2';
import { IBank, ILocation } from '../../core/interfaces/utils';

@Component({
  selector: 'app-bank',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit, OnDestroy {

  today: number = Date.now();
  bancos: Array<IBank>;
  cheques: Array<ICheckItemResponse> = [];
  filterMatch: string;
  bsModalRef: BsModalRef;
  checkRequest: ICheckRequest;
  check: ICheckItemResponse;
  checkNew: ICheckItemResponse;
  isAdmin: boolean = false;
  private suscriptions: Subscription[] = [];
  localidades: Array<ILocation>;
  page: number  = 1;

  constructor(
    private checkService: CheckService,
    private modalService: ModalService,
    private utilsService: UtilsService,
    private swalService: SwalService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.tokenService.getAuthorities().forEach(
      rol => {if (rol['authority'] === 'ROL_ADMIN') { this.isAdmin = true; } }
    );
    this.suscriptions.push(
        this.checkService.getChecks().subscribe( resp => this.cheques = resp.data.cheques),
        this.utilsService.getLocalidades().subscribe(respL => this.localidades = respL),
        this.utilsService.getBancos().subscribe(respB => this.bancos = respB)

    );

  }

  search(term: string) {
    this.filterMatch = term;
  }

  removeCheck(pos: string): void {
    const i = this.cheques.findIndex(c =>  c.id === pos);
    const id =  this.cheques[i].id;
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
        this.suscriptions.push(this.checkService.deleteCheck(id).subscribe(
            response => {
              this.cheques.splice(i, 1);
              this.swalService.success('Eliminado!', `El cheque ha sido eliminado exitosamente`, 3000);
            },
            error => {
              this.swalService.error(`Error al eliminar el cheque`);
            })
        );
      }
    });
  }

  addNewCheck(){
    console.log('Por agregar una Cheque');
    this.bsModalRef = this.modalService.checkAdd('Cheques', 'Productos', this.checkRequest, this.bancos, this.localidades);
    this.bsModalRef.content.event.subscribe(
    resp => {
             console.log(resp.data);
             resp.data.fechaEmision = new Date(resp.data.fechaEmision);
             resp.data.fechaPago = new Date(resp.data.fechaPago);
             this.checkService.addCheck(resp.data).subscribe(
                  response => {
                        this.checkNew = response.data.cheques[0],
                        this.cheques.push(this.checkNew),
                        this.swalService.success(`Cheque agregada con éxito`)
                       },
                  error => this.swalService.error(`No se ha podido agregar el cheque.`)
             );

    });
  }

  editCheck(pos: string) {
    console.log('Por editar una cheque');
    const i = this.cheques.findIndex(c =>  c.id === pos);
    const id = this.cheques[i].id;
    this.bsModalRef = this.modalService.checkEdit('Categorias', 'Productos', this.cheques[i], this.bancos, this.localidades, false, i);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data),
      this.checkRequest = resp.data,
      this.checkRequest.id = id,
      this.suscriptions.push(this.checkService.putCheck(this.checkRequest.id, this.checkRequest ).subscribe(
                                 response => {
                                              this.cheques.splice(i, 1, response.data.cheques[0]),
                                              this.swalService.success(`Cheque editada con éxito`)
                                             },
                                 error => this.swalService.error(`No se ha podido editar cheque.`)
      ));
    });
  }


  ngOnDestroy(): void {
    this.suscriptions.forEach(suscription => suscription.unsubscribe());
  }


}
