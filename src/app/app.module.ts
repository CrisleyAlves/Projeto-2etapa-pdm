import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Vibration } from '@ionic-native/vibration';
import { Camera } from '@ionic-native/camera';
import { CameraMock } from '../pages/home/camera-mock';

export const firebaseConfig = {
  apiKey: "AIzaSyD069e51NIaCh3K_BAHpNgS3BAdQr3Qo9s",
    authDomain: "projetochat2etapa.firebaseapp.com",
    databaseURL: "https://projetochat2etapa.firebaseio.com",
    projectId: "projetochat2etapa",
    storageBucket: "",
    messagingSenderId: "163183256987"
}



@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Camera, useClass: CameraMock},
    AngularFireModule, AngularFireAuth, AngularFireDatabase, Vibration
  ]
})
export class AppModule {}
