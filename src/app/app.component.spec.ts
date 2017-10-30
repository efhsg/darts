import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Routing} from './app.routing';
import {APP_BASE_HREF} from '@angular/common';
import {MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        Routing,
        MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
