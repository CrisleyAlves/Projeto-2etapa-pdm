import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

import { Vibration } from '@ionic-native/vibration';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: Observable<firebase.User>;
  loginMethod: string;
  items: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;
  name: any;
  msgVal: string = '';

  image: string;

  options: CameraOptions = {
    quality: 1000,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public af: AngularFireDatabase, public vibration: Vibration, public camera: Camera) {

    this.logout();
    this.items = af.list('/messages', {
      query: {
        limitToLast: 5
      }
    });

    this.users = af.list('/users', {
      query:{
          limitToLast: 50
      }
    })
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

        this.loginMethod = 'Facebook';
  }

  loginGoogle() {
    this.name = this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res =>
          this.name = res
        );
        this.loginMethod = 'Google';
  }

  logout() {
      this.afAuth.auth.signOut();
  }

  Send(desc: string) {

      this.vibrate();



      if(this.name){

        if(this.loginMethod == 'Facebook'){
          this.items.push({
              name: this.name.additionalUserInfo.profile.name,
              photo: this.name.additionalUserInfo.profile.picture.data.url,
              message: desc,
              user: this.name.user.uid
            });
        }else{
          this.items.push({
              name: this.name.additionalUserInfo.profile.name,
              photo: this.name.additionalUserInfo.profile.picture,
              message: desc,
              user: this.name.user.uid
            });
        }

        this.users.push({
            userId: this.name.user.uid,
            name: this.name.additionalUserInfo.profile.name
        });

      }else{
        this.items.push({
          name: "Anonimo",
          photo: "http://www.ecsu.org.uk/images/anon.png",
          message: desc
          });
      }
      this.msgVal = '';
  }

  vibrate(){
    console.log('deu certo');
    this.vibration.vibrate(2000);
  }

  async takePicture(): Promise<any>{
    try{
      this.image = await this.camera.getPicture(this.options);
      console.log(this.image);
    }catch(e){
      console.log(e);
    }
  }

}
