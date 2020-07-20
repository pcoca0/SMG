import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, FooterComponent, FilterPipe, SearchComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [SidebarComponent, NavbarComponent, FooterComponent, SearchComponent, FilterPipe],
})
export class SharedModule { }
