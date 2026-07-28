//modules
import {app, BrowserWindow, ipcMain} from 'electron';
import {insertDb,updateDb,seeLogs,deleteDb,orderByTimestamps,orderByAttemps} from './DataBase/database.js';
import path from "path";
import {fileURLToPath}  from "url";
import fs from 'fs/promises';
import { read } from 'fs';
import { getDefaultAutoSelectFamilyAttemptTimeout } from 'net';
import { time, timeStamp } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// creating new attemps
class newSshAttemps{
    constructor(ip, username, attemps ,timestaps){
        this.ip = ip
        this.username = username
        this.attemps = attemps
        this.timestaps = timestaps
    }
}

// insert new function
async function insertIntoDatabase(){
    const data = await readLogs()
    console.log(data)
    insertDb(data)
}

// read the logs and transforthem in objects

async function readLogs(){
    const data = await fs.readFile("/var/log/auth.log", 'utf-8')
    const lines = data.split("\n")
    const logs = []
    for(let i = 0; i < lines.length; i++){
        if(lines[i].includes("Failed password")){
            const splitdata = lines[i].split(",")
            
            for(let x = 0; x < splitdata.length; x++){
                const fromPosition = splitdata[x].indexOf("from");
                const portPosition = splitdata[x].indexOf("port");
                const sshdPostion = splitdata[x].indexOf("sshd")
                const username = splitdata[x].slice(32, sshdPostion).trim()
                const timestaps = splitdata[x].slice(0,32).trim();
                const ip = splitdata[x].slice(fromPosition + 4, portPosition).trim()
                const attemps = 1
                const sshAttemps = new newSshAttemps(ip,username,attemps ,timestaps)
                logs.push(sshAttemps)
            }
           
        }
    }
    
    return logs
    
    }


// get the data when the app start
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

// calls function 
app.whenReady().then(createWindow)
insertIntoDatabase()
