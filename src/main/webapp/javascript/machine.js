const BASE_URL = API_CONFIG.BASE_URL;

// Load data when page opens
window.onload = function () {
    loadMachines();
};

// ---------------------------
// Add Machine
// ---------------------------
function saveMachine() {

    const machine = {
        machine_name: document.getElementById("machine_name").value,
        machine_type: document.getElementById("machine_type").value,
        status: document.getElementById("status").value
    };

    fetch(BASE_URL + "/addMachine", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(machine)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        document.getElementById("machineForm").reset();
        loadMachines();
    });
}

// ---------------------------
// View All Machines
// ---------------------------
function loadMachines() {

    fetch(BASE_URL + "/viewallMachines")
    .then(res => res.json())
    .then(data => {

        let rows = "";

        data.forEach(machine => {

            rows += `
            <tr>

                <td>${machine.machine_id}</td>

                <td>${machine.machine_name}</td>

                <td>${machine.machine_type}</td>

                <td>${machine.status}</td>

                <td>

                    <button class="btn btn-warning btn-sm"
                        onclick="editMachine(${machine.machine_id},
                                             '${machine.machine_name}',
                                             '${machine.machine_type}',
                                             '${machine.status}')">

                        Edit
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="deleteMachine(${machine.machine_id})">

                        Delete
                    </button>

                    <button class="btn btn-success btn-sm"
                        onclick="changeStatus(${machine.machine_id})">

                        Status
                    </button>

                    <button class="btn btn-secondary btn-sm"
                        onclick="maintenanceMachine(${machine.machine_id})">

                        Maintenance
                    </button>

                </td>

            </tr>
            `;

        });

        document.getElementById("machineTable").innerHTML = rows;

    });

}

// ---------------------------
// Edit Machine
// ---------------------------
function editMachine(id, name, type, status) {

    document.getElementById("machine_id").value = id;
    document.getElementById("machine_name").value = name;
    document.getElementById("machine_type").value = type;
    document.getElementById("status").value = status;

}

// ---------------------------
// Update Machine
// ---------------------------
function updateMachine() {

    const machine = {

        machine_id: document.getElementById("machine_id").value,

        machine_name: document.getElementById("machine_name").value,

        machine_type: document.getElementById("machine_type").value,

        status: document.getElementById("status").value

    };

    fetch(BASE_URL + "/updmachine", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(machine)

    })

    .then(res => res.text())

    .then(msg => {

        alert(msg);

        document.getElementById("machineForm").reset();

        loadMachines();

    });

}

// ---------------------------
// Delete Machine
// ---------------------------
function deleteMachine(id) {

    if (!confirm("Delete this machine?"))
        return;

    fetch(BASE_URL + "/delmMachine/" + id, {

        method: "DELETE"

    })

    .then(res => res.text())

    .then(msg => {

        alert(msg);

        loadMachines();

    });

}

// ---------------------------
// Track Machine Status
// ---------------------------
function changeStatus(id) {

    let status = prompt(

        "Enter Status:\n\nAvailable\nWorking\nMaintenance\nInactive"

    );

    if (status == null || status == "")
        return;

    fetch(BASE_URL + "/trackStatus/" + id + "?status=" + encodeURIComponent(status), {

        method: "PUT"

    })

    .then(res => res.text())

    .then(msg => {

        alert(msg);

        loadMachines();

    });

}

// ---------------------------
// Machine Maintenance
// ---------------------------
function maintenanceMachine(id) {

    if (!confirm("Send machine to maintenance?"))
        return;

    fetch(BASE_URL + "/machineMaintenance/" + id, {

        method: "PUT"

    })

    .then(res => res.text())

    .then(msg => {

        alert(msg);

        loadMachines();

    });

}

async function loadMachines() {

    try {

        const response = await fetch(
            `${API_CONFIG.BASE_URL}/viewallMachines`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error(
                "Unable to load machines"
            );
        }

        machines = await response.json();

        console.log("Machines:", machines);

        displayMachines(machines);

    } catch (error) {

        console.error(
            "Machine loading error:",
            error
        );

        const container =
            document.getElementById("machinesContainer");

        if (container) {

            container.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-exclamation-circle"></i>
                    <h5>Unable to load machines</h5>
                    <p>Please try again later.</p>
                </div>
            `;

        }

    }

}

function displayMachines(machineList) {

    const container =
        document.getElementById(
            "machinesContainer"
        );

    if (!container) {
        return;
    }

    if (
        !machineList ||
        machineList.length === 0
    ) {

        container.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-cpu"></i>
                <h5>No Machines Found</h5>
                <p>No machine information is available.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        machineList.map(machine => {

            const status =
                machine.status || "Unknown";

            const statusClass =
                getMachineStatusClass(status);

            return `
                <div class="machine-card">

                    <div class="machine-icon">
                        <i class="bi bi-cpu"></i>
                    </div>

                    <div class="machine-content">

                        <div class="machine-header">

                            <div>

                                <span class="machine-id">
                                    MACHINE #${machine.machine_id}
                                </span>

                                <h5>
                                    ${escapeHTML(
                                        machine.machine_name
                                    )}
                                </h5>

                            </div>

                            <span class="machine-status ${statusClass}">
                                ${escapeHTML(status)}
                            </span>

                        </div>


                        <div class="machine-details">

                            <div>
                                <i class="bi bi-gear"></i>
                                <span>Type</span>
                                <strong>
                                    ${escapeHTML(
                                        machine.machine_type
                                    )}
                                </strong>
                            </div>

                            <div>
                                <i class="bi bi-activity"></i>
                                <span>Status</span>
                                <strong>
                                    ${escapeHTML(status)}
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>
            `;

        }).join("");

}