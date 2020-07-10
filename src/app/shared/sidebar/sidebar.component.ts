import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      resp => console.log(resp)
    );
  }

}
