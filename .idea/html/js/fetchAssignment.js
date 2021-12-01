
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


fetchAssignmentFromDB()
showAssignmentMap()