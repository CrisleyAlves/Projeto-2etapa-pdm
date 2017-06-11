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


export const firebaseConfig = {
  apiKey: "AIzaSyBg4OzSLZwjO3uzkm4FDZo1Cwf4U0jLOPU",
  authDomain: "projeto-2etapa-pdm.firebaseapp.com",
  databaseURL: "https://projeto-2etapa-pdm.firebaseio.com",
  projectId: "projeto-2etapa-pdm",
  storageBucket: "projeto-2etapa-pdm.appspot.com",
  messagingSenderId: "515070619352"
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
    AngularFireModule, AngularFireAuth, AngularFireDatabase, Vibration
  ]
})
export class AppModule {}
