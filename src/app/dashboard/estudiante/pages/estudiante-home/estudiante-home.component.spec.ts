import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteHomeComponent } from './estudiante-home.component';

describe('EstudianteHomeComponent', () => {
  let component: EstudianteHomeComponent;
  let fixture: ComponentFixture<EstudianteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudianteHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
