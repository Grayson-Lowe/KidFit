import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { NewGamePage } from '../new-game/new-game';

/**
 * Generated class for the CurrentGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-current-game',
  templateUrl: 'current-game.html',
})
export class CurrentGamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentGamePage');
  }
  openAccountPage() {
    this.navCtrl.push(AccountPage);
    // this.navCtrl.setRoot(AccountPage);
  }
  openNewGamePage() {
    this.navCtrl.push(NewGamePage);
  }

}
