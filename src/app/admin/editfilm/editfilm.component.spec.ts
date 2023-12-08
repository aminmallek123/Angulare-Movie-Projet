import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfilmComponent } from './editfilm.component';

describe('EditfilmComponent', () => {
  let component: EditfilmComponent;
  let fixture: ComponentFixture<EditfilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditfilmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditfilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
