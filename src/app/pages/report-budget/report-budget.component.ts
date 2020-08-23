import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BudgetService } from 'src/app/core/services/budget.service';
import { ClientService } from 'src/app/core/services/client.service';
import { IBudgetItemResponse } from '../../core/interfaces/responses/budget.response';
import { Subscription } from 'rxjs';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-report-budget',
  templateUrl: './report-budget.component.html',
  styleUrls: ['./report-budget.component.scss']
})
export class ReportBudgetComponent implements OnInit, OnDestroy { 

  today: number =  Date.now();
  budget: IBudgetItemResponse;
  private suscriptions: Subscription[] = [];

  constructor(

    private clientService: ClientService,
    private budgetService: BudgetService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.suscriptions.push(this.budgetService.getBudget(this.activateRoute.snapshot.paramMap.get('id')).subscribe(
    resp => this.budget = resp.data.presupuestos[0]
    ));
  }

  makePDF(): void {
    console.log('imprime');

    const  PDF = new jsPDF();
    const width = PDF.internal.pageSize.getWidth();
    const height = PDF.internal.pageSize.getHeight();
    const margins = {
      top: 60,
      bottom: 80,
      left: 40,
      width: 522
    };

    PDF.fromHTML(
      document.getElementById('document'), // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top, {
        // y coord
        width: margins.width // max width of content on PDF
      },
      (dispose: any) => {
        // dispose: object with X, Y of the last line add to the PDF
        // this allow the insertion of new lines after html
        //this.setHeaderAndFooter(PDF, PDF.internal.getNumberOfPages(), width, height),
        PDF.save(`${this?.budget?.id || 'Report sin título'}.pdf`);
      },
      margins
    );
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach( suscription => suscription.unsubscribe());
    }

}
