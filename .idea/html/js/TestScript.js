let nav = 0;  //Bliver brugt som varibael til at navigerer frem og tilbage i måneder. Hvis januar er 0, så er -1 = december og 1 = februar
let clicked = null; //Indikerer om statusen på en måned er trykket på eller ikke trykket på
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; //Et array med strings, kan ikke indeholde arrays, derfor bruges JSON til at parse
//

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Monday','Thuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

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

    console.log('Days in current month = ' + amountOfDaysInMonth);
    console.log('last day of previous month = ' + dateString);
    console.log('Padding days of current month '+ `( ${dt.toLocaleDateString(undefined,{month: 'long'})} )  = `  + paddingDays);
    console.log('')
    console.log('')
    console.log('')

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

        console.log(i - paddingDays + ' ' + day + ' ' + nav)
    }


}
function closeModal(){
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();

}

function saveEvent(){
    if(eventTitleInput.value){
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
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
    closeModal();
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

clickButtons();
load();
