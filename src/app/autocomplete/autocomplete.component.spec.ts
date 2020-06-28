import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';
import { HttpClientModule } from '@angular/common/http';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteComponent ],
      imports:[
        HttpClientModule
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
  it('should call call httpmethod and load the data to array',()=>{    
    component.fetchDataFromUrl()
    .subscribe((posts: any) => {
      //expect(posts.length).toBeGreaterThan(4);
      const nameAndEmails=component.nameAndEmails;
      expect(nameAndEmails.length).toBeGreaterThan(0)
    })
  })

  it(`should add value search "hayde" to search box `, () => {
    
  });
  it(`should fill the suggetion list`, () => {
    
  });


 
});
