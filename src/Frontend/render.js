const startBtn = document.getElementById("startBtn")
const stopBtn = document.getElementById("stopBtn")
const tableBody = document.getElementById("Information");

let interval;
let running = false;

startBtn.addEventListener("click",startMonitoring )
stopBtn.addEventListener("click",stopMonitoring )

// start the monitoring
function startMonitoring(){
    if(running == false){
        interval = setInterval(() => {console.log("checking")},3000)    
        running = true
        document.getElementById("statusChecker").textContent = "Status: RUNNING"
    }
    else{
        document.getElementById("statusChecker").textContent = "Status: RUNNING"
    }
    
}

function stopMonitoring(){
    clearInterval(interval)
    document.getElementById("statusChecker").textContent = "Status: NOT RUNNING"
}

//loads the logs from the database into Rows
async function loadLogs() {
    const logs = await window.sshLogs.getLogs();
 
    logs.forEach((log) => {
        const row = document.createElement("tr");

        const ip = document.createElement("td");
        const username = document.createElement("td");
        const attempts = document.createElement("td");
        const timestamps = document.createElement("td");

        ip.textContent = log.ip;
        username.textContent = log.username;
        attempts.textContent = log.attemps;
        timestamps.textContent = log.timestaps;

        row.appendChild(ip);
        row.appendChild(username);
        row.appendChild(attempts);
        row.appendChild(timestamps);

        tableBody.appendChild(row);
    });
}

loadLogs();
