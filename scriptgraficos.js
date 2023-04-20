// Función para obtener y mostrar los datos de la API
function actualizarMediciones() {
    // Obtener la ubicación del usuario
    navigator.geolocation.getCurrentPosition(posicion => {
      const latitud = posicion.coords.latitude;
      const longitud = posicion.coords.longitude;
      let temperaturas = [];
      let humedades = [];
      let deltas = [];
  
      // Función para mostrar los datos obtenidos de la API
      function mostrarDatos() {
        // Obtener los datos meteorológicos actuales
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitud}&lon=${longitud}&exclude=minutely,hourly,daily&units=metric&appid=1421faa6896fd18ab715b2a75d3f01a1`)
          .then(response => response.json())
          .then(data => {
            // Obtener los valores de temperatura, viento y humedad
            const temperaturaActual = data.current.temp;
            const vientoActual = data.current.wind_speed;
            const direccionVientoGrados = data.current.wind_deg;
  
            // Actualizar los elementos HTML con los datos obtenidos
            document.getElementById("temperatura").innerHTML = `${temperaturaActual}°C`;
            document.getElementById("viento").innerHTML = `${vientoActual} km/h`;
  
            // Obtener la dirección del viento
            const direccionViento = obtenerDireccionViento(direccionVientoGrados);
  
            // Actualizar la imagen con la dirección del viento
            document.getElementById("imagen").src = `https://www.htmlcsscolor.com/preview/gallery/${direccionViento.toLowerCase()}.png`;
          });
      }
  
      // Función para obtener la dirección del viento
      function obtenerDireccionViento(grados) {
        const direcciones = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const indice = Math.floor(((grados + 22.5) % 360) / 45);
        return direcciones[indice];
      }
  
      // Llamar a la función para mostrar los datos al cargar la página
      mostrarDatos();
    });
  }
  