import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ICategoryResponse, ICategoryItemResponse } from 'src/app/core/interfaces/responses/category.response';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  today: number = Date.now();
  categorias: Array<ICategoryItemResponse>;
  filterMatch: string = '';
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getCategories().subscribe(
      resp => (this.categorias = resp.data.categorias,
        console.log(resp.data.categorias))
    )
  }

  search(term: string){
    //console.log("Recibiendo: "+ term)
    this.filterMatch = term;
  }

}
