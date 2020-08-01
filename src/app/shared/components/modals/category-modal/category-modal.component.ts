import { Component, OnInit, EventEmitter } from '@angular/core';
import { ICategoryItemResponse } from 'src/app/core/interfaces/responses/category.response';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  title: string;
  message: string;
  category: ICategoryItemResponse;
  public event: EventEmitter<any> = new EventEmitter();
  formCategory: FormGroup;
  action: string;
  i: number;
  view: boolean;

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) {
    this.formCategory = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.category);
      if(this.category){
        this.formCategory.patchValue({
        descripcion: this.category.descripcion
        });
     }
    }

  sendObject(item: string, pos?: number) {
    this.event.emit({data: item, position: pos, res: 200});
  }

  onSubmit(){
    switch (this.action) {
      case 'add':
        console.log( "add to modal component" + this.formCategory.value);
        this.sendObject(this.formCategory.value);
        this.bsModalRef.hide();
        break;
      case 'edit':
        console.log( "Edit to modal component" + this.formCategory.value);
        this.sendObject(this.formCategory.value, this.i);
        this.bsModalRef.hide();
        break;

      default:
        break;
    }
  }

}
