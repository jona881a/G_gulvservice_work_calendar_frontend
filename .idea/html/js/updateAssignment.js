//document.addEventListener("DOMContentLoaded",updateAssignment);

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

    await resetInputFields();

    return response.json();
}