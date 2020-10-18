enum Device {
  LED1 = 0,
  Button1 = 1
}

enum ButtonCommand {
  Press = 0,
  Down = 1,
  Up = 2
}

enum LEDCommand {
  Set = 0
}

class Command {
  device: Device
  commandId: number
  arguments: Uint8Array

  constructor(device: Device, commandId: number, args: Uint8Array) {
    this.device = device
    this.commandId = commandId
    this.arguments = args
  }
}


export { Device, ButtonCommand, LEDCommand, Command }