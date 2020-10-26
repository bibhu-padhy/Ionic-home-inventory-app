import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoopOversComponent } from './poop-overs.component';

describe('PoopOversComponent', () => {
  let component: PoopOversComponent;
  let fixture: ComponentFixture<PoopOversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoopOversComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoopOversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
