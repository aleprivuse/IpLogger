const { contextBridge, ipcRenderer } = require("electron");


contextBridge.exposeInMainWorld(`sshLogs` , {
    getLogs : () => ipcRenderer.invoke(`Get-logs`)
})

