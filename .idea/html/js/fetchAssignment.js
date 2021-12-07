
//URL til controlleren i backenden som henter alle rooms i JSON format
const urlAssignment = "http://localhost:8080/assignment";

//Query for knappen som aktivere vores request til databasen
const pbGetAssignment = document.querySelector(".pbGetAssignment");
const assignmentsMap = new Map(); //map der holder alle movies så de kan findes frem på deres keys

async function fetchAssignmentFromDB() {
    //Henter alt i moviestabellen og laver det til et promiseobject
    const promise = fetch(urlAssignment).then(response => response.json());
    promise.then(data =>{ //Vi reagere på dataen der kommer fra vores RESTapi
        data.forEach(assignment => { //Vi hiver hver movie ud af promiseobjektet
            assignmentsMap.set(assignment.assignmentID, assignment);
        })
    })
} //fetching room from database

function showAssignmentMap() {
    for (const assignmentKey of assignmentsMap.keys()) {
        console.log(assignmentsMap.get(assignmentKey));
    }
}

function getAssigment(assignmentid) {
    return assignmentsMap.get(assignmentid);
}


const table = document.getElementById("assignmentTable");

function addRow(assignment){


    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.id = assignment.assignment;

    let cell1 = row.insertCell(0);
    cell1.innerHTML = assignment.assignmentID;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = assignment.title;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = assignment.address;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = assignment.assignmentStartDateTime;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = assignment.assignmentEndDateTime;

    let cell6 = row.insertCell(5);
    cell6.innerHTML = assignment.color;

    let cell7 = row.insertCell(6);
    cell7.innerHTML = assignment.description;

}

   function createTableFromMap() {
      let loopCount = 1;
    for (const assignmentKey of assignmentsMap.keys()) {
        const assignment1 = assignmentsMap.get(assignmentKey);
        addRow(assignment1);
    }
}

const pbCreateTable = document.querySelector(".pbCreateTable");
pbCreateTable.addEventListener("click", createTableFromMap);

fetchAssignmentFromDB();