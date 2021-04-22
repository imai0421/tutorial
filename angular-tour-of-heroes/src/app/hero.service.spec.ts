import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('HeroService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: HeroService;
 
  var heroesUrl = 'api/values';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getHeroes', () => {
    let heroes: Hero[];

    beforeEach(() => {
      // Dummy data
      heroes = [
        { Id: 1, Name: 'A' },
        { Id: 2, Name: 'B' },
      ] as Hero[];
    });
    
    it('受信確認', () => {
      service.getHeroes().subscribe(
        hero => expect(hero).toEqual(heroes),
        fail
      );

      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(heroes);
    });

    it('受信確認(0件)', () => {
      service.getHeroes().subscribe(
        hero => expect(hero.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne(heroesUrl);
      req.flush([]);
    });
    
    it('受信確認(404)', () => {
      service.getHeroes().subscribe(
        hero => expect(hero.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne(heroesUrl);
      const msg = '404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' }); //Return error
    });

  });

  describe('#searchHeroes', () => {
    let heroes: Hero[];

    beforeEach(() => {
      // Dummy data
      heroes = [
        { Id: 1, Name: 'A' },
        { Id: 2, Name: 'B' },
      ] as Hero[];
    });
    
    it('受信確認(空文字)', () => {
      var name = '';
      service.searchHeroes(name).subscribe(
        hero => expect(hero.length).toEqual(0),
        fail
      );
    });

    it('受信確認', () => {
      var name = 'A';
      service.searchHeroes(name).subscribe(
        hero => expect(hero).toEqual(heroes),
        fail
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${name}`);
      expect(req.request.method).toEqual('GET');

      req.flush(heroes);
    });

    it('受信確認(0件)', () => {
      var name = 'A';
      service.searchHeroes(name).subscribe(
        hero => expect(hero.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${name}`);
      req.flush([]);
    });
    
    it('受信確認(404)', () => {
      var name = 'A';
      service.searchHeroes(name).subscribe(
        hero => expect(hero.length).toEqual(0),
        fail
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${name}`);
      const msg = '404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' }); //Return error
    });

  });

  describe('#getHero', () => {
    let hero: Hero;

    beforeEach(() => {
      // Dummy data
      hero = { Id: 1, Name: 'A' } as Hero;
    });
    
    it('受信確認', () => {
      var id = 1;
      service.getHero(id).subscribe(
        h => expect(h).toEqual(hero),
        fail
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/${id}`);
      expect(req.request.method).toEqual('GET');

      req.flush(hero);
    });
    
    it('受信確認(404)', () => {
      var id = 1;
      service.getHero(id).subscribe(
        hero => expect(hero).toEqual(undefined),
        fail
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/${id}`);
      const msg = '404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' }); //Return error
    });

  });

  
  describe('#addHero', () => {
    let newhero: Hero;
    let hero: Hero;

    beforeEach(() => {
      // Dummy data
      newhero = { Id: undefined, Name: 'A' } as Hero;
      hero = { Id: 1, Name: 'A' } as Hero;
    });
    
    it('受信確認', () => {
      service.addHero(newhero).subscribe(
        h => expect(h).toEqual(hero),
        fail
      );

      const req = httpTestingController.expectOne(`${heroesUrl}`);
      expect(req.request.method).toEqual('POST');

      req.flush(hero);
    });
  });

  
  describe('#updateHero', () => {
    let hero: Hero;

    beforeEach(() => {
      // Dummy data
      hero = { Id: 1, Name: 'A' } as Hero;
    });
    
    it('受信確認', () => {
      service.updateHero(hero).subscribe(
        h => expect(h).toEqual(hero),
        fail
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/${hero.Id}`);
      expect(req.request.method).toEqual('PUT');

      req.flush(hero);
    });
    
    it('受信確認', () => {
      service.updateHero({Id:1} as Hero).subscribe(
        h => expect(h).toEqual(hero),
        fail
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/${hero.Id}`);
      expect(req.request.method).toEqual('PUT');

      req.flush(hero);
    });
  });

  
  describe('#deleteHero', () => {
    let hero: Hero;

    beforeEach(() => {
      // Dummy data
      hero = { Id: 1, Name: 'A' } as Hero;
    });
    
    it('受信確認', () => {
      service.deleteHero(hero).subscribe(
        h => expect(h).toEqual(hero),
        fail
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/${hero.Id}`);
      expect(req.request.method).toEqual('DELETE');

      req.flush(hero);
    });
    
    it('受信確認', () => {
      service.deleteHero(hero.Id).subscribe(
        h => expect(h).toEqual(hero),
        fail
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/${hero.Id}`);
      expect(req.request.method).toEqual('DELETE');

      req.flush(hero);
    });

    it('受信確認(404)', () => {
      service.deleteHero(hero.Id).subscribe(
        h => expect(h).toEqual(undefined),
        fail
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/${hero.Id}`);
      const msg = '404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' }); //Return error
    });
  });
});
