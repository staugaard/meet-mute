class Port {
  device: USBDevice
  interfaceNumber: number
  endpointIn: number
  endpointOut: number

  constructor(device: USBDevice) {
    this.device = device
    this.interfaceNumber = 2 // original interface number of WebUSB Arduino demo
    this.endpointIn = 5 // original in endpoint ID of WebUSB Arduino demo
    this.endpointOut = 4 // original out endpoint ID of WebUSB Arduino demo
  }

  connect() {
    return this.device
      .open()
      .then(() => {
        if (this.device.configuration === null) {
          return this.device.selectConfiguration(1)
        }
      })
      .then(() => {
        var configurationInterfaces = this.device.configuration.interfaces
        configurationInterfaces.forEach((element) => {
          element.alternates.forEach((elementalt) => {
            if (elementalt.interfaceClass == 0xff) {
              this.interfaceNumber = element.interfaceNumber
              elementalt.endpoints.forEach((elementendpoint) => {
                if (elementendpoint.direction == 'out') {
                  this.endpointOut = elementendpoint.endpointNumber
                }
                if (elementendpoint.direction == 'in') {
                  this.endpointIn = elementendpoint.endpointNumber
                }
              })
            }
          })
        })
      })
      .then(() => this.device.claimInterface(this.interfaceNumber))
      .then(() => this.device.selectAlternateInterface(this.interfaceNumber, 0))
      .then(() =>
        this.device.controlTransferOut({
          requestType: 'class',
          recipient: 'interface',
          request: 0x22,
          value: 0x01,
          index: this.interfaceNumber,
        })
      )
  }

  async read(length: number): Promise<Uint8Array> {
    return new Promise(async (resolve, reject) => {
      let currentLength = 0
      let buffer = new Uint8Array(length)

      while (currentLength < length) {
        const result = await this.device.transferIn(this.endpointIn, length)
        const newData = new Uint8Array(result.data.buffer)
        buffer.set(newData, currentLength)
        currentLength += newData.length
      }
      resolve(buffer)
    })
  }

  disconnect() {
    return this.device
      .controlTransferOut({
        requestType: 'class',
        recipient: 'interface',
        request: 0x22,
        value: 0x00,
        index: this.interfaceNumber,
      })
      .then(() => this.device.close())
  }

  write(data: Uint8Array): Promise<boolean> {
    return this.device.transferOut(this.endpointOut, data).then((result) => {
      return true
    })
  }
}

export default {
  getPorts: function () {
    return navigator.usb.getDevices().then((devices) => {
      return devices.map((device) => new Port(device))
    })
  },

  requestPort: function () {
    const filters = [
      { vendorId: 9114, productId: 32798 }, // Trinket M0
    ]
    return navigator.usb
      .requestDevice({ filters: filters })
      .then((device) => new Port(device))
  },
}
