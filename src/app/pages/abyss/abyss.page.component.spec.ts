import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbyssPageComponent } from './abyss.page.component';

describe('AbyssPageComponent', () => {
  let component: AbyssPageComponent;
  let fixture: ComponentFixture<AbyssPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbyssPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbyssPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
