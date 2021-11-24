let nav = 0;  //Bliver brugt som varibael til at navigerer frem og tilbage i måneder. Hvis januar er 0, så er -1 = december og 1 = februar
let clicked = null; //Indikerer om statusen på en måned er trykket på eller ikke trykket på
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; //Et array med strings, kan ikke indeholde arrays, derfor bruges JSON til at parse


const calendar = document.getElementById('calendar');
const weekdays = ['Sunday','Thuesday','Wednesday','Thursday','Friday','Saturday','Monday'];

function load(){
    const dt = new Date();

    const date = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 0);
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

    for(let i = 1; i <= paddingDays + amountOfDaysInMonth; i++){
        const daySquare = document.createElement("div");
        daySquare.classList.add('day');

        if(i > paddingDays){
            daySquare.innerText = i - paddingDays;

            daySquare.addEventListener('click', () => console.log('click'));
        }else {
            daySquare.classList.add('padding');
        }


        document.getElementById("calendar").appendChild(daySquare);
    }
    console.log(amountOfDaysInMonth);
    console.log(dateString);
    console.log(paddingDays);
}

load();
