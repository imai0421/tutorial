import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../hero.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Hero } from '../hero';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let service: HeroService;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(HeroService)
    fixture.detectChanges();
    
    input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
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
      
      const spyApiSearchHeroes = spyOn(service, 'searchHeroes').and.returnValue(of([{Id: 1, Name: 'A'} as Hero,{Id: 2, Name: 'B'} as Hero]));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('searchHeroes の呼び出し', function(done) {
      // searchHeroesメソッドをスパイ。
      //const spyApi = spyOn(service, 'searchHeroes').and.returnValue(of([{Id: 1, Name: 'A'} as Hero,{Id: 2, Name: 'B'} as Hero]));
      //component.search('C');
      input.value = 'ABC';
      input.dispatchEvent(new Event('input'));
      setTimeout(function() {
        expect(service.searchHeroes).toHaveBeenCalled();
        done();
      }, 500);
    });

  }); 
  

});
