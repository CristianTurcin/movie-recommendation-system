export const applyFilters = (movies, filters) => {
    if (filters.ageRestriction) {
        movies = movies.filter(movie =>
            filters.ageRestriction === ">=17"
                ? ["R", "Not Rated", "TV-MA", "Approved"].includes(movie.rated)
                : ["G", "PG-13", "PG"].includes(movie.rated)
        );
    }

    if (filters.releaseYear) {
        movies = movies.filter(movie =>
            filters.releaseYear === ">=2000"
                ? movie.year >= 2000
                : movie.year < 2000
        );
    }

    if (filters.rating) {
        movies = movies.filter(movie =>
            filters.rating === ">=8"
                ? movie.imdbrating >= 8
                : movie.imdbrating >= 6
        );
    }

    if (filters.runtime) {
        movies = movies.filter(movie =>
            filters.runtime === ">=120"
                ? movie.runtime >= 120
                : movie.runtime < 120
        );
    }

    if (filters.language) {
        movies = movies.filter(movie =>
            movie.language && movie.language.includes(filters.language)
        );
    }

    return movies;
};
