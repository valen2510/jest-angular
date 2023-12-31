import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../../environments/environment';
import { UserCheck } from '../interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let api: string = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
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

  it('check username value that does not exists', () => {
    const mockDataResponse = { status: true, response: { exists: false } };

    authService.existsUsername('exampleName').subscribe((res) => {
      expect(res.response?.exists).toBeFalsy();
    });

    const url = `${api}/users/exist-name/exampleName`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(mockDataResponse);
  });

  it('check username value that exists', () => {
    const mockDataResponse = { status: true, response: { exists: true } };

    authService.existsUsername('existingName').subscribe((res) => {
      expect(res.response?.exists).toBeTruthy();
    });

    const url = `${api}/users/exist-name/existingName`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(mockDataResponse);
  });

  it('check username value request fail', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const mockErrorMessage = 'Error de conexion';

    authService.existsUsername('existingName').subscribe((res) => {
      expect(res.status).toBeFalsy();
      expect(res.message).toEqual(mockErrorMessage);
    });

     const url = `${api}/users/exist-name/existingName`;
     const req = httpTestingController.expectOne(url);

     expect(req.request.method).toEqual('GET');

     req.flush(mockErrorMessage, {status, statusText});
   });

  it('check email value that does not exists', () => {
    const mockDataResponse = { status: true, response: { exists: false } };
    const mockEmail = 'newEmail'

    authService.existsEmail(mockEmail).subscribe((res) => {
      expect(res.response?.exists).toBeFalsy();
    });

    const url = `${api}/users/exist-email?email=newEmail`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(mockDataResponse);
  });

  it('check email value that exists', () => {
    const mockDataResponse = { status: true, response: { exists: true } };
    const mockEmail = 'usedEmail';

    authService.existsEmail(mockEmail).subscribe((res) => {
      expect(res).toEqual(mockDataResponse);
    });

    const url = `${api}/users/exist-email?email=usedEmail`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(mockDataResponse);
  });

  // it('create a new user', () => {
  //   const mockDataResponse = { status: true, response: 'Ok' };
  //   const mockData = {
  //     name: 'newUser',
  //     email: 'new-user@email.com',
  //     password: 'qwerty',
  //     category: [12, 7, 17],
  //   };

  //   authService.createUser(mockData).subscribe((res) => {
  //     expect(res).toEqual(mockDataResponse);
  //   });

  //   const url = `${api}/users`;
  //   const req = httpTestingController.expectOne(url);

  //   expect(req.request.method).toEqual('POST');

  //   req.flush(mockDataResponse);
  // });

  it('login with user', () => {
    const mockData = {
      username: 'newUser',
      password: 'qwerty',
    };
    const mockDataResponse = {
      status: true,
      response: {
        user: {
          username: 'newUser',
          userId: 'IdString',
        },
        access_token: 'accessToken',
        tokenType: 'tokenType',
      },
    };

    authService.loginUser(mockData).subscribe((res) => {
      expect(res.response?.user).toEqual(mockDataResponse.response.user);
    });

    const url = `${api}/users/login`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('POST');

    req.flush(mockDataResponse);
  });
});
