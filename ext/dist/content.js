/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! namespace exports */
/*! export ButtonCommand [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Command [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Device [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LEDCommand [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Device": () => /* binding */ Device,
/* harmony export */   "ButtonCommand": () => /* binding */ ButtonCommand,
/* harmony export */   "LEDCommand": () => /* binding */ LEDCommand,
/* harmony export */   "Command": () => /* binding */ Command
/* harmony export */ });
var Device;
(function (Device) {
    Device[Device["LED1"] = 0] = "LED1";
    Device[Device["Button1"] = 1] = "Button1";
})(Device || (Device = {}));
var ButtonCommand;
(function (ButtonCommand) {
    ButtonCommand[ButtonCommand["Press"] = 0] = "Press";
    ButtonCommand[ButtonCommand["Down"] = 1] = "Down";
    ButtonCommand[ButtonCommand["Up"] = 2] = "Up";
})(ButtonCommand || (ButtonCommand = {}));
var LEDCommand;
(function (LEDCommand) {
    LEDCommand[LEDCommand["Set"] = 0] = "Set";
})(LEDCommand || (LEDCommand = {}));
var Command = /** @class */ (function () {
    function Command(device, commandId, args) {
        this.device = device;
        this.commandId = commandId;
        this.arguments = args;
    }
    return Command;
}());



/***/ }),

/***/ "./src/content.ts":
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _serial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serial */ "./src/serial.ts");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./protocol */ "./src/protocol.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var dev = null;
function connectToUSB() {
    return __awaiter(this, void 0, void 0, function () {
        var ports;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _serial__WEBPACK_IMPORTED_MODULE_0__.default.getPorts()];
                case 1:
                    ports = _a.sent();
                    if (!ports.length) {
                        console.log('No USB devices found');
                        throw new Error('No USB devices found');
                    }
                    return [4 /*yield*/, ports[0]
                            .connect()
                            .then(function () {
                            console.debug('connected');
                        })
                            .catch(function (error) {
                            console.error(error);
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, new _protocol__WEBPACK_IMPORTED_MODULE_1__.default(ports[0])];
            }
        });
    });
}
var MUTE_BUTTON = 'div[role="button"][aria-label*="microphone"][data-is-muted]';
var muted = false;
function isMuted() {
    var dataIsMuted = document
        .querySelector(MUTE_BUTTON)
        .getAttribute('data-is-muted');
    return dataIsMuted == 'true';
}
function updateMuted(newValue) {
    muted = newValue || isMuted();
    if (dev && muted) {
        dev.write(new _constants__WEBPACK_IMPORTED_MODULE_2__.Command(_constants__WEBPACK_IMPORTED_MODULE_2__.Device.LED1, _constants__WEBPACK_IMPORTED_MODULE_2__.LEDCommand.Set, new Uint8Array([0, 255, 0])));
    }
    else if (dev && !muted) {
        dev.write(new _constants__WEBPACK_IMPORTED_MODULE_2__.Command(_constants__WEBPACK_IMPORTED_MODULE_2__.Device.LED1, _constants__WEBPACK_IMPORTED_MODULE_2__.LEDCommand.Set, new Uint8Array([255, 0, 0])));
    }
}
var isMutedObserver;
function watchIsMuted(el) {
    if (isMutedObserver) {
        isMutedObserver.disconnect();
    }
    isMutedObserver = new MutationObserver(function (mutations) {
        var target = mutations[0].target;
        var newValue = target.getAttribute('data-is-muted') == 'true';
        if (newValue != muted) {
            updateMuted(newValue);
        }
    });
    isMutedObserver.observe(el, {
        attributes: true,
        childList: true,
        attributeFilter: ['data-is-muted'],
    });
}
var muteButton;
setInterval(function () {
    var btn = document.querySelector(MUTE_BUTTON);
    if (btn && btn != muteButton) {
        muteButton = btn;
        updateMuted();
        watchIsMuted(muteButton);
    }
    else if (!btn && muteButton) {
        muteButton = null;
    }
}, 1000);
window.addEventListener('beforeunload', function () {
    if (dev) {
        dev.write(new _constants__WEBPACK_IMPORTED_MODULE_2__.Command(_constants__WEBPACK_IMPORTED_MODULE_2__.Device.LED1, _constants__WEBPACK_IMPORTED_MODULE_2__.LEDCommand.Set, new Uint8Array([0, 0, 0])));
    }
});
var keydownEvent = new KeyboardEvent('keydown', {
    key: 'd',
    code: 'KeyD',
    metaKey: true,
});
function sendKeyboardCommand() {
    document.dispatchEvent(keydownEvent);
}
connectToUSB().then(function (protocol) {
    dev = protocol;
    protocol.start(function (cmd) {
        switch (cmd.device) {
            case _constants__WEBPACK_IMPORTED_MODULE_2__.Device.Button1:
                switch (cmd.commandId) {
                    case _constants__WEBPACK_IMPORTED_MODULE_2__.ButtonCommand.Press:
                        console.log('Button 1 Pressed');
                        sendKeyboardCommand();
                        break;
                    case _constants__WEBPACK_IMPORTED_MODULE_2__.ButtonCommand.Down:
                        console.log('Button 1 Down');
                        sendKeyboardCommand();
                        break;
                    case _constants__WEBPACK_IMPORTED_MODULE_2__.ButtonCommand.Up:
                        console.log('Button 1 Up');
                        sendKeyboardCommand();
                        break;
                    default:
                        console.error('Button 1 unknown command', { command: cmd });
                        break;
                }
                break;
            default:
                console.error('Unknown device', { command: cmd });
                break;
        }
    });
    setTimeout(function () {
        if (muteButton)
            updateMuted();
    }, 1000);
});


/***/ }),

/***/ "./src/protocol.ts":
/*!*************************!*\
  !*** ./src/protocol.ts ***!
  \*************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var Protocol = /** @class */ (function () {
    function Protocol(connection) {
        this.connection = connection;
    }
    Protocol.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var first, cmdByte, deviceId, commandId, argumentsLength, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.read(1)];
                    case 1:
                        first = _a.sent();
                        cmdByte = first[0];
                        deviceId = (cmdByte & 224) >>> 5;
                        commandId = (cmdByte & 28) >>> 2;
                        argumentsLength = cmdByte & 3;
                        return [4 /*yield*/, this.connection.read(argumentsLength)];
                    case 2:
                        args = _a.sent();
                        return [2 /*return*/, new _constants__WEBPACK_IMPORTED_MODULE_0__.Command(deviceId, commandId, args)];
                }
            });
        });
    };
    Protocol.prototype.write = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var cmdByte, data;
            return __generator(this, function (_a) {
                cmdByte = (command.device << 5) | (command.commandId << 2) | command.arguments.length;
                data = new Uint8Array(command.arguments.length + 1);
                data[0] = cmdByte;
                command.arguments.forEach(function (arg, i) { return data[i + 1] = arg; });
                console.debug("Sending", data);
                return [2 /*return*/, this.connection.write(data)];
            });
        });
    };
    Protocol.prototype.start = function (handler) {
        return __awaiter(this, void 0, void 0, function () {
            var cmd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read()];
                    case 1:
                        if (!(cmd = _a.sent())) return [3 /*break*/, 2];
                        handler(cmd);
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return Protocol;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Protocol);


/***/ }),

/***/ "./src/serial.ts":
/*!***********************!*\
  !*** ./src/serial.ts ***!
  \***********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Port = /** @class */ (function () {
    function Port(device) {
        this.device = device;
        this.interfaceNumber = 2; // original interface number of WebUSB Arduino demo
        this.endpointIn = 5; // original in endpoint ID of WebUSB Arduino demo
        this.endpointOut = 4; // original out endpoint ID of WebUSB Arduino demo
    }
    Port.prototype.connect = function () {
        var _this = this;
        return this.device
            .open()
            .then(function () {
            if (_this.device.configuration === null) {
                return _this.device.selectConfiguration(1);
            }
        })
            .then(function () {
            var configurationInterfaces = _this.device.configuration.interfaces;
            configurationInterfaces.forEach(function (element) {
                element.alternates.forEach(function (elementalt) {
                    if (elementalt.interfaceClass == 0xff) {
                        _this.interfaceNumber = element.interfaceNumber;
                        elementalt.endpoints.forEach(function (elementendpoint) {
                            if (elementendpoint.direction == 'out') {
                                _this.endpointOut = elementendpoint.endpointNumber;
                            }
                            if (elementendpoint.direction == 'in') {
                                _this.endpointIn = elementendpoint.endpointNumber;
                            }
                        });
                    }
                });
            });
        })
            .then(function () { return _this.device.claimInterface(_this.interfaceNumber); })
            .then(function () { return _this.device.selectAlternateInterface(_this.interfaceNumber, 0); })
            .then(function () {
            return _this.device.controlTransferOut({
                requestType: 'class',
                recipient: 'interface',
                request: 0x22,
                value: 0x01,
                index: _this.interfaceNumber,
            });
        });
    };
    Port.prototype.read = function (length) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var currentLength, buffer, result, newData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    currentLength = 0;
                                    buffer = new Uint8Array(length);
                                    _a.label = 1;
                                case 1:
                                    if (!(currentLength < length)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, this.device.transferIn(this.endpointIn, length)];
                                case 2:
                                    result = _a.sent();
                                    newData = new Uint8Array(result.data.buffer);
                                    buffer.set(newData, currentLength);
                                    currentLength += newData.length;
                                    return [3 /*break*/, 1];
                                case 3:
                                    resolve(buffer);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Port.prototype.disconnect = function () {
        var _this = this;
        return this.device
            .controlTransferOut({
            requestType: 'class',
            recipient: 'interface',
            request: 0x22,
            value: 0x00,
            index: this.interfaceNumber,
        })
            .then(function () { return _this.device.close(); });
    };
    Port.prototype.write = function (data) {
        return this.device.transferOut(this.endpointOut, data).then(function (result) {
            return true;
        });
    };
    return Port;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    getPorts: function () {
        return navigator.usb.getDevices().then(function (devices) {
            return devices.map(function (device) { return new Port(device); });
        });
    },
    requestPort: function () {
        var filters = [
            { vendorId: 9114, productId: 32798 },
        ];
        return navigator.usb
            .requestDevice({ filters: filters })
            .then(function (device) { return new Port(device); });
    },
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/content.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=content.js.map