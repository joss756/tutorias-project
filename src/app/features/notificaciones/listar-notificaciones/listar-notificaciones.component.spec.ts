import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarNotificacionesComponent } from './listar-notificaciones.component';

describe('ListarNotificacionesComponent', () => {
  let component: ListarNotificacionesComponent;
  let fixture: ComponentFixture<ListarNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarNotificacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
