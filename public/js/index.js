window.addEventListener('load', () => {

  const weatherForm = document.querySelector('.top-box-search-form');
  const search = document.querySelector('.top-box-search-form-input');
  const messageOne = document.querySelector('#bottom-box-each-box-forecast-1');
  const temperature = document.querySelector('.bottom-box-each-box-temperature');
  const time = document.querySelector('.top-box-time-date');
  const description = document.querySelector('.top-box-search-description');
  const map = document.getElementById('map');
  const wind_speed = document.querySelector('.bottom-box-each-attribute-wind-value');
  const humidity = document.querySelector('.bottom-box-each-attribute-drop-value');
  const precip = document.querySelector('.bottom-box-each-attribute-rain-value');
  const feelslike = document.querySelector('.bottom-box-each-box-feelslike');
  const input = document.querySelector('.top-box-search-form-input');
  var wind_img = document.getElementById('wind-img');
  var rain_img = document.getElementById('rain-img');
  var humidity_img = document.getElementById('humidity-img');


  input.addEventListener('input', () => {
    input.style.width = (input.value.length + 2) + "ch";
  });

  input.style.width = "4ch";

  weatherForm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const location = search.value;

      messageOne.textContent = 'Loading...';

      fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
          if (data.error) {
            console.log(data.error);
            messageOne.textContent = data.error;
          } else {
            console.log('Location: ' + data.location);
            messageOne.textContent = data.location;
            animateTemperature(0, data.temperature);
            animateFeelslike(0, data.feelslike);
            time.textContent = data.time;
            description.textContent = ' it is ' + data.description + '.';
            map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${data.longtitude-0.01}%2C${data.latitude-0.01}%2C${data.longtitude+0.01}%2C${data.latitude+0.01}&layer=mapnik&marker=${data.latitude}%2C${data.longtitude}`;
            wind_speed.textContent = data.attributes.wind  + ' km/h';
            precip.textContent = data.attributes.precip + ' mm';
            humidity.textContent = data.attributes.humidity + ' %';
            changeTheme(data.is_day)

            wind_img.style.visibility = 'visible';
            rain_img.style.visibility = 'visible';
            humidity_img.style.visibility = 'visible';
          }
        });
      });
    }
  });


  function animateTemperature(start, end) {
    const duration = 900; 
    const startTime = performance.now();

    function updateTemperature(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentTemperature = Math.round(start + (end - start) * progress);
      temperature.textContent = currentTemperature + '°';

      if (progress < 1) {
        requestAnimationFrame(updateTemperature);
      }
    }

    requestAnimationFrame(updateTemperature);
  }

  function animateFeelslike(start, end) {
    const duration = 900; 
    const startTime = performance.now();

    function updateFeelslike(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentFeelslike = Math.round(start + (end - start) * progress);
      feelslike.textContent = currentFeelslike + '°';

      if (progress < 1) {
        requestAnimationFrame(updateFeelslike);
      }
    }

    requestAnimationFrame(updateFeelslike);
  }

  let hasThemeChanged = false;

  function changeTheme(day_or_night) {
    var moon = document.querySelector('#moon');
    var sun = document.querySelector('#sun');
    var input_box = document.querySelector('.top-box-search-form-input');
    var temperature = document.querySelector('.bottom-box-each-box-temperature');
    var location_color = document.querySelector('#bottom-box-each-box-forecast-1')
    var time_color = document.querySelector('.top-box-time-date')


    if (hasThemeChanged) {
        moon.style.animation = 'none';
        sun.style.animation = 'none';
    }

    if(day_or_night === 'no'){
        document.body.style.backgroundColor = '#1b0e0e';
        input_box.style.color = 'white';
        temperature.style.color = 'white';
        location_color.style.color = 'white';
        time_color.style.color = 'white';
        moon.style.visibility = 'visible';
        sun.style.visibility = 'visible';

        if (hasThemeChanged) {
          moon.style.animation = 'slidedown 3s forwards';
          sun.style.animation = 'slideup 3s forwards';     
        } else {
          moon.style.animation = 'slidedown 3s forwards';
          sun.style.visibility = 'hidden';
        }

    } else {
        document.body.style.backgroundColor = 'white';
        input_box.style.color = 'black';
        temperature.style.color = 'black';
        location_color.style.color = 'black';
        time_color.style.color = 'black';
        sun.style.visibility = 'visible';
        moon.style.visibility = 'visible'; 

        if (hasThemeChanged) { 
            sun.style.animation = 'slidedown 3s forwards';
            moon.style.animation = 'slideup 3s forwards';    
        } else {
          sun.style.animation = 'slidedown 3s forwards';
          moon.style.visibility = 'hidden'; 
        }
    }

    hasThemeChanged = true
}


});
