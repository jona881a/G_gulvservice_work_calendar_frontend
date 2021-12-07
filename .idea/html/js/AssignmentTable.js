

const table = document.getElementById("assignmentTable");

function addRow(assignment){

    console.log("add row method")

    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.id = assignment.assignment;

    let cell1 = row.insertCell(0);
    cell1.innerHTML = assignment.assignmentID;

    let cell2 = row.insertCell(1);
    cell1.innerHTML = assignment.title;

    let cell3 = row.insertCell(2);
    cell1.innerHTML = assignment.address;

    let cell4 = row.insertCell(3);
    cell1.innerHTML = assignment.assignmentStartDateTime;

    let cell5 = row.insertCell(4);
    cell1.innerHTML = assignment.assignmentEndDateTime;

    let cell6 = row.insertCell(5);
    cell1.innerHTML = assignment.color;

    let cell7 = row.insertCell(6);
    cell1.innerHTML = assignment.description;

}

async function createTableFromMap() {
    await  fetchAssignmentFromDB();
    console.log(assignmentsMap);
    console.log("create table");
        for (const assignmentKey of assignmentsMap.keys()) {
            console.log("inde i loop");
            const assignment1 = assignmentsMap.get(assignmentKey);
            addRow(assignment1);
        }
}

createTableFromMap();