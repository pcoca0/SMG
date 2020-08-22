import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ICategoryItemResponse } from 'src/app/core/interfaces/responses/category.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ICategoryRequest } from 'src/app/core/interfaces/requests/category.request';
import { Subscription } from 'rxjs';
import { SwalService } from '../../core/services/swal.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  today: number = Date.now();
  categorias: Array<ICategoryItemResponse>;
  filterMatch: string;
  bsModalRef: BsModalRef;
  categoryRequest: ICategoryRequest;
  category: ICategoryItemResponse;
  categoryNew: ICategoryItemResponse;
  private suscriptions: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private modalService: ModalService,
    private swalService: SwalService
  ) { }

  ngOnInit() {
    this.suscriptions.push(this.productService.getCategories().subscribe(
      resp => (this.categorias = resp.data.categorias,
        console.log(resp.data.categorias))
    ));
  }

  search(term: string) {
    this.filterMatch = term;
  }

  removeCategory(i: number) {
      console.log(' posicion: ' + i);
      const id =  this.categorias[i].id;
      this.suscriptions.push(this.productService.deleteCategory(id).subscribe(
        response => {
                      this.swalService.success(`Categoria eliminada con éxito`),
                      this.categorias.splice(i, 1);
                    },
        error => this.swalService.error(`No se ha podido eliminar la Categoria.`)
      ));
  }

  addNewCategory(){
    console.log('Por agregar una Categoria');
    this.bsModalRef = this.modalService.categoryAdd('Categorias', 'Productos', this.category);
    this.bsModalRef.content.event.subscribe(
    resp => {
             this.productService.addCategory(resp.data).subscribe(
                  response => {
                        this.categoryNew = response.data.categorias[0],
                        this.categorias.push(this.categoryNew),
                        this.swalService.success(`Categoria agregada con éxito`)
                       },
                  error => this.swalService.error(`No se ha podido eliminar la categoria.`)
             );

    });
  }

  editCategory(i: number) {
    console.log('Por editar una Categoria');
    const id = this.categorias[i].id;
    this.bsModalRef = this.modalService.categoryEdit('Categorias', 'Productos', this.categorias[i], i);
    this.bsModalRef.content.event.subscribe(
    resp => {
      console.log(resp.data),
      this.categoryRequest = resp.data,
      this.categoryRequest.id = id,
      this.suscriptions.push(this.productService.putCategory(this.categoryRequest.id, this.categoryRequest ).subscribe(
                                 response => {
                                              this.categorias.splice(i, 1, response.data.categorias[0]),
                                              this.swalService.success(`Categoria editada con éxito`)
                                             },
                                 error => this.swalService.error(`No se ha podido editar la categoria.`)
      ));
    });
  }


  ngOnDestroy(): void {
    this.suscriptions.forEach(suscription => suscription.unsubscribe());
  }

}
