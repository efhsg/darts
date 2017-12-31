import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SetupComponent} from './setup/setup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule,
  MatInputModule, MatMenuModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {SpelComponent} from './spel/spel.component';
import {TimerComponent} from './timer/timer.component';
import {OutshotCalculatorAbstract} from './services/interfaces/outshot.calculator';
import {OutshotCalculator} from './services/implementations/outshot.calculator';
import {SpelerServiceAbstract} from './services/interfaces/speler';
import {SpelerServiceMock} from './services/mocks/speler';
import {CheckoutComponent} from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
    SpelComponent,
    TimerComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatSelectModule, MatRadioModule, MatSnackBarModule, MatSlideToggleModule,
    MatExpansionModule, MatGridListModule
  ],
  providers: [
    {provide: OutshotCalculatorAbstract, useClass: OutshotCalculator},
    {provide: SpelerServiceAbstract, useClass: SpelerServiceMock},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
