<h1 align="center">node-qu-remote</h1>

<div align="center">
  <strong>NodeJS client library for Allen &amp; Heath QU series mixers</strong>
</div>
<br/>

<p align="center">
  <a target="_blank" href="https://travis-ci.org/epegzz/node-qu-client">
    <img alt="Travis" src="https://img.shields.io/travis/epegzz/node-qu-client.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://codeclimate.com/github/epegzz/node-qu-client/maintainability">
    <img alt="Maintainability" src="https://img.shields.io/codeclimate/maintainability/epegzz/node-qu-client.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/@epegzz/node-qu-client">
    <img alt="npm version" src="https://img.shields.io/npm/v/@epegzz/node-qu-client.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/@epegzz/node-qu-client">
    <img alt="npm installs" src="https://img.shields.io/npm/dm/@epegzz/node-qu-client.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://david-dm.org/epegzz/node-qu-client">
    <img alt="dependencies" src="https://img.shields.io/david/epegzz/node-qu-client.svg?style=flat-square">
  </a>
</p>

# Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Example](#example)

## Features

Currently this client can:
* activate PAFL for each channel
* set the fader level for each channel
* activate the mute button for each channel

If you need more features then feel free to open a GitHub issue and I will add them.   

## Prerequisites

### OSX

* Some version of Xcode (or Command Line Tools)
* Python (for node-gyp)

### Windows

* Microsoft Visual C++ (the Express edition works fine)
* Python (for node-gyp)

### Linux

* A C++ compiler
* You must have installed and configured ALSA.
* Install the libasound2-dev package.
* Python (for node-gyp)

## Installation

```bash
$ npm install @epegzz/node-qu-client
```

## Example

```javascript
const Mixer = require('@epegzz/node-qu-client')

// Connect to the mixer.
// The constructor takes one single argument which is the MIDI port name of the mixer.
// If you do not know the port name, just leave it blank. That will cause an error message
// that includes a list of all available ports.
const mixer = new Mixer('QU-16 MIDI In')

// Set volume fader level
// 0% = - infinity db
// 100% = 0db
// 127% = 10db
mixer.setFaderPosition({
  channel: Mixer.channels.main_lr,
  percent: 100
})

// Activate PAFL
mixer.setPaflSelect({
  channel: Mixer.channels.stereo_1,
  active: true
})

// Unmute
mixer.setMute({
  channel: Mixer.channels.input_9,
  active: false
})

mixer.disconnect()
```

## Resources

* [Allen&Heath QU MIDI Protocol documentation](https://www.allen-heath.com/media/Qu_MIDI_Protocol_V1.9.pdf)
