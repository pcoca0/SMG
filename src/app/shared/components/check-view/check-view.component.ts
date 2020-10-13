import { Component, Input, OnInit } from '@angular/core';
import { ICheckItemResponse } from '../../../core/interfaces/responses/check.response';

@Component({
  selector: 'app-check-view',
  templateUrl: './check-view.component.html',
  styleUrls: ['./check-view.component.scss']
})
export class CheckViewComponent implements OnInit {
  
  @Input() check: ICheckItemResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
