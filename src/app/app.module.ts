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
