import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookRecordComponent } from './book-record.component';


describe('BookRecordComponent', () => {
  let component: BookRecordComponent;
  let fixture: ComponentFixture<BookRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ BookRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
