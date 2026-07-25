//modules
import {app, BrowserWindow, ipcMain} from 'electron';
import {insertDb,updateDb,seeLogs,deleteDb,orderByTimestamps,orderByAttemps} from './DataBase/database.js';
import path from "path";
import {fileURLToPath}  from "url";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ipcMain.handle(`Get-logs` , () =>{
    return seeLogs()
})


//Running the server
app.disableHardwareAcceleration();
function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: { preload: path.join(__dirname, "preload.js")}
    })
    win.loadFile(path.join(__dirname,"Frontend/Index.html"))
}
app.whenReady().then(createWindow)


