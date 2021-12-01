
async function deleteSreening(screening) {
    try {
        const response = await restDeleteScreening(screening);
        out("Vi har slettet");
        out(response);

    } catch(error) {
        alert(error.message);
        out(error);
    }
}

async function restDeleteScreening(screening) {
    const url = "http://localhost:8080/screening/" + screening.screeningID;

    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: ""
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        out("det gik ikke godt");
    }

    return response;
}