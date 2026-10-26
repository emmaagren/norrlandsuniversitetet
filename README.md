# NorrlandsUniversitetet

NorrlandsUniversitetet är en responsiv webbapplikation utvecklad med Angular och TypeScript. Webbplatsen representerar ett fiktivt universitet där besökare kan utforska ett stort kursutbud och skapa ett personligt ramschema.

Projektet är en del av kursen Programmering i TypeScript vid Mittuniversitetet.

## Publicerad webbplats

https://norrlandsuniversitetet.netlify.app/

## Funktioner

### Startsida
- Presentation av det fiktiva universitetet.
- Information om kursutbud och studieplanering.
- Dynamisk statistik över antal kurser, ämnen och valda kurser.
- Navigation till kurskatalogen och det personliga ramschemat.

### Kurskatalog
- Visar kurser från en lokal JSON-fil.
- Sökning efter kurskod eller kursnamn.
- Filtrering efter ämne.
- Sortering efter kurskod, kursnamn, högskolepoäng eller ämne.
- Visar antal kurser som matchar aktuella sök- och filterval.
- Sidindelning med 25 kurser per sida.
- Möjlighet att lägga till kurser i det personliga ramschemat.
- Förhindrar att samma kurs läggs till flera gånger.

### Mitt ramschema
- Visar användarens valda kurser.
- Möjlighet att ta bort kurser.
- Automatisk beräkning av totalt antal högskolepoäng.
- Sparar kursval i webbläsarens localStorage så att de finns kvar efter omladdning.

## Tekniker

- Angular
- TypeScript
- HTML
- CSS
- Angular Router
- Angular Signals
- RxJS
- JSON
- localStorage
- Git och GitHub
- Netlify


## Installation och lokal körning

För att köra projektet lokalt krävs Node.js och npm.

1. Klona projektet:

   ```bash
   git clone https://github.com/emmaagren/norrlandsuniversitetet.git
   ```

2. Gå till projektmappen:

   ```bash
   cd norrlandsuniversitetet
   ```

3. Installera beroenden:

   ```bash
   npm install
   ```

4. Starta utvecklingsservern:

   ```bash
   npm start
   ```

5. Öppna `http://localhost:4200/` i webbläsaren.

## Produktionsbygge

Skapa en produktionsversion med:

```bash
npm run build
```

Projektet publiceras på Netlify med huvudbranchen `main`. Publiceringsmappen är:

`dist/norrlandsuniversitetet/browser`

## Datakälla

Kursinformationen hämtas från den lokala filen `miun_courses.json`, som innehåller kursdata från Mittuniversitetet för år 2023.

## Design och responsivitet

Webbplatsen har en naturinspirerad design med gröna färger, ljusa ytor och bildmaterial. Layouten är responsiv och anpassas efter olika skärmstorlekar.

Kurskatalogens tabell kan scrollas horisontellt på mindre skärmar.

## Skapad av 

Emma Ågren, student vid Mittuniversitetet.