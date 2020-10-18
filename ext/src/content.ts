import Serial from './serial'
import Protocol from './protocol'
import { Device, ButtonCommand, LEDCommand, Command } from './constants'

let dev: Protocol = null

async function connectToUSB() {
  const ports = await Serial.getPorts()
  if (!ports.length) {
    console.log('No USB devices found')
    throw new Error('No USB devices found')
  }

  await ports[0]
    .connect()
    .then(() => {
      console.debug('connected')
    })
    .catch((error) => {
      console.error(error)
    })

  return new Protocol(ports[0])
}

const MUTE_BUTTON =
  'div[role="button"][aria-label*="microphone"][data-is-muted]'

var muted = false

function isMuted() {
  let dataIsMuted = document
    .querySelector(MUTE_BUTTON)
    .getAttribute('data-is-muted')
  return dataIsMuted == 'true'
}

function updateMuted(newValue?: boolean) {
  muted = newValue || isMuted()
  if (dev && muted) {
    dev.write(
      new Command(Device.LED1, LEDCommand.Set, new Uint8Array([0, 255, 0]))
    )
  } else if (dev && !muted) {
    dev.write(
      new Command(Device.LED1, LEDCommand.Set, new Uint8Array([255, 0, 0]))
    )
  }
}

var isMutedObserver: MutationObserver

function watchIsMuted(el: Element) {
  if (isMutedObserver) {
    isMutedObserver.disconnect()
  }
  isMutedObserver = new MutationObserver((mutations) => {
    let target = <Element>mutations[0].target
    let newValue = target.getAttribute('data-is-muted') == 'true'

    if (newValue != muted) {
      updateMuted(newValue)
    }
  })
  isMutedObserver.observe(el, {
    attributes: true,
    childList: true,
    attributeFilter: ['data-is-muted'],
  })
}

let muteButton: Element

setInterval(() => {
  const btn = document.querySelector(MUTE_BUTTON)
  if (btn && btn != muteButton) {
    muteButton = btn
    updateMuted()
    watchIsMuted(muteButton)
  } else if (!btn && muteButton) {
    muteButton = null
  }
}, 1000)

window.addEventListener('beforeunload', () => {
  if (dev) {
    dev.write(
      new Command(Device.LED1, LEDCommand.Set, new Uint8Array([0, 0, 0]))
    )
  }
})

const keydownEvent = new KeyboardEvent('keydown', {
  key: 'd',
  code: 'KeyD',
  metaKey: true,
})

function sendKeyboardCommand() {
  document.dispatchEvent(keydownEvent)
}

connectToUSB().then((protocol) => {
  dev = protocol

  protocol.start((cmd) => {
    switch (cmd.device) {
      case Device.Button1:
        switch (cmd.commandId) {
          case ButtonCommand.Press:
            console.log('Button 1 Pressed')
            sendKeyboardCommand()
            break
          case ButtonCommand.Down:
            console.log('Button 1 Down')
            sendKeyboardCommand()
            break
          case ButtonCommand.Up:
            console.log('Button 1 Up')
            sendKeyboardCommand()
            break
          default:
            console.error('Button 1 unknown command', { command: cmd })
            break
        }
        break
      default:
        console.error('Unknown device', { command: cmd })
        break
    }
  })

  setTimeout(() => {
    if (muteButton) updateMuted()
  }, 1000)
})
