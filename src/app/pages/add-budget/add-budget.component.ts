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
      private swalService: SwalService
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
  }

  addBudgetItem(){
    this.bsModalRef = this.modalService.budgetAdd('Presupuesto', 'Productos', this.productos);
    this.bsModalRef.content.event.subscribe(
    resp => {
      this.presupuesto.push(resp['data']),
      this.updateTotalizador();
    });
 }


 addNewClient(){
  console.log('Por agregar una cliente');
  this.bsModalRef = this.modalService.clientAdd('Cliente', 'Productos', this.client);
  this.bsModalRef.content.event.subscribe(
  resp => {
    this.clientView = resp.data,
    console.log('Nuevo Cliente: ' + this.clientView.apellido)
    //this.clients.push(this.client),
    //this.options = [...this.options, {id: 34, description: 'Adding new item'}];
    //lo tengo que hacer asi por el change detec
    this.clients = [...this.clients, this.clientView],
    this.listForm.controls.client.setValue(this.clientView),
    console.log(this.clientView)
  });
}

  selectClient() {
  this.clientView = this.listForm.value.client;
  console.log(this.clientView);
  }


  updateTotalizador() {
    this.totalizador = 0.00;
    this.presupuesto.forEach( i => {
      this.totalizador = this.totalizador + i.precio,
      console.log('Precio: ' + i.precio),
      console.log('Acumulador: ' + this.totalizador),
      console.log(this.presupuesto.length)
    });
  }

  removeElement(i: number) {
    console.log('posicion: ' + i);
    this.presupuesto.splice(i, 1);
    this.updateTotalizador();
  }

  updateElement(i: number) {
    console.log( this.presupuesto[i]);
    this.bsModalRef = this.modalService.budgetEdit('Presupuesto', 'Editar Producto', this.productos, this.presupuesto[i], i );
    this.bsModalRef.content.event.subscribe(
      resp => {
        this.presupuesto.splice(i, 1, resp.data),
        this.updateTotalizador()
      });
  }

  generateFormsControls(){

  }

  saveBudget() {
    this.budgetRequest.cliente = this.clientView;
    this.budgetRequest.productos = this.productos;
    this.budgetRequest.total = this.today;
    console.log(this.budgetRequest);
    this.suscriptions.push(
      this.budgetService.addBudget(this.budgetRequest).subscribe(
        response => this.swalService.success(`Presupuesto creado con éxito`),
        error => this.swalService.error(`No se ha podido crear el presupuesto.`)
      )
    );
  }

 ngOnDestroy(): void {
    this.suscriptions.forEach( suscription => suscription.unsubscribe());
  }
}
