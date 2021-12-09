async function deleteAssignmentFromDB(assignment) {
    try {
        const response = await restDeleteScreening(assignment);

    } catch(error) {
        alert(error.message);
    }
}

async function restDeleteScreening(assignment) {
    const url = "http://localhost:8080/assignment/" + assignment.assignmentId;

    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: ""
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        console.log("det gik ikke godt");
    }

    return response;
}
