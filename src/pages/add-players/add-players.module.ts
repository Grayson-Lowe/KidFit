import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPlayersPage } from './add-players';

@NgModule({
  declarations: [
    AddPlayersPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPlayersPage),
  ],
})
export class AddPlayersPageModule {}
