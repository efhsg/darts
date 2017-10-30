import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {SetupComponent} from './setup/setup.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/setup', pathMatch: 'full'},
  { path: 'setup', component: SetupComponent },
  { path: '**', component: AppComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
