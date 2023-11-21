import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../interfaces/category.interface';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-book-record',
  templateUrl: './book-record.component.html',
  styleUrls: ['./book-record.component.scss']
})
export class BookRecordComponent {
  categoriesCatalog: Category[] = [];
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.buildForm();
    this.getCategories();
  }

  buildForm() {
    this.registerForm = this.fb.group(
      {
        bookName: ['', Validators.required],
        authorName: ['', Validators.required],
        bookUrl: ['',  Validators.required],
        bookImage: this.fb.control('', [
          Validators.required,
        ]),
        bookResume: this.fb.control('', [
          Validators.required,
        ]),
        publish: [false, Validators.required],
        categories: this.fb.array([]),
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
    const {
      bookName,
      authorName,
      bookUrl,
      bookImage,
      bookResume,
      publish,
      categories
    } = myFormValues;
    const newBook = {
      bookName,
      authorName,
      bookUrl,
      bookImage,
      bookResume,
      publish,
      category: categories,
    };

    console.log(newBook)
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

  get bookName(): FormControl {
    return this.registerForm.get('bookName') as FormControl;
  }

  get authorName(): FormControl {
    return this.registerForm.get('authorName') as FormControl;
  }

  get bookUrl(): FormControl {
    return this.registerForm.get('bookUrl') as FormControl;
  }

  get bookImage(): FormControl {
    return this.registerForm.get('bookImage') as FormControl;
  }

  get bookResume(): FormControl {
    return this.registerForm.get('bookResume') as FormControl;
  }

  get categories(): FormArray {
    return this.registerForm.get('categories') as FormArray;
  }

  validationMessages = () => {
    return {
      bookName: {
        required: 'Nombre del libro es requerido',
      },
      authorName: {
        required: 'Nombre de el autor es requerido',
      },
      bookUrl: {
        required: 'URL del libro requerido',
      },
      bookImage: {
        required: 'Imagen de portada requerida',
      },
      bookResume: {
        required: 'Resumen del libro es requerido',
      },
      categories: {
        minLength: 'Debe seleccionar al menos 3 categorias',
      },
    };
  };

  get errorBookName() {
    return this.bookName.hasError('required')
      ? this.validationMessages().bookName.required
      : '';
  }

  get errorAuthorName() {
    return this.authorName.hasError('required')
      ? this.validationMessages().authorName.required
      : '';
  }

  get errorBookUrl() {
    return this.bookUrl.hasError('required')
      ? this.validationMessages().bookUrl.required
      : '';
  }

  get errorBookImage() {
    return this.bookImage.hasError('required')
      ? this.validationMessages().bookImage.required
      : '';
  }

  get errorBookResume() {
    return this.bookResume.hasError('required')
      ? this.validationMessages().bookResume.required
      : '';
  }

  get errorCategories() {
    return this.categories.hasError('minLength')
      ? this.validationMessages().categories.minLength
      : '';
  }
}
