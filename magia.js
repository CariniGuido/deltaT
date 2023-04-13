function crearRayitasTiempo() {
    var rayitasTiempo = document.querySelector('.rayitas-tiempo');
    var angulo = 0;
    var incrementoAngulo = 30; // 360 grados dividido en 12 rayitas
    for (var i = 0; i < 12; i++) {
        var rayita = document.createElement('div');
        rayita.classList.add('rayita-tiempo');
        rayita.style.transform = 'rotate(' + angulo + 'deg)';
        angulo += incrementoAngulo;
        rayitasTiempo.appendChild(rayita);
    }
}

crearRayitasTiempo();

// Inicializar los diales
function obtenerDireccionBrujula(angulo) {
    const direccion = [
        "Norte", "Este", "Sur", "Oeste"
    ];
    const indice = Math.round((angulo % 360) / 90);
    return direccion[indice];
}
var temperaturaGauge = new JustGage({
    id: "temperatura-gauge",
    value: 0,
    min: -20,
    max: 40,
    label: "Temperatura (°C)"
});

var vientoGauge = new JustGage({
    id: "viento-gauge",
    value: 0,
    min: 0,
    max: 100,
    label: "Velocidad del viento (km/h)"
});

var humedadGauge = new JustGage({
    id: "humedad-gauge",
    value: 0,
    min: 0,
    max: 100,
    label: "Humedad (%)"
});

// Función para actualizar las mediciones
function actualizarMediciones() {
    // Obtener la ubicación del usuario
    navigator.geolocation.getCurrentPosition(posicion => {
        const latitud = posicion.coords.latitude;
        const longitud = posicion.coords.longitude;

        // Obtener los datos meteorológicos actuales
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitud}&lon=${longitud}&exclude=minutely,hourly,daily&units=metric&appid=1421faa6896fd18ab715b2a75d3f01a1`)

            // Actualizar los valores de los diales con las mediciones
            .then(response => response.json())
            .then(data => {
                // Obtener los valores de temperatura, viento y humedad
                const temperaturaActual = data.current.temp;
                const vientoActual = data.current.wind_speed;
                const humedadActual = data.current.humidity;
                // const deltaT = (temperaturaActual - 10) / 10 + (100 - humedadActual) / 10 + vientoActual / 10;
                const direccionVientoGrados = data.current.wind_deg;



                const direccionVientoTexto = document.getElementById("direccion-viento");
                direccionVientoTexto.textContent = obtenerDireccionBrujula(direccionVientoGrados);
                // Calcular la dirección de la brújula correspondiente
               
                // Actualizar los valores de los diales con las mediciones
                temperaturaGauge.refresh(temperaturaActual);
                vientoGauge.refresh(vientoActual);
                humedadGauge.refresh(humedadActual);
                const agujaViento = document.getElementById("aguja-viento");
                agujaViento.style.transform = `rotate(${360 - direccionVientoGrados}deg)`;
            })
            .catch(error => {
                console.error("Error al obtener los datos meteorológicos", error);
            });
    });
}
setTimeout(actualizarMediciones, 0);
setInterval(actualizarMediciones, 3600000);