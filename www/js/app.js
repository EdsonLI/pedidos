// Ionic Starter App

//import { SQLite } from 'ionic-native';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    /*else {
        db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS pedidos(id integer primary key, bolo_id integer, bolo_nome text, telefone text, enderco text)");
        console.log("browser");
    }*/
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    /*let db = new SQLite();
      db.openDatabase({
        name: 'data.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql('CREATE TABLE IF NOT EXISTS pedidos(id integer primary key, bolo_id integer, bolo_nome text, telefone text, enderco text)', {}).then(() => {

        }, (err) => {
          console.error('Unable to execute sql: ', err);
        });
      }, (err) => {
        console.error('Unable to open database: ', err);
      });*/
  });
})
