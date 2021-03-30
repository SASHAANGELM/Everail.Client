import { TestBed } from '@angular/core/testing';

import { AbyssService } from './abyss.service';

describe('AbyssService', () => {
  let service: AbyssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbyssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
