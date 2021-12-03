let nav = 0;  //Bliver brugt som varibael til at navigerer frem og tilbage i måneder. Hvis januar er 0, så er -1 = december og 1 = februar
let clicked = null; //Indikerer om statusen på en måned er trykket på eller ikke trykket på
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; //Et array med strings, kan ikke indeholde arrays, derfor bruges JSON til at parse
//

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');

const eventTitleInput = document.getElementById('eventTitleInput');
const addressInput = document.getElementById('addressInput');
const startTimeInput = document.getElementById('startTimeInput');
const endTimeInput = document.getElementById('endTimeInput');
const colorInput = document.getElementById('colorInput');
const descriptionInput = document.getElementById('descriptionInput');

const weekdays = ['Monday','Thuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

async function loadAssignmentsFromDatabase() {
    const urlAssignment = "http://localhost:8080/assignment";

    await fetch(urlAssignment).then(response => response.json())
    .then(assigments =>{
        assigments.forEach(assignment => {
            const dateOfAssignment = new Date(assignment.assignmentStartDateTime);

            const day = dateOfAssignment.getDate();
            const month = dateOfAssignment.getMonth()+1;
            const year = dateOfAssignment.getFullYear();

            const dateString = `${month}/${day}/${year}`;

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
            localStorage.setItem('events', JSON.stringify(events));
        })
    });
    await load();
}

function openModal(date){
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay){
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    }else{
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
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

            if (eventForDay){
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener('click', () => openModal(dayString));
        }else {
            daySquare.classList.add('padding');
        }


        calendar.appendChild(daySquare);

    }
}
function closeModal(){
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    clicked = null;
    load();

}

function saveEvent(){
    if(eventTitleInput.value){
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
            address: addressInput.value,
            color: colorInput.value,
            description: descriptionInput.value,
            startTime: startTimeInput.value,
            endTime: endTimeInput.value,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    }else{
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent(){
    events = events.filter(e => e.date !== clicked);
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

    document.getElementById('closeBtn').addEventListener('click',closeModal);
}
async function loadCalendar() {
    await loadAssignmentsFromDatabase();
    clickButtons();
}
loadCalendar();

