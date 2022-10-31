import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-data',
  template: `<form id="form" [formGroup]="form" (ngSubmit)="onsubmit()">
  <div class="rowForm" *ngFor="let formField of formFields">
      <label>{{formField.name}}</label>
 
          <input type="{{formField.type}}" formControlName="{{formField.name}}" >
  </div>
  <button type="submit" value="submit" [disabled]="form.invalid">Submit</button>
</form>`,

})

export class FormDataComponent implements OnInit {
  formFields: any[]=[];
  form = new FormGroup({});
  constructor( private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.httpClient.get<any[]>('/assets/form-data.json').subscribe((formFields:any[])=>{
      for(const formField of formFields){
        this.form.addControl(formField.name, new FormControl('', this.getValidator(formField)));

      }
      this.formFields=formFields;
    })
     
    
  }
  getValidator(formField: any): ValidatorFn[] | null{
    let validations: ValidatorFn[]=[];
    for(var i of formField.validation)
    {
      if(i == "email"){
        validations.push(Validators.email);
      }
      else if(i=="required"){
        validations.push(Validators.required);
      }
    }
    return validations;
  }


onsubmit(): void {
  if (this.form.valid) {
    let value = this.form.value;
    console.log(value);
  }
}

}


