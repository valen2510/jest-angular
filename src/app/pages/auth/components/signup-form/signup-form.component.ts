import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserCheck } from '../../interfaces/user.interface';
import { Observable, map } from 'rxjs';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../interfaces/category.interface';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  categoriesCatalog: Category[] = [];
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private categoryService: CategoryService
  ) {
    this.buildForm();
    this.getCategories();
  }

  buildForm() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required, this.asyncNameValidator()],
        email: this.fb.control(
          '',
          [Validators.required, Validators.email],
          [this.asyncEmailValidator()]
        ),
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@+_#\?\$%\^&\*])(?=.{8,})/
          ),
        ]),
        confirmPassword: this.fb.control('', [
          Validators.required,
          this.passwordMatchingValidator(),
        ]),
        categories: this.fb.array([], this.arrayMinLength(3)),
      },
      { updateOn: 'blur' || 'submit' }
    );
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categoriesCatalog = res.response!;
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const myFormValues = this.registerForm.getRawValue();
    const { name, email, password, categories } = myFormValues;
    const newUser = {
      name,
      email,
      password,
      category: categories,
    };

    this.authService.createUser(newUser).subscribe((res) => {
      alert(res.message);
      return;
    });
  }

  onClickCategory(e: any) {
    const detail = e.detail;
    const { value, checked } = detail;

    if (checked) {
      this.categories.push(this.fb.control(value));
    } else {
      const index = this.categories.controls.findIndex(
        (item) => item.value === value
      );
      this.categories.removeAt(index);
    }
  }

  get name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  get categories(): FormArray {
    return this.registerForm.get('categories') as FormArray;
  }

  validationMessages = () => {
    return {
      name: {
        required: 'Nombre de usuario es requerido',
        exists: 'Nombre de usuario ya se encuentra en uso',
      },
      email: {
        required: 'Correo es requerido',
        email: 'Correo debe ser valido',
        exists: 'Correo ya se encuentra en uso',
      },
      password: {
        required: 'Contrasena es requerida',
        pattern:
          'Contrasena debe tener un carácter en mayúscula, un carácter numérico y un carácter especial',
        minLength: 'Contrasena debe ser de minimo 8 caracteres',
      },
      confirmPassword: {
        required: 'Confirmacion de contrasena es requerida',
        notMatched: 'Contrasenas deben ser iguales',
      },
      categories: {
        minLength: 'Debe seleccionar al menos 3 categorias',
      },
    };
  };

  get errorName() {
    return this.name.hasError('required')
      ? this.validationMessages().name.required
      : this.name.hasError('exists')
      ? this.validationMessages().name.exists
      : '';
  }

  get errorEmail() {
    return this.email.hasError('required')
      ? this.validationMessages().email.required
      : this.email.hasError('email')
      ? this.validationMessages().email.email
      : this.email.hasError('exists')
      ? this.validationMessages().email.exists
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

  get errorConfirmPassword() {
    return this.confirmPassword.hasError('required')
      ? this.validationMessages().confirmPassword.required
      : this.confirmPassword.hasError('notMatched')
      ? this.validationMessages().confirmPassword.notMatched
      : '';
  }

  get errorCategories() {
    return this.categories.hasError('minLength')
      ? this.validationMessages().categories.minLength
      : '';
  }

  passwordMatchingValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.registerForm && this.password?.value === control?.value
        ? null
        : { notMatched: true };
    };
  };

  arrayMinLength = (min: number): ValidatorFn | any => {
    return (control: AbstractControl[]): ValidationErrors | null => {
      return control.length < min ? { minLength: true } : null;
    };
  };

  asyncNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<UserCheck | null> => {
      return this.authService.existsUsername(control.value).pipe(
        map((res) => {
          if (!res.status) {
            alert(res.message);
          }
          return res.response?.exists ? res.response : null;
        })
      );
    };
  }

  asyncEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<UserCheck | null> => {
      return this.authService.existsEmail(control.value).pipe(
        map((res) => {
          if (!res.status) {
            alert(res.message);
          }
          return res.response?.exists ? res.response : null;
        })
      );
    };
  }
}
