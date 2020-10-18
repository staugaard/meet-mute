/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
// import Protocol from './protocol'
// import { Device, ButtonCommand } from './constants'
// const connection = {
//   buffer: new Uint8Array([0b00000001, 0xff, 0b00000110, 0x01, 0x02]),
//   cursor: 0,
//   read: function (length: number): Promise<Uint8Array> {
//     const result = connection.buffer.slice(
//       connection.cursor,
//       connection.cursor + length
//     )
//     connection.cursor += length
//     connection.cursor %= connection.buffer.length
//     return new Promise((resolve) => {
//       setTimeout(resolve.bind(null, [result]), 1000)
//     })
//     // return Promise.resolve(result)
//   },
// }
// const protoReader = new Protocol(connection)
// globalThis['foo'] = protoReader
// protoReader.start((cmd) => {
//   switch (cmd.device) {
//     case Device.Button1:
//       switch (cmd.commandId) {
//         case ButtonCommand.Press:
//           console.log('Button 1 Pressed')
//           handleCommand('toggle_mute')
//           break
//         case ButtonCommand.Down:
//           console.log('Button 1 Down')
//           handleCommand('toggle_mute')
//           break
//         case ButtonCommand.Up:
//           console.log('Button 1 Up')
//           handleCommand('toggle_mute')
//           break
//         default:
//           console.log('Button 1 unknown command', { command: cmd })
//           break
//       }
//       break
//     default:
//       console.log('Unknown device', { command: cmd })
//       break
//   }
// })
chrome.runtime.onMessage.addListener(function (message) {
    console.log(message);
    switch (message.event) {
        case 'connected':
            break;
        case 'disconnected':
            break;
        case 'muted':
            break;
        case 'unmuted':
            break;
    }
});
function handleCommand(command) {
    chrome.windows.getAll({ populate: true }, function (windowList) {
        var googleMeetTabs = getGoogleMeetTabs(windowList);
        if (googleMeetTabs.length > 0) {
            processCommand(command, googleMeetTabs);
        }
    });
}
function getGoogleMeetTabs(windowList) {
    var googleMeetTabs = [];
    windowList.forEach(function (w) {
        w.tabs.forEach(function (tab) {
            if (tab && tab.url && tab.url.startsWith('https://meet.google.com/')) {
                googleMeetTabs.push(tab);
            }
        });
    });
    return googleMeetTabs;
}
function processCommand(command, googleMeetTabs) {
    googleMeetTabs.forEach(function (tab) {
        chrome.tabs.sendMessage(tab.id, { command: command });
    });
}

/******/ })()
;
//# sourceMappingURL=background.js.map