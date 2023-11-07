import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  registerForm!: FormGroup;
  items = [
    {
      value: '1',
      label: 'option 1',
    },
    {
      value: '2',
      label: 'option 2',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.fb.group({
      input: [null, Validators.required],
      dropdown: [null, Validators.required],
      checkbox: [true, Validators.required],
    });
  }

  onSubmit() {
    const myFormValues = this.registerForm.getRawValue();
    alert(JSON.stringify(myFormValues));
  }

  get input(): FormControl {
    return this.registerForm.get('input') as FormControl;
  }

  get dropdown(): FormControl {
    return this.registerForm.get('dropdown') as FormControl;
  }

  get checkbox(): FormControl {
    return this.registerForm.get('checkbox') as FormControl;
  }
}
