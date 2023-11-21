import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ LoginFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    component = fixture.componentInstance;
    // console.log(component)
    // expect(component).toBeTruthy();
  });
});
