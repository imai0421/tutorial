import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Observable, of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(HeroService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getHeroes の呼び出し', () => {
    const spy = spyOn(component, 'getHeroes');
    // getHeroesメソッドをスパイ。
    //const spyApi = spyOn(service, 'getHeroes').and.returnValue(of([{Id: 1, Name: 'A'} as Hero,{Id: 2, Name: 'B'} as Hero]));
    component.ngOnInit();
    expect(component.getHeroes).toHaveBeenCalled();
  });

  describe('Api call', () => {
    beforeEach(() => {
      const spyApiGetHeroes = spyOn(service, 'getHeroes').and.returnValue(of([
        {Id: 1, Name: 'A'} as Hero,
        {Id: 2, Name: 'B'} as Hero,
        {Id: 3, Name: 'C'} as Hero,
        {Id: 4, Name: 'D'} as Hero,
        {Id: 5, Name: 'E'} as Hero,
        {Id: 6, Name: 'F'} as Hero
      ]));
      component.ngOnInit();
      fixture.detectChanges();
    });


    it('getHeroes のAPI実行', () => {
      // getHeroesメソッドをスパイ。
      //const spy = spyOn(service, 'getHeroes').and.returnValue(of([{Id: 1, Name: 'A'} as Hero,{Id: 2, Name: 'B'} as Hero]));
      // getHeroesメソッドをテスト。addはHeroService.getHeroesメソッドを呼び出している
      component.getHeroes();
      // getHeroesが呼ばれたことのチェック
      expect(service.getHeroes).toHaveBeenCalled();
    });

    it('getHeroes の画面反映1', () => {
     
      component.getHeroes();
     
      expect(component.heroes[0].Id).toEqual(2);
    });

    it('getHeroes の画面反映2', () => {
     
      const compiled = fixture.nativeElement;
      var cnt = compiled.querySelector('.heroes-menu').childElementCount;
      expect(cnt).toEqual(4);
    });

  });
  

  
});
