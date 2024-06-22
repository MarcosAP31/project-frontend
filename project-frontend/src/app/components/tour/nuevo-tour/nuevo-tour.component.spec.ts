import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTourComponent } from './nuevo-tour.component';

describe('NuevoTourComponent', () => {
  let component: NuevoTourComponent;
  let fixture: ComponentFixture<NuevoTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuevoTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
