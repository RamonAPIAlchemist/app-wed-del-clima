function getWeather() {
    const apiKey = 'fedeb857f5d03651741fa7d63896f06e';
    const ciudad = document.getElementById('cityInput').value.trim(); 

    if (!ciudad) {
        alert('Por favor, ingrese el nombre de la ciudad.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');

            if (data.cod === 200) {
                const temperatura = Math.round(data.main.temp * 10) / 10;
                const maxTemp = data.main.temp_max;
                const minTemp = data.main.temp_min;
                const weatherDescription = data.weather[0].description;
                const iconCode = data.weather[0].icon;
                const weatherIconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
                const pronostico = generateWeatherForecast(temperatura);
                const latitud = data.coord.lat;
                const longitud = data.coord.lon;

                weatherInfo.innerHTML = `
                    <p><i class="fas fa-thermometer-half"></i> Temperatura actual en ${ciudad}: ${temperatura}°C</p>
                    <p><i class="fas fa-temperature-high"></i> Temperatura máxima: ${maxTemp}°C</p>
                    <p><i class="fas fa-temperature-low"></i> Temperatura mínima: ${minTemp}°C</p>
                    <p><i class="fas fa-cloud"></i> Descripción: ${weatherDescription}</p>
                    <img id="weatherIcon" src="${weatherIconUrl}" alt="Weather Icon">
                    <p><i class="fas fa-comment-alt"></i> Pronóstico: ${pronostico}</p>
                    <p><i class="fas fa-map-marker-alt"></i> Posición geográfica: Latitud ${latitud}, Longitud ${longitud}</p>
                `;

                weatherInfo.style.opacity = 1;
                animateWeatherInfo();
            } else {
                weatherInfo.innerHTML = 'Ciudad no encontrada';
                weatherInfo.style.opacity = 1;
            }
        })
        .catch(error => {
            console.error('Error al obtener el clima:', error);
            alert('Se produjo un error al obtener el clima. Por favor, inténtelo de nuevo más tarde.');
        });
}

function animateWeatherInfo() {
    const weatherInfo = document.getElementById('weatherInfo');
    const elements = weatherInfo.querySelectorAll('p, img');

    elements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(-20px)';
    });

    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });

    animateWeatherIcon();
}

function generateWeatherForecast(temperature) {
    if (temperature > 25) {
        return 'Hace calor. Prepárate para un día soleado.';
    } else if (temperature < 10) {
        return 'Hace frío. Lleva abrigos y mantente abrigado.';
    } else {
        return 'La temperatura es agradable. Disfruta tu día.';
    }
}

function animateWeatherIcon() {
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.style.transform = 'scale(1.2)';
    weatherIcon.style.transition = 'transform 0.5s';

    setTimeout(() => {
        weatherIcon.style.transform = 'scale(1)';
    }, 500);
}

document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

document.getElementById('cityInput').addEventListener('focus', function () {
    this.placeholder = '';
});

document.getElementById('cityInput').addEventListener('blur', function () {
    this.placeholder = 'Ingrese el nombre de la ciudad';
});
