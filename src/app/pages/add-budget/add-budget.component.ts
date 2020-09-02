import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClientItemResponse } from 'src/app/core/interfaces/responses/client.response';
import { ClientService } from 'src/app/core/services/client.service';
import { Subscription } from 'rxjs';
import { IBudgetRequest } from '../../core/interfaces/requests/budget.resquest';
import { BudgetService } from '../../core/services/budget.service';
import { SwalService } from '../../core/services/swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss']
})
export class AddBudgetComponent implements OnInit, OnDestroy {

  today: number =  Date.now();
  totalizador: number;
  totalizadorParcial = 0;
  productos: Array<IProductItemResponse>;
  presupuesto: Array<IProductItemResponse> = [];
  bsModalRef: BsModalRef;
  listForm: FormGroup;
  element: IProductItemResponse;
  clients: Array<IClientItemResponse>;
  client: IClientItemResponse;
  clientView: IClientItemResponse;
  budgetRequest: IBudgetRequest = {cliente: null, productos: []};
  flagEdit = false;
  private suscriptions: Subscription[] = [];


  dropdownSetup: object = {
    displayKey:'razonSocial', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Selecciona', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    //limitTo: options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'Más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No se encontraron resultados!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Buscar', // label thats displayed in search input,
    searchOnKey: 'descripcion', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }


  constructor(
      private modalService: ModalService,
      private productService: ProductService,
      private clientService: ClientService,
      private budgetService: BudgetService,
      private fB: FormBuilder,
      private swalService: SwalService,
      private activateRoute: ActivatedRoute,
      private router: Router
  ) {
    this.listForm = this.fB.group({
      client: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.suscriptions.push(this.productService.getProducts().subscribe(
                            resp => { this.productos = resp.data.productos
                                    } ));
    this.suscriptions.push(this.clientService.getClients().subscribe(
                            resp => {this.clients = resp.data.clientes
                                     }));
    if (this.activateRoute.snapshot.paramMap.get('id')) {
      this.flagEdit = true;
      this.suscriptions.push(this.budgetService.getBudget(this.activateRoute.snapshot.paramMap.get('id')).subscribe(
                  resp => {
                            this.client = resp.data.presupuestos[0].cliente,
                            this.budgetRequest = resp.data.presupuestos[0],
                            this.clientView =  resp.data.presupuestos[0].cliente,
                            this.listForm.controls.client.setValue( resp.data.presupuestos[0].cliente),
                            this.totalizador =  resp.data.presupuestos[0]?.total || 0 
                          }));
    }

  }

  addBudgetItem() {
    this.bsModalRef = this.modalService.budgetAdd('Presupuesto', 'Productos', this.productos);
    this.bsModalRef.content.event.subscribe(
    resp => {
          if (this.budgetRequest.productos.find(p => p.id === resp['data'].id)){
            this.swalService.warning(`El producto seleccionado ya esta en la lista.`)
          } else {
          this.budgetRequest.productos.push(resp['data']);
          this.updateTotalizador();
          }
    });
 }


 addNewClient(){
  console.log('Por agregar una cliente');
  this.bsModalRef = this.modalService.clientAdd('Cliente', 'Productos', this.client);
  this.bsModalRef.content.event.subscribe(
  resp => {
    this.suscriptions.push(this.clientService.addClient(resp.data).subscribe(
                    response => {
                     this.clientView = response.data.clientes[0],
                    //this.clients.push(this.client),
                    //this.options = [...this.options, {id: 34, description: 'Adding new item'}];
                    //lo tengo que hacer asi por el change detec
                    this.clients = [...this.clients, this.clientView],
                    this.listForm.controls.client.setValue(this.clientView),
                    this.budgetRequest.cliente = this.clientView,
                    console.log(this.clientView)
  }));
  });
}

  selectClient() {
  this.clientView = this.listForm.value.client;
  this.budgetRequest.cliente = this.clientView;
  console.log(this.clientView);
  }


  updateTotalizador() {
    console.log("subida");
    this.totalizador = 0.00;
    this.budgetRequest.productos.forEach( i => {
      this.totalizador = this.totalizador + i.precio,
      console.log('Precio: ' + i.precio),
      console.log('Acumulador: ' + this.totalizador),
      console.log(this.presupuesto.length)
    });
  }

  removeElement(i: number) {
    console.log('posicion: ' + i);
    this.budgetRequest.productos.splice(i, 1);
    this.updateTotalizador();
  }

  updateElement(i: number) {
    this.bsModalRef = this.modalService.budgetEdit('Presupuesto', 'Editar Producto', this.productos, this.budgetRequest.productos[i], i );
    this.bsModalRef.content.event.subscribe(
      resp => {
        this.budgetRequest.productos.splice(i, 1, resp.data),
        this.updateTotalizador()
      });
  }

  generateFormsControls(){

  }

  saveBudget() {
    this.budgetRequest.total = this.totalizador;
    this.budgetRequest.fecha = new Date();
    console.log(this.budgetRequest);
    if (this.flagEdit) {
      this.suscriptions.push(
        this.budgetService.putBudget(this.budgetRequest.id, this.budgetRequest).subscribe(
          response => this.swalService.success(`Presupuesto editado con éxito`),
          error => this.swalService.error(`No se ha podido editar el presupuesto.`)
        )
      );
    } else {
      this.suscriptions.push(
        this.budgetService.addBudget(this.budgetRequest).subscribe(
          response => {
                        this.swalService.success(`Presupuesto creado con éxito`),
                        this.router.navigate(['editarPresupuesto', response.data.presupuestos[0].id]);
                      },
          error => this.swalService.error(`No se ha podido crear el presupuesto.`)
        )
      );
    }
  }

 ngOnDestroy(): void {
    this.suscriptions.forEach( suscription => suscription.unsubscribe());
  }

  // makePDF(): void {
  //   console.log('imprime');

  //   const  PDF = new jsPDF('p', 'pt', 'a4');
  //   const width = PDF.internal.pageSize.getWidth();
  //   const height = PDF.internal.pageSize.getHeight();
  //   const margins = {
  //     top: 60,
  //     bottom: 80,
  //     left: 40,
  //     width: 522
  //   };

  //   PDF.fromHTML(
  //     document.getElementById('document'), // HTML string or DOM elem ref.
  //     margins.left, // x coord
  //     margins.top, {
  //       // y coord
  //       width: margins.width // max width of content on PDF
  //     },
  //     (dispose: any) => {
  //       // dispose: object with X, Y of the last line add to the PDF
  //       // this allow the insertion of new lines after html
  //       //this.setHeaderAndFooter(PDF, PDF.internal.getNumberOfPages(), width, height),
  //       PDF.save(`${this?.budgetRequest?.id || 'Report sin título'}.pdf`);
  //     },
  //     margins
  //   );
  // }
  
  imprimirPDF(){
    this.router.navigate(['imprimirPresupuesto', this.budgetRequest.id]);
  }

}
