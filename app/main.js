const openWeatherAPIKey = '21dc93ea709e8255e210065e20b60ef5'


let getWeather = async (cityState) => {
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityState[0]},${cityState[1]},US&appid=${openWeatherAPIKey}`, {
        method: "POST"
}) 
    const data = await result.json()
    console.log(data)
    if (data.cod == '404') {return 0}
    else {return data}
    
}

let kelvinToFair = (temp) => {
    return (temp - 273.15) * 9/5 + 32
}

let generateStats = async (cityState) => {
    let weather = await getWeather(cityState)
    if (weather == 0) {
        return 0
    } else {
        // console.log(weather)
        let city = weather.name
        let current = kelvinToFair(weather.main['temp']).toFixed(1) +"F"
        let high = kelvinToFair(weather.main['temp_max']).toFixed(1) +"F"
        let low = kelvinToFair(weather.main['temp_min']).toFixed(1) +"F"
        let forecast = weather.weather[0].main
        let humidity = weather.main.humidity + "%"
        let stats = [city, high, low, forecast, humidity, current]
        // console.log(stats)
        return stats
    }
    
}

const statsDisplay = (stats) => {
    if (stats == 0) {
        const html = 
        `<div class="row d-flex flex-column justify-content-evenly">
            <div class="card text-bg-danger mb-3" style="max-width: 18rem;">
                <div class="card-header">That is not a valid city/state combination!</div>
                <div class="card-body">
                    <p class="card-text">Please try again</p>
                </div>
            </div>
        </div>`
        document.querySelector('.weather').insertAdjacentHTML('beforeend', html)
        
    } else {
        const html = 
        `<div id=${stats[0]} class="row d-flex flex-column justify-content-evenly">
            <div class="card text-bg-danger mb-3" style="max-width: 18rem;">
                <div class="card-header">Here's the weather for ${stats[0]}!</div>
                <div class="card-body">
                    <p class="card-text">Current temp: ${stats[5]}</p>
                </div>
            </div>
            <div class="card text-bg-warning mb-3" style="max-width: 18rem;">
                <div class="card-header">Today's High is going to be</div>
                <div class="card-body">
                    <p class="card-text">${stats[1]}</p>
                </div>
            </div>
            <div class="card text-bg-success mb-3" style="max-width: 18rem;">
                <div class="card-header">Today's Low is going to be</div>
                <div class="card-body">
                    <p class="card-text">${stats[2]}</p>
                </div>
            </div>
            <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
                <div class="card-header">Today's Forecast</div>
                <div class="card-body">
                    <p class="card-text">${stats[3]}</p>
                </div>
            </div>
            <div class="card text-bg-info mb-3" style="max-width: 18rem;">
                <div class="card-header">Today's Humidity</div>
                <div class="card-body">
                    <p class="card-text">${stats[4]}</p>
                </div>
            </div>
        </div>`
        document.querySelector('.weather').insertAdjacentHTML('beforeend', html)
    }
    
}

const clearData = () => {
    document.querySelector('.weather').innerHTML = ''
}

let showStats = async () => {
    clearData()
    cityState = grabCityState()
    stats = await generateStats(cityState)
    statsDisplay(stats)
}

function grabCityState () {
    let cityState = ['city','state']
    cityState[0] = document.getElementById('city').innerHTML
    cityState[1] = document.getElementById('state').value
    return cityState
}