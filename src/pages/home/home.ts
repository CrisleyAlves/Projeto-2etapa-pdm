import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  name: any;
  msgVal: string = '';

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public af: AngularFireDatabase, public vibration: Vibration) {
    this.vibrate();
    this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });
    this.user = this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  loginFacebook() {
    this.name = this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res =>
          this.name = res
        );
  }



  logout() {
      this.afAuth.auth.signOut();
  }

  Send(desc: string) {
      if(this.name){
        this.items.push({
          name: this.name.additionalUserInfo.profile.name,
          photo: this.name.additionalUserInfo.profile.picture.data.url,
          message: desc
          });
        this.msgVal = '';
      }else{
        this.items.push({
          name: "Anonimo",
          photo: "http://www.ecsu.org.uk/images/anon.png",
          message: desc
          });
        this.msgVal = '';
      }
  }

  vibrate(){
    console.log('deu certo');
    this.vibration.vibrate(2000);
  }

}
