import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../../environments/environment';
import { UserCheck } from '../interfaces/user.interface';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let api: string = environment.api;
  const mockDataResponse = 3564;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  test('check username value that does not exists', () => {

    authService.existsUsername('exampleName').subscribe((res) => {
        expect(res.status).toBeFalsy();
        console.log('heeeeeeeeeeeeeey', res.status);
        console.log('hello')
      });

    const url = `${api}/users/exist-name/exampleName`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET')

    req.flush(mockDataResponse);
  });
});
