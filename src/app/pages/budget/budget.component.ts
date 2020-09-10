import { Component, OnInit, OnDestroy } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { SwalService } from '../../core/services/swal.service';
import { IBudgetItemResponse } from '../../core/interfaces/responses/budget.response';
import { Subscription } from 'rxjs';
import { Routes, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit, OnDestroy {

  presupuestos: Array<IBudgetItemResponse>;
  private suscriptions: Subscription[] = [];
  filterMatch: string;

  constructor(
    private budgetService: BudgetService,
    private swalService: SwalService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.suscriptions.push(
            this.budgetService.getBudgets().subscribe(
                  response => this.presupuestos = response.data.presupuestos
            ));
  }

  search(term: string) {
    this.filterMatch = term;
  }

  addNewBudget(){
    this.router.navigate(['crearPresupuesto'])
  }
  removeBuget(id: string) {
    const pos = this.presupuestos.findIndex(p =>  p.id === id);;
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
        this.suscriptions.push(this.budgetService.deleteBudget(id).subscribe(
          response => {
              this.presupuestos.splice(pos, 1),
              this.swalService.success('Eliminado!', `Presupuesto eliminado con éxito`, 3000);
            },
            error => {
              this.swalService.error(`No se ha podido eliminar el presupuesto.`)
            })
        );
      }
    });
  }
  editBuget(id: string) {
    console.log('id budget' + id);
    this.router.navigate(['editarPresupuesto', id]);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach( suscription => suscription.unsubscribe());
  }

}
