import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewGamePage } from '../new-game/new-game';
import { CurrentGamePage } from '../current-game/current-game';
import { AccountPage } from '../account/account';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {
    userdata = null;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.userdata = this.navParams.get('data')
        console.log("My User Data: ",this.userdata)
    }

    ionViewDidLoad() {
        this.navCtrl.swipeBackEnabled = true;
        console.log('ionViewDidLoad WelcomePage');
    }

    openNewGamePage() {
        this.navCtrl.push(NewGamePage);
        this.navCtrl.setRoot(NewGamePage);
    }

    openCurrentGamePage() {
        this.navCtrl.push(CurrentGamePage);
        this.navCtrl.setRoot(CurrentGamePage);
    }

    openAccountPage() {
        this.navCtrl.push(AccountPage);
        this.navCtrl.setRoot(AccountPage);
    }
}
