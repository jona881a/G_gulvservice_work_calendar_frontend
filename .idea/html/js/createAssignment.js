
document.addEventListener("DOMContentLoaded",createFormEvent);


function createFormEvent(){
    const formObject = document.getElementById("assign");
    formObject.addEventListener("submit",handleAssignmentSubmit);
}

async function handleAssignmentSubmit(event){
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;

    try{
        const formData = new FormData(form);
        await insertAssignmentInBackend(url,formData);
        console.log("insertAssignmentInBackend running");

    }catch(error){
        console.log("Error in function handleAssignmentSubmit "+error.message)
    }
    //window.location.href = "/G_gulvservice_work_calendar_frontend/html/assignment.html";
}

async function insertAssignmentInBackend(url,formData){

    const plainFormData = Object.fromEntries(formData.entries());

    console.log(plainFormData);

    const JSONObjectToJSONString = JSON.stringify(plainFormData);

    console.log(JSONObjectToJSONString);
    console.log("url: "+url);

    const POSTOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSONObjectToJSONString
    }

    const response = await fetch(url,POSTOptions);

    await resetInputFields();

    return response.json();

}

