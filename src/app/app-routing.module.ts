import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { LayoutComponent } from './layout/layout.component';
import { SelectedFarmComponent } from './selected-farm/selected-farm.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'weather-forecast', component: WeatherForecastComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
