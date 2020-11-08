import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductRequest } from 'src/app/core/interfaces/requests/product.request';
import { IProductItemResponse } from 'src/app/core/interfaces/responses/product.response';
import { ITrackInfo } from 'src/app/core/interfaces/utils';
import { ProductService } from 'src/app/core/services/product.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { TackingService } from 'src/app/core/services/tacking.service';
import Swal from 'sweetalert2';
import { ITrackInfoItemResponse } from '../../core/interfaces/responses/track.response';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  idProducto: string;
  product: IProductItemResponse = { id:'', descripcion:'', precioCompra: 0, ivaCompra: 0,cantidad:0, codigo:0, precio: 0, iva: { id: '', iva: 0}, stock: 0, precios: [], proveedor: null, comentario:'', seguimiento: false, seguimientoInfo:[]};
  productRequest: IProductRequest = { id:'', descripcion:'', precioCompra: 0, ivaCompra: 0,cantidad:0, codigo:0, precio: 0, iva: { id: '', iva: 0}, stock: 0, precios: [], proveedor: null, comentario:'', seguimiento: false, seguimientoInfo:[]};
  seguimientos: Array<ITrackInfoItemResponse>;
  formProduct: FormGroup;
  flagStockChange: boolean = false;
  private suscriptions: Subscription[] = [];
  tracking: ITrackInfo;


  page: number  = 1;


  constructor(
    private productService: ProductService,
    private trackService: TackingService,
    private swalService: SwalService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.formProduct = this.fb.group({
      stock: ['', Validators.required],
      seguimientoInfo: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.idProducto = this.activateRoute.snapshot.paramMap.get('idProducto');
    console.log("entro de nuevo");
    this.suscriptions.push(
                      this.productService.getProduct(this.idProducto).subscribe(p => {console.log(p), this.product = p.data.productos[0]}),
                      this.trackService.getInStockTrackingByProduct(this.idProducto).subscribe(s =>
                                        {
                                             console.log(s.data.seguimientos);
                                             this.seguimientos = s.data.seguimientos,
                                             this.init(this.product);
                                        })
                      );
  
  }

  init(p: IProductItemResponse){
    this.productRequest.id = p.id;
    this.productRequest.descripcion = p.descripcion;
    this.productRequest.codigo = p.codigo;
    this.productRequest.stock = p.stock;
    this.formProduct.controls.stock.setValue(this.productRequest.stock);
    this.productRequest.proveedor = p.proveedor;

    this.createForm(this.productRequest.stock, this.seguimientos);

    // if((this.seguimientos === undefined || this.seguimientos.length === 0) && this.productRequest.stock > 0 ) {
    //   console.log("entro");
    //   this.createForm(this.productRequest.stock);
    // } else if ( this.seguimientos.length  < this.productRequest.stock){
    //     //cargar los existentes y crear lugares para nuevo 
    // }
  
    
  }

  get seguimientoInfo(): FormArray {
    return this.formProduct.get('seguimientoInfo') as FormArray;
  }

  createForm(stock: number, tracking?: Array<ITrackInfoItemResponse> ){
    const c =  Number(stock);
    for (let index = 0; index < c; index++) {
      let track;
      if(tracking !== undefined && tracking.length > 0 ) {
        let defaultValueId = '';
        let defaultValue = '';
        if (tracking[index] !== undefined){
          defaultValueId = tracking[index].id; 
          defaultValue = tracking[index].codigo;
        }
        track = this.fb.group({
          id: new FormControl(defaultValueId),
          codigo : new FormControl(defaultValue, Validators.required)
        });
      } else {
      track = this.fb.group({
        id: new FormControl(''),
        codigo : new FormControl('', Validators.required)
      });
      }
      this.seguimientoInfo.push(track);
    }
  }

  deleteTrack(id: string, c: FormGroupName, i: number){
    console.log(id);
    console.log(c);
    console.log(i);
    if (id) {
      const pos = i;
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir este cambio',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#DF1B1A',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.value) { // Llamar servicio
          this.suscriptions.push( this.trackService.deleteTrack(id).subscribe(
            response => {
                this.swalService.success(`Seguimiento eliminado con éxito`);
                this.seguimientoInfo.removeAt(pos);
                this.seguimientos.splice(pos);
                // const stock = Number(this.productRequest.stock) - 1;
                // this.formProduct.controls.stock.setValue(stock);
                this.router.navigate(['seguimientoProducto', id])
              },
              error => {
                this.swalService.error(`No se ha podido eliminar el Seguimiento.`)
              })
          );
        }
      });
    } else {
      this.seguimientoInfo.removeAt(i);
    }

  }

  stockChange() {
    if ( this.formProduct.controls.stock.value < this.productRequest.stock ) {
        this.flagStockChange = true;
    }else{
      //es mayor, hay que agregar cambios
      this.formProduct.controls.seguimientoInfo = this.fb.array([]);
      console.log(this.formProduct.controls.stock.value);
      console.log(this.seguimientos);
      this.createForm(this.formProduct.controls.stock.value, this.seguimientos);

    }
  }

  onSubmit(){
    this.productRequest.stock = this.formProduct.controls.stock.value;
    this.formProduct.controls.seguimientoInfo.value.forEach( s => {
         this.tracking = {id: '', facturaCompra: null, codigo: '', facturaVenta: null, vendido: false, producto: null},
         this.tracking.id = s.id,
         this.tracking.codigo = s.codigo,
         this.productRequest.seguimientoInfo.push(this.tracking)
      });
    console.log("SALIDA DEL REQUEST: ");
    console.log(this.productRequest);
    this.suscriptions.push(
        this.trackService.manageTracking(this.productRequest).subscribe(
        response => {
          console.log(response),
           this.swalService.success(`Cambios realizados con éxito`),
           this.router.navigate(['productos'])
         },
        error => this.swalService.error(`No se ha podido realizar los cambios.`)
   ));

  }
}

