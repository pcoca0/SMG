import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  filter: string;
  @Output() filterEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  search() {
    //console.log("Enviando: "+  this.filter);
    this.filterEvent.emit(this.filter);
  }



}
