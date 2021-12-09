async function updateAssignment(assignment){
    try {
        const response = await restUpdateAssignment(assignment);
    } catch(error) {
        alert(error.message);
    }
}

async function restUpdateAssignment(assignment){
    const url = "http://localhost:8080/assignment/{id}"+ assignment.screeningID;
    const jsonString = JSON.stringify(assignment);
    out(jsonString);

    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonString
    }
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        console.log("nope");
    }
    return response.json();
}