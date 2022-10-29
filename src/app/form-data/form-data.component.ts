import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormField } from '../form-field';


@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css']
})
export class FormDataComponent implements OnInit {
  formFields: FormField[] | undefined;
  form = new FormGroup({});
  constructor( private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.httpClient.get<FormField[]>("/assets/form-data.json").subscribe((formFields) => {
      for (const formField of formFields) {
        this.form.addControl(formField.name, new FormControl('',this.getValidator(formField)));
      }
      this.formFields = formFields;
    });
  }
  getValidator(formField: FormField): any{
    for(let i in formField.validaton){
    switch(i) {
      case "email":
        return Validators.email;
      case "required":
        return Validators.required;
      default:
        console.log("fail");
  
  }
}


}
submit(): void {
  if (this.form.valid) {
    let value = this.form.value;
    console.log(value);
  }
}
}
