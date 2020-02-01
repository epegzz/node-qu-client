const midi = require('midi')

class Client {
  constructor(mixerPortName) {
    this.connect(mixerPortName)
  }

  connect(mixerPortName) {
    this.output = new midi.Output()

    const portNames = []
    for (let portNumber = 0; portNumber < this.output.getPortCount(); portNumber++) {
      portNames.push(this.output.getPortName(portNumber))
    }

    const portIndex = portNames.findIndex(portName => portName === mixerPortName)
    if (portIndex < 0) {
      const formattedPortNameList = portNames.map(portName => `"${portName}"`).join(', ')
      throw new Error(
        [
          '\n',
          `   Connecting to mixer failed: Could not any find port named "${mixerPortName}".`,
          `   Available ports are: ${formattedPortNameList}\n`,
        ].join('\n')
      )
    }
    this.output.openPort(portIndex)
  }

  disconnect() {
    this.output.closePort()
  }

  // percent value between 0 and 127
  setFaderPosition({ channel, percent }) {
    percent = Math.max(0, percent)
    percent = Math.min(127, percent)
    this.setNrpnParameter({ channel, cmd: 0x17, value: percent })
  }

  setPaflSelect({ channel, active }) {
    const value = active ? 1 : 0
    this.setNrpnParameter({ channel, cmd: 0x51, value })
  }

  setMute({ channel, active }) {
    const value = active ? 0x7f : 0x3f
    const { output } = this
    output.sendMessage([0x90, channel, value])
    output.sendMessage([0x80, channel, 0x00])
  }

  setNrpnParameter({ channel, cmd, value, valueIndex = 0x07 }) {
    const { output } = this
    output.sendMessage([0xb0, 0x63, channel])
    output.sendMessage([0xb0, 0x62, cmd])
    output.sendMessage([0xb0, 0x06, value])
    output.sendMessage([0xb0, 0x26, valueIndex])
  }
}

Client.channels = {
  fx_send_1: 0x00,
  fx_send_2: 0x01,
  fx_send_3: 0x02,
  fx_send_4: 0x03,
  fx_return_1: 0x08,
  fx_return_2: 0x09,
  fx_return_3: 0x0a,
  fx_return_4: 0x0b,
  dca_group_1: 0x10,
  dca_group_2: 0x11,
  dca_group_3: 0x12,
  dca_group_4: 0x13,
  input_1: 0x20,
  input_2: 0x21,
  input_3: 0x22,
  input_4: 0x23,
  input_5: 0x24,
  input_6: 0x25,
  input_7: 0x26,
  input_8: 0x27,
  input_9: 0x28,
  input_10: 0x29,
  input_11: 0x2a,
  input_12: 0x2b,
  input_13: 0x2c,
  input_14: 0x2d,
  input_15: 0x2e,
  input_16: 0x2f,
  input_17: 0x30,
  input_18: 0x31,
  input_19: 0x32,
  input_20: 0x33,
  input_21: 0x34,
  input_22: 0x35,
  input_23: 0x36,
  input_24: 0x37,
  input_25: 0x38,
  input_26: 0x39,
  input_27: 0x3a,
  input_28: 0x3b,
  input_29: 0x3c,
  input_30: 0x3d,
  input_31: 0x3e,
  input_32: 0x3f,
  stereo_1: 0x40,
  stereo_2: 0x41,
  stereo_3: 0x42,
  mute_group_1: 0x50,
  mute_group_2: 0x51,
  mute_group_3: 0x52,
  mute_group_4: 0x53,
  mix_1: 0x60,
  mix_2: 0x61,
  mix_3: 0x62,
  mix_4: 0x63,
  mix_5_6: 0x64,
  mix_7_8: 0x65,
  mix_9_10: 0x66,
  main_lr: 0x67,
  matrix_1_2: 0x6c,
  matrix_3_4: 0x6d,
}

module.exports = Client
