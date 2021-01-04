import { TestBed } from '@angular/core/testing';

import { TypeCategoryService } from './type-category.service';

describe('TypeCategoryService', () => {
  let service: TypeCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
