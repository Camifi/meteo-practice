// Función para buscar información del clima de una ciudad específica.
function searchCity(city) {
  let apiKey = "877d4fc11aff6o50fe6t79a385a9b4ef";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`; // Construye la URL para la solicitud a la API incluyendo la ciudad y tu clave de API.
  axios.get(apiUrl).then(refreshWeather); // Utiliza axios para hacer una solicitud GET a la URL y luego pasa la respuesta a la función refreshWeather.
}

// Función para actualizar el HTML con los datos del clima obtenidos.
function refreshWeather(response) {
  // Selecciona elementos del DOM y los asigna a variables para un fácil acceso.
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  // Extrae los datos necesarios de la respuesta de la API.
  let data = response.data;
  let date = new Date(data.time * 1000); // Convierte el timestamp UNIX a un objeto Date de JavaScript.

  // Actualiza los elementos HTML con los datos obtenidos de la API.
  cityElement.innerHTML = data.city;
  descriptionElement.innerHTML = data.condition.description;
  humidityElement.innerHTML = `Humidity: ${data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `Wind: ${data.wind.speed}km/h`;
  temperatureElement.innerHTML = `${Math.round(data.temperature.current)}°C`;
  iconElement.innerHTML = `<img src="${data.condition.icon_url}" alt="Weather icon" class="weather-icon" />`;
  timeElement.innerHTML = formatDate(date);
}

// Función para formatear una fecha/hora en un formato legible.
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, "0"); // Asegura que el minuto tenga siempre dos dígitos.
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()]; // Obtiene el nombre del día de la semana.
  return `${day} ${hours}:${minutes}`; // Devuelve la fecha formateada.
}

// Función para manejar el envío del formulario de búsqueda.
function handleSearchSubmit(event) {
  event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional, recargando la página.
  let searchInput = document.querySelector("#search-form-input"); // Obtiene el valor del campo de búsqueda.
  searchCity(searchInput.value); // Llama a searchCity con el valor del campo de búsqueda.
}

// Selecciona el formulario de búsqueda y le añade un event listener para el evento "submit".
document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearchSubmit);

// Llamada inicial a la función searchCity para cargar datos de una ciudad por defecto (Asunción).
searchCity("Asuncion");
