// script.js
const API_KEY = '9e7348ecf38498da7345790e7542d41d'; // Your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const endpoints = {
    popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
    upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
};

document.addEventListener('DOMContentLoaded', () => {
    fetchMovies(endpoints.popular, 'popular');
    fetchMovies(endpoints.topRated, 'top-rated');
    fetchMovies(endpoints.upcoming, 'upcoming');
});

async function fetchMovies(url, sectionId) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results, sectionId);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayMovies(movies, sectionId) {
    const container = document.getElementById(sectionId);
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieTile = document.createElement('div');
        movieTile.classList.add('movie-tile');
        
        const movieImage = movie.poster_path ? `${IMG_URL}${movie.poster_path}` : 'placeholder.jpg';
        
        movieTile.innerHTML = `
            <img src="${movieImage}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${new Date(movie.release_date).getFullYear()}</p>
                <p>${movie.overview}</p>
                <p>${movie.genre_ids.join(', ')}</p>
            </div>
        `;
        container.appendChild(movieTile);
    });
}
