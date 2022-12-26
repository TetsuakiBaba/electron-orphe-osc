// preload.js
// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    bluetoothPairingRequest: (callback) => ipcRenderer.on('bluetooth-pairing-request', callback),
    bluetoothPairingResponse: (response) => ipcRenderer.send('bluetooth-pairing-response', response)
})

