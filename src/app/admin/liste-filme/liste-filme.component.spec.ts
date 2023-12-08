import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFilmeComponent } from './liste-filme.component';

describe('ListeFilmeComponent', () => {
  let component: ListeFilmeComponent;
  let fixture: ComponentFixture<ListeFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFilmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
