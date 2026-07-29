const startBtn = document.getElementById("startBtn")
const stopBtn = document.getElementById("stopBtn")
const deleteBtn = document.getElementById("deleteBtn")
const tableBody = document.getElementById("Information");


let interval;
let running = false;

deleteBtn.addEventListener("click",deletelogs )
startBtn.addEventListener("click",startMonitoring )
stopBtn.addEventListener("click",stopMonitoring )

// start the monitoring
function startMonitoring(){
    if(running === false){
        interval = setInterval(() => {console.log("checking")},3000)    
        running = true
        document.getElementById("statusChecker").textContent = "Status: RUNNING"
    }
    else{
        document.getElementById("statusChecker").textContent = "Status: RUNNING"
    }
    
}
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
