import { TestBed } from '@angular/core/testing';

import { AuthServceService } from './auth-servce.service';

describe('AuthServceService', () => {
  let service: AuthServceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
