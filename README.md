# WAFS

The course repo for 'Web App From Scratch'

## Voor en nadelen van JavaScript libraries/frameworks

### Frameworks

De belangrijkste voordelen van client-side javascript frameworks zijn dat je ermee een modulaire opbouw kan realiseren. Hierdoor wordt je applicatie onderhoudsvriendelijker. Ook hebben de bekende client-side frameworks een grote achterban en er zijn dan ook vele modules en add-ons beschikbaar om functionaliteit aan je front-end toe te voegen. Daarnaast kun je gemakkelijker een betere percieved performance na streven. Perceived performance refereert naar hoe snel de gebruiker denkt dat een website is. De essentiële elementen worden zo snel mogelijk geladen.

De nadelen zijn dat de gebruiker JavaScript altijd aan moet hebben staan, want anders werkt de applicatie niet meer en zie je een blanke pagina. Ook zijn client-side frameworks qua veiligheid niet altijd even ideaal, omdat er naast clien-side ook Server-side-authenticatie en -autorisatie nodig is om een ​​applicatie veilig te houden.

Bronnen:

- <https://www.tutorialspoint.com/angularjs/angularjs_overview.htm>
- <https://hsheikhm.wordpress.com/2016/02/07/js-frameworks-pros-cons/>

### Libraries

De voornaamste voordelen van javascript libaries zijn dat lastige code vereenvoudigd kan worden in bijvoorbeeld jQeury je hebt dan minder regels code nodig om hetzelfde te kunnen bereiken als in vanilla Javascript. Daarbij is het selecteren van DOM elementen en bind events simpeler gemaakt en wordt in veel browsers ondersteund.

De nadelen zijn echter dat jQuery niet effiecent kan zijn en voor perfomance issues kan zorgen. Als je bijvoorbeeld jQuery's `.each` gebruikt in plaats van een gewone `for loop` is dit onodig. Daarnaast is de code kwaliteit van jQuery erg laag, dit komt doordat jQuery een enorme community heeft en een lage leercurve. Hierdoor zijn er veel slecht geschreven open source plug-ins. Ten slotte is denk ik het grootse probleem met jQuery dat het een grote libary is waar je meestal maar weinig van gebruikt. Het is dan zonde om een hele libary in te laden. Dit zijn denk ik ook de redenen waarom we bij deze minor vanilla javascript gebruiken.

Bronnen:

- <https://softwareengineering.stackexchange.com/questions/166273/advantages-of-using-pure-javascript-over-jquery> -

## Voor en nadelen van client-side single page web apps

De voordelen van een client-side web app is voornamelijk de snelheid hiervan. De HTML/CSS en Javascript wordt eenmalig ingeladen en blijft in het geheugen zolang de applicatie loopt.

Ook is het developen makkelijker, je hoeft geen code te schrijven om pagina's vanaf een server te renderen en kan zo makkelijker beginnen, omdat je met één bestand werkt file://URI, zonder de server te gebruiken.

Ten slotte kan een SPA kan lokale opslag cachen. De applicatie verzendt slechts één verzoek, om daarna alle gegevens op te slaan. Waarna hij deze gegevens kan gebruiken om zelfs offline werken.

De nadelen zijn net als bij frameworks dat de gebruiker javascript aan moet hebben staan om de applicatie te kunnen gebruiken. Vergeleken met een 'standaard' applicatie is een SPA minder veilig. Dit komt doordat met Cross-Site Scripting (XSS), aanvallers client-side scripts in webapplicaties van andere gebruikers injecteren.

Bron:

- <https://neoteric.eu/single-page-application-vs-multiple-page-application>

## Best practices

- Geen gebruik van globale variables/objects
- Declareer variables boven aan de scope
- Gebruik korte, duidelijke en betekenisvolle namen in het Engels
- Werk in strict mode
- camelCase je code if(code != Constructor || CONSTANTS)
- Plaats extere scripts aan de onderkant van de pagina
- Indent je code.
- Plaats altijd comments bij je code.
