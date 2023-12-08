import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ShoppingComponent } from './shopping/shopping.component';
@NgModule({
  declarations: [
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ShoppingComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatPaginatorModule,
    FormsModule
  ],
  exports: [
    NavbarComponent // If you plan to use this component outside the AdminModule
  ]
})
export class UsersModule { }
