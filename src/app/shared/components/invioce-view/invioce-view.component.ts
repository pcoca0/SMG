import { Component, Input, OnInit } from '@angular/core';
import { IInvoiceItemResponse } from 'src/app/core/interfaces/responses/invoice.response';

@Component({
  selector: 'app-invioce-view',
  templateUrl: './invioce-view.component.html',
  styleUrls: ['./invioce-view.component.scss']
})
export class InvioceViewComponent implements OnInit {
  
  @Input() invoice: IInvoiceItemResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
