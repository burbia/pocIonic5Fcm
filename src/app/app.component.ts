import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // get FCM token
      this.fcm.getToken().then(token => {
        console.log(token);
      });

      // ionic push notification example
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        localStorage.setItem('notificationReceived', '' + new Date());
        if (data.wasTapped) {
          console.log('Received in background');
          localStorage.setItem('notificationId', 'Background - ' + data.notificationId);
        } else {
          console.log('Received in foreground');
          localStorage.setItem('notificationId', 'Foreground - ' + '  -  ' + data.notificationId);
        }
      });

      // refresh the FCM token
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });
    });
  }
}
