import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBooksFiltersComponent } from './public-books-filters.component';

describe('PublicBooksFiltersComponent', () => {
  let component: PublicBooksFiltersComponent;
  let fixture: ComponentFixture<PublicBooksFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicBooksFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBooksFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
