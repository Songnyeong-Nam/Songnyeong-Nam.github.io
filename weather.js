const weather = document.getElementById('jsWeather')

const API_KEY = `5c55925088ceb211dd0f7a0a014362ea`
const COORDS = 'coords'

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    localStorage.setItem(COORDS, JSON.stringify({
        latitude,
        longitude,
    }))
    getWeather(latitude, longitude)
}

function handleGeoFail() {
    console.log('fail to get location')
}

function askforCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail)
}

function getWeather(lat, long) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    ).then((res) => {
        return res.json();
    }).then((json) => {
        console.log(json)
        const sky = json.weather[0].description
        paintSkyIcon(sky)
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}°C, ${place}`
    }).catch(err => {
        console.log(err)
        weather.innerText = `No Internet Connection`
    })
}

function paintSkyIcon(sky) {
    const skyIcon = document.createElement('img')
    skyIcon.classList.add('icon')
    weather.before(skyIcon)
    const description = findIcon(sky)
    skyIcon.src = `http://openweathermap.org/img/wn/${description}@2x.png`
}
function findIcon(sky) {
    switch (sky) {
        case 'clear sky': return '01d'
        case 'few clouds': return '02d'
        case 'scattered clouds': return '03d'
        case 'broken clouds': return '04d'
        case 'shower rain': return '09d'
        case 'rain': return '10d'
        case 'thunderstorm': return '11d'
        case 'snow': return '13d'
        case 'mist': return '50d'
        
        default: null;
    }
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS)
    const parsedCoords = JSON.parse(loadedCoords)
    if (loadedCoords !== null) {
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    } else {
        askforCoords();

    }
}


function init() {
    loadCoords();
}

init();