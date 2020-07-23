import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductServiceMock } from './mocks/product.service.mock';
import { ProductService } from './services/product.service';
import { environment } from 'src/environments/environment';
import { ClientServiceMock } from './mocks/client.service.mock';
import { ClientService } from './services/client.service';


const prod = environment.production;
const mockProductServiceApi = environment.apis.productApi.mock;

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: ProductService,
      useFactory: createService,
      deps: [Injector]
    },
    {
      provide: ClientService,
      useFactory: createClientService,
      deps: [Injector]
    }
  ]
})
export class CoreModule { }
export function createService(injector: Injector) {
  if (!prod && mockProductServiceApi) {
    return new ProductServiceMock(injector.get(HttpClient));
  } else {
    return new ProductService(injector.get(HttpClient));
  }
}
export function createClientService(injector: Injector) {
  if (!prod && mockProductServiceApi) {
    return new ClientServiceMock(injector.get(HttpClient));
  } else {
    return new ClientService(injector.get(HttpClient));
  }
}
