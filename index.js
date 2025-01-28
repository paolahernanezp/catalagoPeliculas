// Guardamos las películas aquí
let movies = [];

// Función para cargar las películas desde el archivo JSON
function loadMovies() {
    let request = new XMLHttpRequest();  // Creamos una solicitud
    request.open('GET', 'api/movies.json', true);  // Indicamos la ruta del archivo JSON
    request.onload = function() {  // Cuando la respuesta esté lista, ejecutamos esta función
        if (request.status === 200) {  // Si la respuesta es exitosa (200 es un código de éxito)
            movies = JSON.parse(request.responseText);  // Convertimos el JSON en un arreglo de objetos
            renderMovies(movies);  // Llamamos a la función que dibuja las películas en pantalla
        } else {
            console.error('Error al cargar las películas');
        }
    };
    request.onerror = function() {
        console.error('Error en la solicitud');
    };
    request.send();  // Enviamos la solicitud
}

// Función para mostrar las películas en la página
function renderMovies(movies) {
    let container = document.getElementById('movies-container');
    container.innerHTML = '';  // Limpiamos el contenedor antes de añadir nuevas películas

    movies.forEach(function(movie) {
        // Creamos un div para cada película
        let movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.dataset.id = movie.id;  // Usamos 'data-id' para almacenar el ID de la película

        // Añadimos la imagen y el título de la película al div
        movieElement.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3 class="movie-title">${movie.title}</h3>
        `;

        // Agregamos el div de la película al contenedor
        container.appendChild(movieElement);
    });
}

// Función para abrir un modal con los detalles de la película
function openModal(movie) {
    let modal = document.getElementById('movie-modal');
    let title = document.getElementById('modal-title');
    let image = document.getElementById('modal-image');
    let genre = document.getElementById('modal-genre');
    let year = document.getElementById('modal-year');
    let description = document.getElementById('modal-description');
    let rating = document.getElementById('modal-rating');
    let director = document.getElementById('modal-director');

    title.textContent = movie.title;
    image.src = movie.image;
    genre.textContent = 'Género: ' + movie.genre;
    year.textContent = 'Año: ' + movie.year;
    description.textContent = 'Descripción: ' + movie.description;
    rating.textContent = 'Rating: ' + movie.rating;
    director.textContent = 'Director: ' + movie.director;

    modal.style.display = 'block';  // Mostramos el modal
}

// Función para cerrar el modal
function closeModal() {
    let modal = document.getElementById('movie-modal');
    modal.style.display = 'none';  // Ocultamos el modal
}

// Función para cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    let modal = document.getElementById('movie-modal');
    if (event.target === modal) {
        closeModal();
    }
};

// Cerrar el modal cuando se hace clic en el botón de cerrar
document.querySelector('.close-btn').addEventListener('click', closeModal);

// Función que se ejecuta cuando la página se ha cargado
document.addEventListener('DOMContentLoaded', function() {
    loadMovies();  // Cargar las películas al iniciar

    // Event listener para cuando se hace clic en una película
    let moviesContainer = document.getElementById('movies-container');
    moviesContainer.addEventListener('click', function(event) {
        let movieElement = event.target.closest('.movie');  // Detectamos cuál película fue clickeada
        if (movieElement) {
            let movieId = movieElement.dataset.id;  // Obtenemos el ID de la película
            let movie = movies.find(function(m) { return m.id == movieId; });  // Encontramos la película
            openModal(movie);  // Mostramos los detalles de la película
        }
    });

    // Buscador de películas
    let searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function(event) {
        let searchTerm = event.target.value.toLowerCase();  // Convertimos el texto a minúsculas
        let filteredMovies = movies.filter(function(movie) {
            return movie.title.toLowerCase().includes(searchTerm);  // Filtramos las películas por título
        });
        renderMovies(filteredMovies);  // Volvemos a renderizar las películas filtradas
    });
});

