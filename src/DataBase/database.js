import  Database  from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const db = new Database(path.join(__dirname ,"logs.db"));

// create an table ,run = it just need to run 1 time
db.prepare(
    `CREATE TABLE IF NOT EXISTS ssh_Logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL,
    username TEXT,
    attemps INTEGER DEFAULT 1,
    timestaps TEXT
    )`
).run(); 

// its to insert file, prepare = its going to get used alot 
function insertDb(ip, username, attemps, timestaps){
const insertDb = db.prepare(`
    INSERT INTO ssh_logs(ip, username, attemps, timestaps)
    VALUES (?,?,?,?)
    `)
    insertDb.run(ip,username,attemps,timestaps)
}

//its gonna update the files
function updateDb(ip){
const updateDb = db.prepare(`
    UPDATE ssh_logs
    SET attemps = attemps + 1
    WHERE ip = ?
    `)   
    updateDb.run(ip)
 }  

// gonna see all the logs
function seeLogs(){
const seeLogs = db.prepare(`
    SELECT * FROM ssh_logs
    `).all()   
    return seeLogs
  }  

// delete rows
function deleteDb(id){
    const deleteDb = db.prepare(`
    DELETE FROM ssh_logs 
    WHERE id = ?`) 
    deleteDb.run(id)
}

function orderByTimestamps(){
    const orderByTimestamps = db.prepare(`
    SELECT * FROM ssh_logs
    ORDER BY timestaps DESC;`)
    
    orderByTimestamps.run()
}
function orderByAttemps(){
    const orderByAttemps = db.prepare(`
    SELECT * FROM ssh_logs
    ORDER BY attemps DESC;`)
    
    orderByTimestamps.run()
}
//if you want use Default to give an whole file
export {
    insertDb,
    updateDb,
    seeLogs,
    deleteDb,
    orderByTimestamps,
    orderByAttemps,
}
