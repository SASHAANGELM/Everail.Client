import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningPageComponent } from './mining.page.component';

describe('MiningPageComponent', () => {
  let component: MiningPageComponent;
  let fixture: ComponentFixture<MiningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiningPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
