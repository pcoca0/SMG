import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/core/services/client.service';
import { IClientItemResponse } from 'src/app/core/interfaces/responses/client.response';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  today: number = Date.now();
  filterMatch: string = '';
   clientes: Array<IClientItemResponse>;
  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      resp => {this.clientes = resp.data.clientes,
      console.log("HOLA" + resp)}
    )
  }
  search(term: string){
    //console.log("Recibiendo: "+ term)
    this.filterMatch = term;
  }
}

