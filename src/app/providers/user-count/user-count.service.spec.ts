import { TestBed } from '@angular/core/testing';

import { UserCountService } from './user-count.service';

describe('UserCountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCountService = TestBed.get(UserCountService);
    expect(service).toBeTruthy();
  });
});
