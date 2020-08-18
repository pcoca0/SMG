import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ICategoryResponse, ICategoryItemResponse } from 'src/app/core/interfaces/responses/category.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ICategoryRequest } from 'src/app/core/interfaces/requests/category.request';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  today: number = Date.now();
  categorias: Array<ICategoryItemResponse>;
  filterMatch = '';
  bsModalRef: BsModalRef;
  categoryRequest: ICategoryRequest;
  category: ICategoryItemResponse;
  categoryNew: ICategoryItemResponse;
  private suscriptions: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.suscriptions.push(this.productService.getCategories().subscribe(
      resp => (this.categorias = resp.data.categorias,
        console.log(resp.data.categorias))
    ));
  }

  search(term: string){
    //console.log("Recibiendo: "+ term)
    this.filterMatch = term;
  }

  removeCategory(i: number){
      console.log("posicion: "+ i);
      let id =  this.categorias[i].id;
      this.categorias.splice(i, 1);
      this.suscriptions.push(this.productService.deleteCategory(id).subscribe());
  }

  addNewCategory(){
    console.log("Por agregar una Categoria");
    this.bsModalRef = this.modalService.categoryAdd("Categorias", "Productos", this.category);
    this.bsModalRef.content.event.subscribe(
    resp => {
             this.productService.addCategory(resp.data).subscribe(
                  c => {
                        this.categoryNew = c.data.categorias[0],
                        this.categorias.push(this.categoryNew)
                       }
             );

    });
  }

  editCategory(i: number){
    console.log("Por editar una Categoria");
    let id = this.categorias[i].id;
    this.bsModalRef = this.modalService.categoryEdit("Categorias", "Productos", this.categorias[i], i);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data),
      this.categoryRequest = resp.data,
      this.category.id = id,
      this.categorias.splice(i, 1, this.category),
      this.suscriptions.push(this.productService.putCategory(this.category.id, this.categoryRequest ).subscribe());
    });
  }


  ngOnDestroy(): void {
    this.suscriptions.forEach(suscription => suscription.unsubscribe());
  }

}
