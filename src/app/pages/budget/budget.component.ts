import { Component, OnInit, OnDestroy } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { SwalService } from '../../core/services/swal.service';
import { IBudgetItemResponse } from '../../core/interfaces/responses/budget.response';
import { Subscription } from 'rxjs';
import { Routes, Router } from '@angular/router';

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
  removeBuget(i){
    console.log(' posicion: ' + i);
    const id =  this.presupuestos[i].id;
    this.presupuestos.splice(i, 1);
    this.suscriptions.push(this.budgetService.deleteBudget(id).subscribe(
      response => {
                    this.presupuestos.splice(i, 1),
                    this.swalService.success(`Presupuesto eliminado con éxito`)
                  },
      error => this.swalService.error(`No se ha podido eliminar el presupuesto.`)
    ));
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach( suscription => suscription.unsubscribe());
  }

}
