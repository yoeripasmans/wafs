# Single Page Pokemon Application

For this individual project I've made an single page web application which shows all the Pokemons of the first generation. The data gets called from the Pokéapi.

![Preview](/static/img/preview.png)

## Functionality

The main functionality of this app is to display all of the Pokemons and the details of them. Users can navigate trough them and search for a specific Pokemon by filtering on name. If there is an error or the api is offline an error screen will appear. Functionality I wish to add are:

- load in extra data from next generations of pokemons when the user scrolls to the bottom of the page.
- Add sorting functionality.
- Add favorite Pokemon to list.

## Actor Diagram

![Preview](/static/img/object.png)

## Interaction Flow Diagram

![Preview](/static/img/interaction.png)

## Background

I've started with an simple app setup. A router which toggles different sections of a static HTML page. After that I've started loading in the data from the PokeApi. From this Api call I received data which I convert to an object with 20 Pokemons, consisting the name of the Pokemon and an url of the detail data. I injected the data in the HTML with transparency template engine. When all of this was working I've started to work on linking the detail page of the Pokemons. I used a promise to fetch the api calls on the hash, so it gets the data when the user clicks on a Pokemon. Finally I added a filter functionality and added some data management by saving the data in local storage.

## Used libaries

- [routie](https://github.com/jgallen23/routie)
- [transparency](https://github.com/leonidas/transparency)

## Data

All of the data origins from the ['PokeApi'](https://pokeapi.co/).

I used a call for all of the Pokemon which look like this.
```javascript
"results": [{
	 "name": "pikachu",
	 "url": "http://pokeapi.co/api/v2/pokemon/1/"
 }]
 ```

 Likewise by the url of the results I made another call to get details of that concerned Pokemon which look like this.

```javascript
 "id": 1,
    "name": "stench",
    "is_main_series": true,
    "generation": {
        "name": "generation-iii",
        "url": "http://pokeapi.co/api/v2/generation/3/"
    },
    "names": [{
        "name": "Stench",
        "language": {
            "name": "en",
            "url": "http://pokeapi.co/api/v2/language/9/"
}
 ```

## License

[MIT](https://opensource.org/licenses/MIT) © Yoeri Pasmans
