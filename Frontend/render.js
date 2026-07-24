
const tableBody = document.getElementById("Information");

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
