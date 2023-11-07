import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateBooksFiltersComponent } from './private-books-filters.component';

describe('PrivateBooksFiltersComponent', () => {
  let component: PrivateBooksFiltersComponent;
  let fixture: ComponentFixture<PrivateBooksFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateBooksFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateBooksFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
