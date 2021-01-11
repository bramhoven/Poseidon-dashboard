// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  poseidon: {
    host: 'http://localhost:8080'
  },
  firebase: {
    apiKey: "AIzaSyAZrdrvhubsJ-jwHkFzYSVwpMD9IaWUX98",
    authDomain: "poseidon-dashboard.firebaseapp.com",
    projectId: "poseidon-dashboard",
    storageBucket: "poseidon-dashboard.appspot.com",
    messagingSenderId: "263125247074",
    appId: "1:263125247074:web:eae6a61d8b8134693c9d3b",
    measurementId: "G-05XR204W01"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
