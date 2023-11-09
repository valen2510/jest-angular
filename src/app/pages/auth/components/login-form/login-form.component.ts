import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
        ]),
      },
      { updateOn: 'blur' }
    );
  }

  onSubmit() {
    const myFormValues = this.registerForm.getRawValue();
    const { username, password } = myFormValues;
    this.authService.loginUser({ username, password }).subscribe((res) => {
      if (!res.status) {
        alert(res.message)
        return
      }
      this.router.navigateByUrl('/books')
    })
  }

  get username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  validationMessages = () => {
    return {
      username: {
        required: 'Nombre de usaurio es requerido',
      },
      password: {
        required: 'Contrasena es requerida',
        pattern:
          'Contrasena debe tener un carácter en mayúscula, un carácter numérico y un carácter especial',
        minLength: 'Contrasena debe ser de minimo 8 caracteres',
      },
    };
  };

  get errorUsername() {
    return this.username.hasError('required')
      ? this.validationMessages().username.required
      : '';
  }

  get errorPassword() {
    return this.password.hasError('required')
      ? this.validationMessages().password.required
      : this.password.hasError('minlength')
      ? this.validationMessages().password.minLength
      : this.password.hasError('pattern')
      ? this.validationMessages().password.pattern
      : '';
  }
}
