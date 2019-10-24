import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomainService } from '../domain.service';

@Component({
  selector: 'jhi-new-comain',
  templateUrl: './new-domain.component.html',
  styleUrls: ['./new-domain.component.scss']
})
export class NewDomainComponent implements OnInit {
  newDomainForm: FormGroup;

  constructor(private fb: FormBuilder, private domainService: DomainService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newDomainForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  save() {
    this.domainService.create(this.newDomainForm.value).subscribe(
      res => {
        this.previousState();
      },
      err => {
        console.log(err);
      }
    );
  }

  previousState() {
    window.history.back();
  }

  isInvalidForm(fieldName): boolean {
    return (
      this.newDomainForm.controls[fieldName].invalid &&
      (this.newDomainForm.controls[fieldName].dirty || this.newDomainForm.controls[fieldName].touched)
    );
  }

  isRequired(filedName): boolean {
    return this.newDomainForm.controls[filedName].errors.required;
  }
}
