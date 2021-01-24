const nameContainer = document.querySelector('.form')
const nameForm = nameContainer.querySelector('input')
const greeting =  document.getElementById('jsGreetings')
const SHOW_CN = 'showing'
const NONE = 'none'
const GREETING_LIST = ['GOOD MORNING','GOOD AFTERNOON', 'GOOD EVENING']

const currentUser = localStorage.getItem('user')

function askName(){
    nameContainer.classList.add(SHOW_CN)
    nameContainer.addEventListener("submit", handleSubmit);
}

function handleSubmit(e){
    e.preventDefault();
    const currentValue = nameForm.value;
    greetUser(currentValue)
    saveName(currentValue);
    nameContainer.classList.remove(SHOW_CN);
}

function saveName(name){
    localStorage.setItem("user", name);
}

function greetUser(name){
    const greetbyTime = getGreeting();
    greeting.classList.add(SHOW_CN)
    greeting.innerText = `${greetbyTime} ${name} !`
}

function getGreeting(){
    const time = new Date().getHours();
    console.log(time)
    if(time>5 && time <= 11){
        return GREETING_LIST[0]
    } else if(time >= 12 && time <= 19){
        return GREETING_LIST[1]
    } else{
        return GREETING_LIST[2]
    }
}

function init(){
    if(currentUser !== null){
        greetUser(currentUser);
    }else {
        askName();
    }
}

init();