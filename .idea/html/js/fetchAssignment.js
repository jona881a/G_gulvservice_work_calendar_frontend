
//URL til controlleren i backenden som henter alle rooms i JSON format
const urlAssignment = "http://localhost:8080/assignment";

//Query for knappen som aktivere vores request til databasen
const pbGetAssignment = document.querySelector(".pbGetAssignment");
const assignmentsMap = new Map(); //map der holder alle movies så de kan findes frem på deres keys

async function fetchtAssignmentFromDB() {
    //Henter alt i moviestabellen og laver det til et promiseobject
    const promise = fetch(urltAssignment).then(response => response.json());
    promise.then(data =>{ //Vi reagere på dataen der kommer fra vores RESTapi
        data.forEach(assignment => { //Vi hiver hver movie ud af promiseobjektet
            assignmentMap.set(assignment.assignmentID, assignment);
            console.log(getAssigment(1));
        })
    })
} //fetching room from database

function showtAssignmentMap() {
    for (const assignmentKey of assignmentsMap.keys()) {
        console.log(assignmentsMap.get(assignmentKey));
    }
}

function getAssigment(assignmentid) {
    return assignmentsMap.get(assignmentid);
}

//Eventlisteners
pbGetAssignment.addEventListener('click',fetchtAssignmentFromDB);

function updateTableHTMLAssignment(myArray) {
    var tableBody = document.getElementById("assignments"),
        newRow, newCell;

    // Reset the table
    tableBody.innerHTML = "";

    // Build the new table
    for (var i=0; i < myArray.length; i++) {
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);

        if (myArray[i] instanceof Array) {
            for (var j=0; j < myArray[i].length; j++) {
                newCell = document.createElement("td");
                newCell.textContent = update[i][j];
                newRow.appendChild(newCell);
            }
        } else {
            newCell = document.createElement("td");
            newCell.textContent = myArray[i];
            newRow.appendChild(newCell);
        }
    }
}