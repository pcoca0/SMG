import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductRequest } from 'src/app/core/interfaces/requests/product.request';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { ITrackInfoItemResponse } from 'src/app/core/interfaces/responses/track.response';
import { ITrackInfo } from 'src/app/core/interfaces/utils';
import { ProductService } from 'src/app/core/services/product.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { TackingService } from 'src/app/core/services/tacking.service';

@Component({
  selector: 'app-tracking-view',
  templateUrl: './tracking-view.component.html',
  styleUrls: ['./tracking-view.component.scss']
})
export class TrackingViewComponent implements OnInit {

  idProducto: string;
  productos: Array<IProductItemResponse>;
  producto: IProductItemResponse;
  product: IProductItemResponse = { id:'', descripcion:'', precioCompra: 0, ivaCompra: 0,cantidad:0, codigo:0, precio: 0, iva: { id: '', iva: 0}, stock: 0, precios: [], proveedor: null, comentario:'', seguimiento: false, seguimientoInfo:[]};
  productRequest: IProductRequest = { id:'', descripcion:'', precioCompra: 0, ivaCompra: 0,cantidad:0, codigo:0, precio: 0, iva: { id: '', iva: 0}, stock: 0, precios: [], proveedor: null, comentario:'', seguimiento: false, seguimientoInfo:[]};
  formProduct: FormGroup;
  flagStockChange = false;
  private suscriptions: Subscription[] = [];
  tracking: ITrackInfo;
  page: number  = 1;
  filterMatch: string;

  seguimientos: Array<ITrackInfoItemResponse>;
  seguimientosT: Array<ITrackInfoItemResponse>;
  seguimientosE: Array<ITrackInfoItemResponse>;
  seguimientosA: Array<ITrackInfoItemResponse>;



  dropdownSetup: Object = {
    displayKey:'descripcion', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Selecciona', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'Más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No se encontraron resultados!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Buscar', // label thats displayed in search input,
    searchOnKey: 'descripcion', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }



  constructor(
    private productService: ProductService,
    private trackService: TackingService,
    private swalService: SwalService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formProduct = this.fb.group({
      producto: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.suscriptions.push(
      this.productService.getProducts().subscribe(resp => this.productos = resp.data.productos.filter(p => p.seguimiento))
                  );
  }

  search(term: string){
    this.filterMatch = term;
  }

  selectProduct() {
    this.producto = this.formProduct.controls.producto.value;
    console.log("producto seleccionado");
    console.log(this.producto);
    this.suscriptions.push(
      this.trackService.getTrackByProducts(this.producto.id).subscribe(s =>
                             {this.seguimientosT = s.data.seguimientos,
                             this.seguimientos = this.seguimientosT}
                        ),
      this.trackService.getInStockTrackingByProduct(this.producto.id).subscribe(s =>
                             this.seguimientosE = s.data.seguimientos
                        ),
      this.trackService.getSoldTrackingByProduct(this.producto.id).subscribe(s =>
                             this.seguimientosA = s.data.seguimientos
                        )
    );
  }

  onSubmit() {}

  tackProduct(idProducto: string){
    this.router.navigate(['seguimientoProducto', idProducto]);
  }

  editInvoice(id: string) {
    console.log('id invoice' + id);
    this.router.navigate(['editarFactura', id]);
  }

  view(id: number){
    switch (id) {
      case 1:
        this.seguimientos = this.seguimientosT;
        break;
      case 2:
        this.seguimientos = this.seguimientosA;
        break;
      case 3:
        this.seguimientos = this.seguimientosE;
        break;
      default:
        break;
    }
    console.log(id);
  }
}
