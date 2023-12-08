import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatCatgComponent } from './creat-catg.component';

describe('CreatCatgComponent', () => {
  let component: CreatCatgComponent;
  let fixture: ComponentFixture<CreatCatgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatCatgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatCatgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
