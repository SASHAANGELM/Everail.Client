import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbyssPageComponent } from './add-abyss.page.component';

describe('AddAbyssPageComponent', () => {
  let component: AddAbyssPageComponent;
  let fixture: ComponentFixture<AddAbyssPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAbyssPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbyssPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
