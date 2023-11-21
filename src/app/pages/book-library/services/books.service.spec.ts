import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { BooksService } from './books.service';
import { Book } from '../interfaces/books.interface';

describe('BooksService', () => {
  let service: BooksService;
  let httpTestingController: HttpTestingController;
  let api: string = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService],
    });
    service = TestBed.inject(BooksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get owner book list', () => {
    const mockDataResponse: Book[] = [
      {
        "id": "l18xkdsmox",
        "title": "Practical MongoDB",
        "subtitle": "Architecting, Developing, and Administering MongoDB",
        "isbn13": 9781484206485,
        "price": "$41.57",
        "image": "https://itbook.store/img/books/9781484206485.png",
        "url": "https://itbook.store/books/9781484206485",
        "userRegister": "q4qffw5f22"
      },
      {
        "id": "qq8yhv2qlh",
        "title": "The Definitive Guide to MongoDB, 3rd Edition",
        "subtitle": "A complete guide to dealing with Big Data using MongoDB",
        "isbn13": 9781484211830,
        "price": "$49.99",
        "image": "https://itbook.store/img/books/9781484211830.png",
        "url": "https://itbook.store/books/9781484211830",
        "userRegister": "q4qffw5f22"
      },
    ];

    service.getOwnerBooks('suarez').subscribe((res) => {
      expect(res.response).toEqual(mockDataResponse)
    })

    const url = `${api}/books`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(mockDataResponse);
  });

  it('Get book list fail', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const mockErrorMessage = 'Error de conexion';
    const mockData: Book[] = []

    service.getOwnerBooks('suarez').subscribe((res) => {
      expect(res.status).toBeFalsy();
      expect(res.message).toEqual(mockErrorMessage);
      expect(res.response).toEqual(mockData)
    });

    const url = `${api}/books`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(mockErrorMessage, { status, statusText });
  });
});
