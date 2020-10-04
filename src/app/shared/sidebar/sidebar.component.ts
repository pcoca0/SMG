import { Component, OnInit } from '@angular/core';
import { ILocationUpdate } from 'src/app/core/interfaces/utils';
import { ProductService } from 'src/app/core/services/product.service';
import { UtilsService } from '../../core/services/utils.service';
import { ILocation } from '../../core/interfaces/utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  private localidadesUpdate: Array<ILocationUpdate>;
  private  localtion: ILocation = {id: null, descripcion:'', codigoPostal: 0};
  
  constructor(
    private productService: ProductService,
    private utilService: UtilsService
  ) { }

  ngOnInit() {

  }


}
