import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTourComponent } from './lista-tour.component';

describe('ListaTourComponent', () => {
  let component: ListaTourComponent;
  let fixture: ComponentFixture<ListaTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
