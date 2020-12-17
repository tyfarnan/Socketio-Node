import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
declare const Buffer: any
declare var require: any


const ENDPOINT = environment.ENDPOINT;
const APP_CRED_USER = environment.APP_CRED_USER;
const APP_CRED_PASSWORD = environment.APP_CRED_PASSWORD;
const SENDER_DESTINATION_URI = environment.SENDER_DESTINATION_URI;
const RECIPIENT_DESTINATION_URI = environment.RECIPIENT_DESTINATION_URI;

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;
  constructor() {   }

  setupSocketConnection() {
    console.log("HELLO")
    // const socket = require('socket.io-client').connect(ENDPOINT, {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      extraHeaders: {
        Authorization: 'Basic ' + Buffer.from(APP_CRED_USER + ':' + APP_CRED_PASSWORD).toString('base64')
      }
      
    })
        .on('connect', () => {
        console.log('Connected.')
        send();

      })
    

  }
}

// import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';
// import { environment } from '../environments/environment';
// declare var require: any
// declare const Buffer;


// const ENDPOINT = environment.ENDPOINT;
// const APP_CRED_USER = environment.APP_CRED_USER;
// const APP_CRED_PASSWORD = environment.APP_CRED_PASSWORD;
// const SENDER_DESTINATION_URI = environment.SENDER_DESTINATION_URI;
// const RECIPIENT_DESTINATION_URI = environment.RECIPIENT_DESTINATION_URI;

// var fs = require("fs");
// var query = fs.readFileSync("./sample_fhirbase.sql");
// let objJsonB64 = Buffer.from(query).toString("base64");

function send() {
    this.socket.emit('produce', {
          headers: {
            from: SENDER_DESTINATION_URI,
            to: RECIPIENT_DESTINATION_URI,
          },
          content: 'Hello',
  
        },
        'test',
        err => {
          if (err) {
            console.log('Delivery error: ' + err);
          }
        });
      }

// @Injectable({
//   providedIn: 'root'
// })
// export class SocketioService {
//   socket;
//   constructor() {   }
//   setupSocketConnection() {
//     this.socket = io(environment.SOCKET_ENDPOINT, {
//       query: {
//         token: 'cde'
//       }
//     });

//     this.socket.emit('my message', 'Hello there from Angular.');

//     this.socket.on('my broadcast', (data: string) => {
//       console.log(data);
//     });
//   }

//   // setupSocketConnection() {
//   //   this.socket = require('socket.io-client').connect(ENDPOINT, {
//   //     extraHeaders: {
//   //       Authorization: 'Basic ' + Buffer.from(APP_CRED_USER + ':' + APP_CRED_PASSWORD).toString('base64')
//   //     }
//   //   })

//   //   this.socket.on('connect', () => {
//   //     console.log('Connected.');
//   //     send();
//   // },

//   //   // this.socket = io(environment.ENDPOINT);
//   //   // this.socket.emit('my message', 'Hello there from Angular.'),
  
//   //   this.socket.on('my broadcast', (data: string) => {
//   //     console.log(data);

//   // }
// }
