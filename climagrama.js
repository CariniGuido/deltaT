const clima = {
    temperaturasMedias: [],
    precipitaciones: [],
    humedadesRelativasMedias: [],
};

for (let i = 0; i < 12; i++) {
    clima.temperaturasMedias.push(0);
    clima.precipitaciones.push(0);
    clima.humedadesRelativasMedias.push(0);
}

function actualizarMediciones() {
    // Obtener la ubicación del usuario
    navigator.geolocation.getCurrentPosition((posicion) => {
        const latitud = posicion.coords.latitude;
        const longitud = posicion.coords.longitude;
        
        // Obtener los datos meteorológicos actuales
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitud}&lon=${longitud}&exclude=minutely,daily&units=metric&appid=1421faa6896fd18ab715b2a75d3f01a1`
        )
            .then((response) => response.json())
            .then((data) => {
                // Recorrer los datos de cada hora
                data.hourly.forEach((hourlyData) => {
                    const mes = new Date(hourlyData.dt * 1000).getMonth();
                    clima.temperaturasMedias[mes] += hourlyData.temp;
                    clima.humedadesRelativasMedias[mes] += hourlyData.humidity;
                    clima.precipitaciones[mes] += hourlyData.pop;
                });
            })
            .then(() => {
                // Calcular la temperatura media mensual
                clima.temperaturasMedias = clima.temperaturasMedias.map(
                    (temp) => temp / 30
                );

                // Calcular la humedad relativa media mensual
                clima.humedadesRelativasMedias = clima.humedadesRelativasMedias.map(
                    (humedad) => humedad / 30
                );

                const ctx = document.getElementById("climograma").getContext("2d");

                const climograma = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: [
                            "Ene",
                            "Feb",
                            "Mar",
                            "Abr",
                            "May",
                            "Jun",
                            "Jul",
                            "Ago",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dic",
                        ],
                        datasets: [
                            {
                                label: "Precipitaciones (mm)",
                                yAxisID: "y-axis-1",
                                data: clima.precipitaciones,
                                borderColor: "blue",
                                backgroundColor: "blue",
                                borderWidth: 1,
                                fill: false,
                            },
                            {
                                label: "Temperatura (°C)",
                                yAxisID: "yaxis-2",
                                data: clima.temperaturasMedias,
                                borderColor: "red",
                                backgroundColor: "red",
                                borderWidth: 1,
                                fill: false,
                            },
                            {
                                label: "Humedad relativa (%)",
                                yAxisID: "y-axis-3",
                                data: clima.humedadesRelativasMedias,
                                borderColor: "green",
                                backgroundColor: "green",
                                borderWidth: 1,
                                fill: false,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Meses'
                                }
                            }],
                            yAxes: [
                                {
                                    id: "y-axis-1",
                                    type: "linear",
                                    position: "left",
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Precipitaciones (mm)",
                                    },
                                },
                                {
                                    id: "y-axis-2",
                                    type: "linear",
                                    position: "right",
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Temperatura (°C)",
                                    },
                                },
                                {
                                    id: "y-axis-3",
                                    type: "linear",
                                    position: "right",
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Humedad relativa (%)",
                                    },
                                },
                            ],
                        },
                    },
                });
            })




    });
}

