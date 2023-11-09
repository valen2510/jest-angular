import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { environment } from '../../environments/environment';
import { Category } from '../interfaces/category.interface';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;
  let api: string = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get category list', () => {
    const mockDataResponse = [
      {
        id: 1,
        description: 'Action and adventure',
      },
      {
        id: 2,
        description: 'Alternate history',
      },
      {
        id: 3,
        description: 'Anthology',
      },
    ];

    service.getAllCategories().subscribe((res) => {
      expect(res.response).toEqual(mockDataResponse)
    })

    const url = `${api}/category`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(mockDataResponse);
  });

  it('Get category list fail', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const mockErrorMessage = 'Error de conexion';
    const mockData: Category[] = []

    service.getAllCategories().subscribe((res) => {
      expect(res.status).toBeFalsy();
      expect(res.message).toEqual(mockErrorMessage);
      expect(res.response).toEqual(mockData)
    });

    const url = `${api}/category`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(mockErrorMessage, { status, statusText });
  });
});
