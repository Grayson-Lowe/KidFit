import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { CurrentGamePage } from '../pages/current-game/current-game';
import { NewGamePage } from '../pages/new-game/new-game';
import { AccountPage } from '../pages/account/account';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AES256 } from '@ionic-native/aes-256';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    WelcomePage,
    NewGamePage,
    CurrentGamePage,
    AccountPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { swipeBackEnabled: true }),
    IonicStorageModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // // set defaults here
      // radius: 100,
      // outerStrokeWidth: 16,
      // innerStrokeWidth: 8,
      // // outerStrokeColor: "#78C000",
      // // innerStrokeColor: "#C7E596",
      // animationDuration: 300,
      // subtitle: "Steps",
      // subtitleColor: "#f4f4f4",
      // unitsColor: "#f4f4f4",
      // unitsFontSize: "0.5em",
      // subtitleFontSize: "0.7em"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    WelcomePage,
    NewGamePage,
    CurrentGamePage,
    AccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    AES256,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
