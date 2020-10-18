#include <Adafruit_DotStar.h>

#include <WebUSB.h>

WebUSB WebUSBSerial(1 /* https:// */, "webusb.github.io/arduino/demos/rgb");

#define Serial WebUSBSerial

const int LED1    = 0;
const int BUTTON1 = 1;

const int LED_SET      = 0;
const int BUTTON_PRESS = 0;
const int BUTTON_DOWN  = 1;
const int BUTTON_UP    = 2;

const byte BUTTON1_PRESS = 0b00100000;
const byte BUTTON1_DOWN  = 0b00100100;
const byte BUTTON1_UP    = 0b00101000;

const byte LED1_SET      = 0b00000011;

const int buttonPin = 2;
const int ledPin = 13;
const int redPin = 1;
const int greenPin = 4;
const int bluePin = 3;

Adafruit_DotStar strip = Adafruit_DotStar(1, INTERNAL_DS_DATA, INTERNAL_DS_CLK, DOTSTAR_BGR);

int command;
int deviceId;
int commandId;
int args[3];
int argCount = 0;
int argIndex = 0;

int buttonState = HIGH;      // the current reading from the input pin
int lastButtonState = HIGH;  // the previous reading from the input pin
bool buttonFlipped = false;
bool buttonHeld = false;

unsigned long lastDebounceAt = 0;    // the last time the button pin was toggled
unsigned long debounceDelay = 10;    // the debounce time; increase if the output flickers
unsigned long buttonDownAt = 0;      // the last time the button was pressed down
unsigned long buttonHoldDelay = 300; // the last time the button was pressed down

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  digitalWrite(redPin, HIGH);
  digitalWrite(greenPin, HIGH);
  digitalWrite(bluePin, HIGH);

  while (!Serial) {
    ;
  }

  Serial.begin(9600);
}

void loop() {
  readButton1();

  if (Serial.available()) {
    if (argCount && (argCount - argIndex)) {
      args[argIndex] = Serial.read();
      argIndex++;
      if (argIndex == argCount) {
        handleCommand();
        argCount = 0;
        argIndex = 0;
      }
    } else {
      command = Serial.read();
      deviceId = (command & 0b11100000) >> 5;
      commandId = (command & 0b00011100) >> 2;
      argCount = command & 0b00000011;
      if (!argCount) {
        handleCommand();
      }
    }
  } else {
//      Serial.write(BUTTON1_PRESS);
//      Serial.println("test");
//      Serial.flush();
//      delay(1000);
  }
}

void readButton1() {
  int reading = digitalRead(buttonPin);
  buttonFlipped = false;

  if (reading != lastButtonState) {
    lastDebounceAt = millis();
  }

  if ((millis() - lastDebounceAt) > debounceDelay) {
    if (reading != buttonState) {
      buttonFlipped = true;

      buttonState = reading;
      if (!buttonState) {
        buttonDownAt = millis();
      }
      digitalWrite(ledPin, !buttonState);
    }
  }
  lastButtonState = reading;

  if (buttonFlipped) {
    if (buttonState) {
      buttonHeld = false;
      if ((millis() - buttonDownAt) > buttonHoldDelay) {
//        Serial.println("up");
        Serial.write(BUTTON1_UP);
      } else {
//        Serial.println("press");
        Serial.write(BUTTON1_PRESS);
      }
    }
  } else {
    if (!buttonState) {
      if (!buttonHeld && (millis() - buttonDownAt) > buttonHoldDelay) {
        buttonHeld = true;
//        Serial.println("down");
        Serial.write(BUTTON1_DOWN);
      }
    }
  }
}

void handleCommand() {
//  Serial.write(command);
//  for (int i = 0; i < argCount; i++) {
//    Serial.write(args[i]);
//  }

  switch (deviceId) {
    case LED1:
      switch (commandId) {
        case LED_SET:
          digitalWrite(redPin, args[0] == 255 ? LOW : HIGH);
          digitalWrite(greenPin, args[1] == 255 ? LOW : HIGH);
          digitalWrite(bluePin, args[2] == 255 ? LOW : HIGH);
          strip.setPixelColor(0, args[0], args[1], args[2]);
          strip.show();
          break;
      }
      break;
  }

}
