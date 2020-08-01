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
import { ClientModalComponent } from './components/modals/client-modal/client-modal.component';
import { ClientViewComponent } from './components/client-view/client-view.component';
import { CategoryModalComponent } from './components/modals/category-modal/category-modal.component';


@NgModule({
  declarations: [SidebarComponent, NavbarComponent, FooterComponent, FilterPipe, SearchComponent, BudgeModalComponent, ClientModalComponent, ClientViewComponent, CategoryModalComponent ],
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
    SelectDropDownModule,
    ClientModalComponent,
    ClientViewComponent,
    CategoryModalComponent
    ],
  entryComponents: [
   BudgeModalComponent,
   ClientModalComponent,
   CategoryModalComponent
  ]
})
export class SharedModule { }
