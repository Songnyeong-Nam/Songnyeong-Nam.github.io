const clockContainter =  document.querySelector('.clockContainer')
const today = document.querySelector('.date')
const clockTitle = clockContainter.querySelector('h1')


function getTime(){
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    clockTitle.innerText =`${hour <10? `0${hour}`: hour} : ${minute <10? `0${minute}` : minute} : ${second < 10? `0${second}` : second}`;
}

function getDay() {
    const date = new Date();
    const year =  date.getFullYear();
    const month =  date.getMonth() + 1;
    const day =  date.getDate();
    today.innerText = `${year} ${month <10? `0${month}`: month} ${day <10? `0${day}`: day}`
}

function init (){
    getDay();
    setInterval(getTime,1000);
}

init();