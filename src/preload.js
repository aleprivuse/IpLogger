const { contextBridge, ipcRenderer } = require("electron");

// reader of the logs
contextBridge.exposeInMainWorld(`sshLogs` , {
    getLogs : () => ipcRenderer.invoke(`Get-logs`)
})

// delete the logs
contextBridge.exposeInMainWorld(`deleteAllLogs`, {
    deleteLogs : () => ipcRenderer.invoke(`delete-logs`)
})

