import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let service: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(HeroService)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('getHeroes の呼び出し', () => {
    const spy = spyOn(component, 'getHeroes');
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
      const spyApiAddHero = spyOn(service, 'addHero').and.returnValue(of({Id: 3, Name: 'C'} as Hero));
      const spyApiDeleteHeror = spyOn(service, 'deleteHero').and.returnValue(of({Id: 1, Name: 'A'} as Hero));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('getHeroes のAPI実行', () => {
      // ngOnInitでgetHeroesが呼び出されている
      expect(service.getHeroes).toHaveBeenCalled();
    });
    it('getHeroes の画面反映', () => {
      // ngOnInitでgetHeroesが呼び出されている
      const compiled = fixture.nativeElement;
      var cnt = compiled.querySelector('.heroes').childElementCount;
      expect(cnt).toEqual(6);
    });

    it('add のAPI実行(値無し)', () => {
      component.add('');
      expect(service.addHero).not.toHaveBeenCalled();
    });
  
    it('add のAPI実行', () => {
      component.add('C');
      expect(service.addHero).toHaveBeenCalled();
    });
  
    it('add の画面反映', () => {
      const compiled = fixture.debugElement.nativeElement;
      var cnt = compiled.querySelector('.heroes').childElementCount;
 
      component.add('C');
      
      fixture.detectChanges();
      const added = fixture.debugElement.nativeElement;
      var addedCnt = added.querySelector('.heroes').childElementCount;
      expect(addedCnt).toEqual(cnt + 1);
    });
  
    it('delete のAPI実行', () => {
      component.delete(component.heroes[0]);
      expect(service.deleteHero).toHaveBeenCalled();
    });
  
    it('delete の画面反映', () => {
      const compiled = fixture.nativeElement;
      var cnt = compiled.querySelector('.heroes').childElementCount;
      component.delete(component.heroes[0]);

      fixture.detectChanges();
      const deleted = fixture.nativeElement;
      var deletedCnt = deleted.querySelector('.heroes').childElementCount;
      expect(deletedCnt).toEqual(cnt - 1);
    });
  
  });
});
