import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule, JwtInterceptor  } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { FormsModule }    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { LoginForm } from './components/login-form.component';
import { ProductList } from './components/product-list.component';
import { ProductForm } from './components/product-form.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}


const appRoutes:Routes = [
  { path: 'login', component: LoginForm},
  { 
    path: 'products', 
    component: ProductList,
    canActivate: [AuthGuard]
  },
  { path: 'product/new', component: ProductForm, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductForm, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: '**', redirectTo: '/products', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginForm,
    ProductList,
    ProductForm

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['product-app.local']
      }
    }),
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
