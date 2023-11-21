import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PrivateLibraryComponent } from './private-library.component';

describe('PrivateLibraryComponent', () => {
  let component: PrivateLibraryComponent;
  let fixture: ComponentFixture<PrivateLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PrivateLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
