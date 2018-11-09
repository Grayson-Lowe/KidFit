import { CurrentGamePage } from '../current-game/current-game';
import { NavController, NavParams } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { InvalidLoginPage } from '../invalid-login/invalid-login';
import { AlertController } from 'ionic-angular';
import { Component,NgZone } from '@angular/core';

/**
 * Generated class for the NewGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-game',
  templateUrl: 'new-game.html',
})
export class NewGamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient:HttpClient,private storage:Storage,private zone:NgZone,private alertCtrl: AlertController) {
    this.name = this.navParams.get('name');
  }

  ionViewDidLoad() {
    this.navCtrl.swipeBackEnabled = true;
    this.zone.run(()=>this.refreshView());
    console.log('ionViewDidLoad NewGamePage');
  }

  openAccountPage() {
    this.navCtrl.push(AccountPage);
  }
  openCurrentGamePage() {
    this.navCtrl.push(CurrentGamePage);
  }


  expand() {
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }


  data: any = {};
  playersList=[];
  playerIDList=[];
  username:any;
  accesstoken:any;
  gameID:any;
  gameInstanceID:any;
  name:any;
  canDeletePlayer=false;
  i=0
 

  getGameID()
  {
    var link = 'https://kidsteam.boisestate.edu/kidfit/get_gameID.php?gameName=fitRace';
    link=link.concat('&metric=')
    link=link.concat('steps')
    return new Promise(resolve => {
      this.httpClient.get(link)
          .subscribe(data => {
            resolve(data);
          }, error => {
            resolve(error);
          })
    })
  }
  getUsername()
  {
  console.log("getUserDetails");
  return new Promise(resolve => {
    this.storage.get('username').then((val) => {
      this.username =val;
      resolve(val);
    });})
  }
  getUserToken()
  {
    console.log("getUserToken");
    return new Promise(resolve => {
    this.storage.get('accessToken').then((val) => {
      this.accesstoken = val;
      resolve(val);
    });})
  }
  
  getInvitedPlayers()
  {
    var link = 'https://kidsteam.boisestate.edu/kidfit/getPlayersFromGameInstance.php?gameInstanceID=';
    link=link.concat(this.gameInstanceID);
    link= link.concat('&self=');
    link= link.concat(this.username);
    link = link.concat('&accessToken=')
    link= link.concat(this.accesstoken);
    link = link.concat('&userGameStatus=userInvited');
    return new Promise(resolve => {
      this.httpClient.get(link)
          .subscribe(data => {
            resolve(data);
          }, error => {
            resolve(error);
          })
    })
  }
  
  getReadyToPlayPlayers()
  {
    var link = 'https://kidsteam.boisestate.edu/kidfit/getPlayersFromGameInstance.php?gameInstanceID=';
    link=link.concat(this.gameInstanceID);
    link= link.concat('&self=');
    link= link.concat(this.username);
    link = link.concat('&accessToken=')
    link= link.concat(this.accesstoken);
    link = link.concat('&userGameStatus=userReadyToPlay');
    return new Promise(resolve => {
      this.httpClient.get(link)
          .subscribe(data => {
            resolve(data);
          }, error => {
            resolve(error);
          })
    })
  }
  
  addPlayers()
  {
    var link = 'https://kidsteam.boisestate.edu/kidfit/addPlayerToGameInstance.php?gameInstanceID=';
    link= link.concat(this.gameInstanceID);
    link= link.concat('&self=');
    link= link.concat(this.username);
    link=link.concat('&friend=');
    link = link.concat(this.data.frndemail);
    link = link.concat('&accessToken=')
    link= link.concat(this.accesstoken); 
    return new Promise(resolve => {
      this.httpClient.get(link)
          .subscribe(data => {
            resolve(data);
          }, error => {
            resolve(error);
          })
    })
  }
  
  createGameInstance()
  {
   var link = 'https://kidsteam.boisestate.edu/kidfit/createGameInstance.php?gameID=';
    link= link.concat(this.gameID);
    link= link.concat('&self=');
    link= link.concat(this.username);
    link=link.concat('&friend=');
    link = link.concat(this.data.frndemail);
    link = link.concat('&accessToken=')
    link= link.concat(this.accesstoken);
    link = link.concat('&gameID=')
    link= link.concat(this.gameID);
    
    console.log("creating game instance",link)
    return new Promise(resolve => {
      this.httpClient.get(link)
          .subscribe(data => {
            resolve(data);
          }, error => {
            resolve(error);
          })
    })
  }
  
  addFriend()
  {
    if(this.data.frndemail.length==0)
    { //check for valid email
      this.presentAlert('Please enter an email address')
    }
    else
    {
      this.getGameID().then(data=>{
        if(data['error'])
        {
          this.presentAlert('Game not found')
        }
        else
        {
          this.gameID=data['gameID'];
          this.getUsername().then(userNamedata=>{
          this.getUserToken().then(userTokendata=>{
           if(this.playersList.length==0)
           {
             // Create New Game Instance
             this.createGameInstance().then(creategameInstancedata=>{
               if(creategameInstancedata['error']){this.presentAlert(creategameInstancedata['error']);this.data.frndemail=""}
              else{
                console.log('Create Game Instance response', creategameInstancedata)
                this.gameInstanceID=creategameInstancedata['gameInstanceID'];
                this.zone.run(()=>this.refreshView());
              }
            })
           }// create new game instance
           else
           {
             //add more players to the game instance
             this.addPlayers().then(addPlayerData=>{
               if(addPlayerData['error']){this.navCtrl.push('InvalidLoginPage',{error:addPlayerData['error']})}
               else
               {
                 console.log("add player repsone ",addPlayerData)
                this.zone.run(()=>this.refreshView());
               }
             })  }
          })})
        }})
    }
  }
  presentAlert(message :string) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  
  refreshView()
  {
    console.log('refreshing view')
    this.getUsername().then(usernameData=>{
    this.getUserToken().then(usertokendata=>{
    this.getGameID().then(data=>{
    while(this.playersList.length>0){this.playersList.pop();this.playerIDList.pop()}
    if(this.gameInstanceID){
    this.getInvitedPlayers().then(invitedPlayersdata=>{
      if(invitedPlayersdata['error']){this.navCtrl.push('InvalidLoginPage',{error:invitedPlayersdata['error']})}
      else
      {
        console.log("Get Invited players data", invitedPlayersdata)
        for(this.i=0;this.i<2*invitedPlayersdata['numberOfPlayers'];this.i=this.i+2)
        {
          let str = invitedPlayersdata[this.i+1];
          this.playersList.push(str);
          this.playerIDList.push(invitedPlayersdata[this.i])
        }
        this.getReadyToPlayPlayers().then(readyToPlayPlayersData=>{
          if(readyToPlayPlayersData['error']){this.navCtrl.push('InvalidLoginPage',{error:invitedPlayersdata['error']})}
          else{
            console.log("Get readyToPlay players data", readyToPlayPlayersData)
        for(this.i=0;this.i<readyToPlayPlayersData['numberOfPlayers']*2;this.i=this.i+2)
        {
          let str = readyToPlayPlayersData[this.i+1];
          if(str!=this.name)
          {
            this.playersList.push(str);
            this.playerIDList.push(readyToPlayPlayersData[this.i])
          }
        }
          }
        })
        
        
        
          console.log("Number of players are", this.playersList.length)
        if(this.playersList.length>1)
        {
          this.canDeletePlayer=true;
        }
        else{
          this.canDeletePlayer=false;
        }
        this.data.frndemail="";
      }
    })
  } 
    })  
    })
    })
  }
  
  deletePlayer(i)
  {
    let userID = this.playerIDList[i];
    this.removePlayerFromGameInstance(userID).then(removePlayerData=>{
      if(removePlayerData['error'])
      {
        this.navCtrl.push('InvalidLoginPage', {error:removePlayerData['error']});
      }
      else{
        this.zone.run(()=> this.refreshView());
        }      
    })
  }
  
  removePlayerFromGameInstance(i)
    {
      var link = 'https://kidsteam.boisestate.edu/kidfit/removePlayerFromGameInstance.php?self=';
      link= link.concat(this.username);
      link = link.concat('&accessToken=');
      link= link.concat(this.accesstoken);
      link=link.concat('&gameInstanceID=');
      link=link.concat(this.gameInstanceID);
      link = link.concat('&friendID=');
      link=link.concat(i);
      return new Promise(resolve => {
        this.httpClient.get(link)
            .subscribe(data => {
              resolve(data);
            }, error => {
              resolve(error);
            })
      })
    }
}
