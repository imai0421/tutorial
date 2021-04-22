import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let service: HeroService;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(HeroService)
    
    // component.hero = {Id: 1, Name: 'abc'} as Hero;

    // input = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLInputElement;
    // input.innerText = '';
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  

  it('getHero の呼び出し', () => {
    const spy = spyOn(component, 'getHero');
    component.ngOnInit();
    expect(component.getHero).toHaveBeenCalled();
  });

  it('goBack の呼び出し', () => {
    component.goBack();
    // ToDo:何をどうやってテストしたらいい？
    expect(1).toEqual(1);
  });

  describe('Api call', () => {
    beforeEach(() => {
      
      const spyApiGetHero = spyOn(service, 'getHero').and.returnValue(of({Id: 1, Name: 'abc'} as Hero));
      const spyApiGetHeroes = spyOn(service, 'getHeroes').and.returnValue(of([{Id: 1, Name: 'A'} as Hero,{Id: 2, Name: 'B'} as Hero]));
      const spyApiAddHero = spyOn(service, 'addHero').and.returnValue(of({Id: 3, Name: 'C'} as Hero));
      const spyApiDeleteHero = spyOn(service, 'deleteHero').and.returnValue(of({Id: 1, Name: 'A'} as Hero));
      const spyApiUpdateHero = spyOn(service, 'updateHero').and.returnValue(of({Id: 1, Name: 'AA'} as Hero));
      
    });

    it('getHero のAPI実行', () => {
      component.getHero();
      expect(service.getHero).toHaveBeenCalled();
    });
    it('getHero の画面反映', () => {
      component.getHero();
      fixture.detectChanges();

      input = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLInputElement;
      expect(input.innerText).toEqual('ABC Details');
    });

    it('updateHero のAPI実行', () => {
      const spy = spyOn(component, 'goBack');
      //const spyApi = spyOn(service, 'updateHero').and.returnValue(of({Id: 1, Name: 'A'} as Hero));
      component.save();
      expect(service.updateHero).toHaveBeenCalled();
      expect(component.goBack).toHaveBeenCalled();
    });
  });
});
