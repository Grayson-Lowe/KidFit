import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient:HttpClient,private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    
  }

  GetStarted()
  {
    this.navCtrl.push('LoginPage');
  }

  Leaderboard()
  {
    this.navCtrl.push('LeaderboardPage');
  }

  Status()
  {
    this.navCtrl.push('StatusPage');
  }
}
