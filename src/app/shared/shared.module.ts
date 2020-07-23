import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchComponent } from './components/search/search.component';
import { BudgeModalComponent } from './components/modals/budge-modal/budge-modal.component';
import { NgxBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';


@NgModule({
  declarations: [SidebarComponent, NavbarComponent, FooterComponent, FilterPipe, SearchComponent, BudgeModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxBootstrapModule,
    SelectDropDownModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    FilterPipe,
    BudgeModalComponent,
    NgxBootstrapModule,
    SelectDropDownModule
  ],
  entryComponents: [
   BudgeModalComponent
  ]
})
export class SharedModule { }
