class Pelicula {
    constructor(){
        this.name = name;
        this.director = director;
        this.image =image;
        this.genre = genre;

    }
}

fetch("./api/movies.json")
.then(response => response.json())
