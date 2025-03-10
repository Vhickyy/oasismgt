import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { closeauthGuard } from './closeauth.guard';

describe('closeauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => closeauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
