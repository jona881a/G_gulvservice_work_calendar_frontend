let nav = 0;  //Bliver brugt som varibael til at navigerer frem og tilbage i måneder. Hvis januar er 0, så er -1 = december og 1 = februar
let clicked = null; //Indikerer om statusen på en måned er trykket på eller ikke trykket på
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; //Et array med strings, kan ikke indeholde arrays, derfor bruges JSON til at parse
//
const oneDayInMillis = 1000 * 60 * 60 * 24; //Bliver brugt til at regne med hele dage når vi skal have længden af en assignment

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const editEventModal = document.getElementById('editEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');

const eventTitleInput = document.getElementById('eventTitleInput');
const addressInput = document.getElementById('addressInput');
const startTimeInput = document.getElementById('startTimeInput');
const endTimeInput = document.getElementById('endTimeInput');
const colorInput = document.getElementById('colorInput');
const descriptionInput = document.getElementById('descriptionInput');

const weekdays = ['Monday','Thuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const modalColors = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple', 'Pink', 'Cadetblue', 'Chocolate', 'Forestgreen']

async function loadAssignmentsFromDatabase() {
    events.length = 0; //Vi fjerner alle eksisterende så vi ikke laver duplicates
    const urlAssignment = "http://localhost:8080/assignment";

    await fetch(urlAssignment).then(response => response.json())
    .then(assigments =>{
        assigments.forEach(assignment => {
            const dateOfAssignment = new Date(assignment.assignmentStartDateTime);

            const startDate = new Date(assignment.assignmentStartDateTime);
            const endDate = new Date(assignment.assignmentEndDateTime);
            const lengthOfAssignment = Math.round(endDate.getTime() - startDate.getTime())/(oneDayInMillis);

            for (let i = 0; i <= lengthOfAssignment; i++) {
                let dateOfAssignment;
                if(i === 0) {
                    dateOfAssignment = new Date(startDate.setDate(startDate.getDate()).valueOf());
                } else {
                    dateOfAssignment = new Date(startDate.setDate(startDate.getDate() + 1).valueOf());
                }

                const dateString = startDate.toLocaleDateString('en-us',{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                });

                events.push({
                    assignmentId: assignment.assignmentID,
                    date: dateString,
                    title: assignment.title,
                    address: assignment.address,
                    color: assignment.color,
                    description: assignment.description,
                    startTime: assignment.assignmentStartDateTime,
                    endTime: assignment.assignmentEndDateTime
                })
            }

            localStorage.setItem('events', JSON.stringify(events));
        })
    });
    await load();
}

function openModalForEvent(date){
    event.stopPropagation(); //Sørger for at parentNoden (div for day) ikke bliver kaldt, dette kaldes eventbubbling

    const eventTitle = event.currentTarget.valueOf().innerHTML;
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked && eventTitle === e.title);

    if (eventForDay){
        document.getElementById('eventText').innerText = eventForDay.title;
        document.getElementById('addressText').innerText = eventForDay.address;
        document.getElementById('startDateText').innerText = eventForDay.startTime;
        document.getElementById('endDateText').innerText = eventForDay.endTime;
        document.getElementById('colorText').innerText = eventForDay.color + " - team";
        document.getElementById('descriptionText').innerText = eventForDay.description
        deleteEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
}

function openModalForDay(date) {
    newEventModal.style.display = 'block';
    createDropDown();
    backDrop.style.display = 'block';
}

function openModalEditEvent() {
    //deleteEventModal.style.display = 'none';
    const eventDetail = Array.from(document.getElementsByClassName("pText"));
    const startDate = eventDetail[2].innerHTML.split("T")[0];
    const endDate = eventDetail[3].innerHTML.split("T")[0];
    createDropDown();
    console.log(startDate);

    document.getElementById("editTitle").value = eventDetail[0].innerHTML;
    document.getElementById("editAddress").value = eventDetail[1].innerHTML;
    document.getElementById("editStartDate").value = startDate;
    document.getElementById("editEndDate").value = endDate;
    document.getElementById("editColor").value = eventDetail[4].innerHTML.split(" ")[0];
    document.getElementById("editDescription").value = eventDetail[5].innerHTML;

    console.log(eventTitleInput);

    editEventModal.style.display = 'block';
    //backDrop.style.display = 'block';
}

function createDropDown() {
    var select = document.getElementById("colorInput");

    for(var i = 0; i < modalColors.length; i++) {
        var option = modalColors[i];
        var element = document.createElement("option");
        element.textContent = option;
        select.appendChild(element);
    }
}

function load(){
    const dt = new Date();

    if (nav !== 0){
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const amountOfDaysInMonth = new Date(year, month+1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us',{
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById("currentMonthDisplay").innerText =
        `${dt.toLocaleDateString('en-us',{ month: 'long' })} ${year}`;

    calendar.innerHTML = '';


    for(let i = 1; i <= paddingDays + amountOfDaysInMonth; i++){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if(i > paddingDays){
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e => e.date === dayString);

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            daySquare.addEventListener('click', () => openModalForDay(dayString));
        }else {
            daySquare.classList.add('padding');
        }
        calendar.appendChild(daySquare);
    }
    loadAssignmentsIntoCalendar();
}

function loadAssignmentsIntoCalendar() {

    const days = Array.from(document.getElementsByClassName('day'));
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const monthName = document.getElementById("currentMonthDisplay").innerText.split(" ")[0];
    const monthIndex = months.indexOf(monthName);
    const year = document.getElementById("currentMonthDisplay").innerText.split(" ")[1];

    days.forEach(day => {
        const date = new Date(year,monthIndex,day.innerHTML);
        const dateString = date.toLocaleDateString('en-us',{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });

        events.forEach(eventForDay => {
            if(eventForDay.date === dateString) {
                if(eventForDay) {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event');
                    eventDiv.innerText = eventForDay.title;
                    eventDiv.style.backgroundColor = '' + eventForDay.color;

                    day.appendChild(eventDiv);

                    eventDiv.addEventListener('click', () => openModalForEvent(dateString));
                }
            }
        })
    })
}

async function closeModal(){
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    clicked = null;
    await loadAssignmentsFromDatabase();
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        events.push({
            date: startTimeInput.value,
            title: eventTitleInput.value,
            address: addressInput.value,
            color: colorInput.value,
            description: descriptionInput.value,
            startTime: startTimeInput.value,
            endTime: endTimeInput.value,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else {
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent(){
    const eventTitle = document.getElementById("eventText").innerText;
    console.log(eventTitle);
    events.forEach(e => {
        if(e.date === clicked && eventTitle === e.title){
            deleteAssignmentFromDB(e);
        };
    });

    events = events.filter(e => e.date !== clicked && eventTitle === e.title);

    localStorage.setItem('events', JSON.stringify(events));

    //deleteAssignmentFromDB(screening);

    closeModal();
}

function resetInputFields(){
    eventTitleInput.value = '';
    addressInput.value = '';
    colorInput.value = '';
    descriptionInput.value = '';
    startTimeInput.value = null;
    endTimeInput.value = null;
}


function clickButtons(){

    document.getElementById('nextButton').addEventListener('click', () =>{
        nav++;
        load();
    })
    document.getElementById('previousButton').addEventListener('click', () =>{
        nav--;
        load();
    })

    document.getElementById('saveBtn').addEventListener('click', saveEvent);

    document.getElementById('cancelBtn').addEventListener('click',closeModal);

    document.getElementById('deleteBtn').addEventListener('click', deleteEvent);

    document.getElementById('updateBtn').addEventListener('click', openModalEditEvent);

    document.getElementById('closeBtn').addEventListener('click',closeModal);
}

function resetInputFields(){
    eventTitleInput.value = '';
    addressInput.value = '';
    colorInput.value = '';
    descriptionInput.value = '';
    startTimeInput.value = null;
    endTimeInput.value = null;
}

async function loadCalendar() {
    await loadAssignmentsFromDatabase();
    clickButtons();
}

loadCalendar();

