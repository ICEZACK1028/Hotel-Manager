import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedroomsComponent } from './components/bedrooms/bedrooms.component';
import { EventsComponent } from './components/events/events.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UsersComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'hotels', component: HotelsComponent},
  {path: 'bedrooms/:idHotel', component: BedroomsComponent},
  {path: 'events/:idHotel', component: EventsComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
