import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';



;



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot()

  ],
  exports: [
    ModalModule,
    BsDropdownModule,
    PaginationModule
  ]
})
export class NgxBootstrapModule { }
