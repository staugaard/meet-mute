import { Device, Command } from './constants'

interface Connection {
  read(length: number): Promise<Uint8Array>
  write(data: Uint8Array): Promise<boolean>
}

export default class Protocol {
  connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  async read(): Promise<Command> {
    const first = await this.connection.read(1)
    const cmdByte = first[0]
    const deviceId = (cmdByte & 224) >>> 5
    const commandId = (cmdByte & 28) >>> 2
    const argumentsLength = cmdByte & 3
    const args = await this.connection.read(argumentsLength)

    return new Command(deviceId, commandId, args)
  }

  async write(command: Command): Promise<boolean> {
    const cmdByte = (command.device << 5) | (command.commandId << 2) | command.arguments.length
    const data = new Uint8Array(command.arguments.length + 1)
    data[0] = cmdByte
    command.arguments.forEach((arg, i) => data[i + 1] = arg)
    console.debug("Sending", data)
    return this.connection.write(data)
  }

  async start(handler: (cmd: Command) => void) {
    let cmd: Command
    while (cmd = await this.read()) {
      handler(cmd)
    }
  }
}
