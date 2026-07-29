const stopBtn = document.getElementById("stopBtn")
const deleteBtn = document.getElementById("deleteBtn")
const refreshBtn = document.getElementById("RefreshBtn")
const tableBody = document.getElementById("Information");


let interval;
let running = false;

refreshBtn.addEventListener("click",refreshLogs)
deleteBtn.addEventListener("click",deletelogs )
stopBtn.addEventListener("click",stopMonitoring )



// stop monitorting
function stopMonitoring(){
    clearInterval(interval)
    document.getElementById("statusChecker").textContent = "Status: NOT RUNNING"
}

// delete logs
async function deletelogs(){
    const result = window.confirm("Are you sure you want to delete the Logs? ")
    if(result === true){
        console.log("started")
        await window.deleteAllLogs.deleteLogs()
        console.log("finished")
        loadLogs()
        console.log("done")
    }
    else{
        
    }
}

//refresh 
async function refreshLogs(){
    loadLogs()
}



//loads the logs from the database into Rows
async function loadLogs() {
    const logs = await window.sshLogs.getLogs();
    
    tableBody.innerHTML = ""
     logs.forEach((log) => {
        const row = document.createElement("tr");

        const ip = document.createElement("td");
        const username = document.createElement("td");
        const attempts = document.createElement("td");
        const timestaps = document.createElement("td");

        ip.textContent = log.ip;
        username.textContent = log.username;
        attempts.textContent = log.attemps;
        timestaps.textContent = log.timestaps;

        row.appendChild(ip);
        row.appendChild(username);
        row.appendChild(attempts);
        row.appendChild(timestaps);

        tableBody.appendChild(row);
    });
}

loadLogs();



/*
if want to use it create an variable for timestamp btn as well

async function OderByTimestamps(params) {
    await window.oderbytimestamps.oderByTimestamps()
    loadLogs()
}


*/