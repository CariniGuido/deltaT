window.addEventListener('load', () => {
    let longitud, latitud;
    const infoActual = document.querySelector('.informacion-actual');
    const nombreCiudad = document.querySelector('.nombre-ciudad');
    const temperaturaActual = document.querySelector('.temperatura');
    const descripcionActual = document.querySelector('.descripcion');
    const iconoActual = document.querySelector('.icono');
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        longitud = position.coords.longitude;
        latitud = position.coords.latitude;
        const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitud}&lon=${longitud}&exclude=minutely,hourly&units=metric&lang=es&appid=1421faa6896fd18ab715b2a75d3f01a1`;
  
        fetch(api)
          .then(response => response.json())
          .then(data => {
            // Obtener los datos del clima actual
            const ciudad = data.timezone.split('/')[1].replace('_', ' ');
            const temperatura = Math.round(data.current.temp);
            const icono = data.current.weather[0].icon;
            const descripcion = data.current.weather[0].description;
  
            // Actualizar los valores de los campos de información del clima actual
            nombreCiudad.innerHTML = ciudad;
            temperaturaActual.innerHTML = `${temperatura}&deg;C`;
            descripcionActual.innerHTML = descripcion;
            iconoActual.src = `https://openweathermap.org/img/wn/${icono}.png`;
  
            // Obtener los datos de pronóstico extendido de cada día
            for (let i = 0; i < 5; i++) {
              const fecha = new Date(data.daily[i + 1].dt * 1000).toLocaleDateString('es-ES', { weekday: 'short' });
              const temperatura = Math.round(data.daily[i + 1].temp.day);
              const icono = data.daily[i + 1].weather[0].icon;
              const descripcion = data.daily[i + 1].weather[0].description;
              const dias = [
                document.getElementById('dia1'),
                document.getElementById('dia2'),
                document.getElementById('dia3'),
                document.getElementById('dia4'),
                document.getElementById('dia5')
              ];
  
              // Actualizar los valores de los campos de información correspondientes a cada día
              dias[i].querySelector('.fecha').innerHTML = fecha;
              dias[i].querySelector('.temperatura').innerHTML = `${temperatura}&deg;C`;
              dias[i].querySelector('.descripcion').innerHTML = descripcion;
  
              // Actualizar los iconos del clima correspondientes a cada día
              dias[i].querySelector('.icono-dia' + (i + 1)).src = `https://openweathermap.org/img/wn/${icono}.png`;
            }
          })
          .catch(error => console.error(error));
     
  
      });
    }
  });
  