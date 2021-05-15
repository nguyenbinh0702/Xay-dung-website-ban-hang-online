import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
// @ts-ignore
import { httpInterceptorProviders } from './authentication/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { SendFeedbackComponent } from './home/send-feedback/send-feedback.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { NgxPayPalModule } from 'ngx-paypal';
import { ToastrModule } from 'ngx-toastr';
// import { NgxCaptchaModule } from 'ngx-captcha';
import { CustomerCheckinComponent } from './home/customer-checkin/customer-checkin.component';
import { FlightModule } from './flight/flight.module';
import { PromotionComponent } from './home/promotion/promotion.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    SendFeedbackComponent,
    PageNotFoundComponent,
    CustomerCheckinComponent,
    PromotionComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxPaginationModule,
    PDFExportModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    // NgxCaptchaModule
    NgxPayPalModule,
    ToastrModule.forRoot(),
    FlightModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '47941306302-24ankpk8rfrq3cgmm8tlifooaj4pdsa6.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('934027683741142'),
          },
        ],
      } as SocialAuthServiceConfig,
    }, httpInterceptorProviders], entryComponents: [
      LoginComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
