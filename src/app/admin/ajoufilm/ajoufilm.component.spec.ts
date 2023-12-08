import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoufilmComponent } from './ajoufilm.component';

describe('AjoufilmComponent', () => {
  let component: AjoufilmComponent;
  let fixture: ComponentFixture<AjoufilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoufilmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoufilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
