# Skivback FM

<img width="333" height="222" alt="Skivback FM i landscape-läge" src="https://github.com/user-attachments/assets/74eeadb5-ecf5-435f-b0df-aa32ce94a351" />

- Kör appen här: https://skivback.github.io/skivback_fm/
- En statisk, mobilanpassad och GTA-inspirerad radiospelare som använder YouTube IFrame Player API för ljuduppspelning.
- Radiostationernas logotyper ligger lokalt i `assets/logos/` och hämtas inte från externa bildservrar.
- En slumpmässig radiostation och position i sändningen väljs när appen startar.

## Publicera med GitHub Pages

Ladda upp innehållet i repositoryts rot och välj `main` samt `/ (root)` under **Settings → Pages**.

## Lägg till på iPhone-hemskärmen

Öppna sidan i Safari, tryck på **Dela** och välj **Lägg till på hemskärmen**. När appen startas från ikonen öppnas den utan Safaris adressfält, med mörk bakgrund och ett statusfält som smälter in i designen.


## Radiobeteende

- Ingen tidsindikator eller spolningslist visas.
- Varje vald station startar på en slumpmässig position.
- När en station når slutet börjar samma station om från början.

## Kontroller

- Högtalarikonen och volymreglaget visas som en sammanhållen kontroll.
- ⏪ hoppar fem minuter bakåt i den aktuella stationen.
- ⏩ hoppar fem minuter framåt i den aktuella stationen.
- Station väljs från stationslistan.


## v5.4
- Nya rena dubbla chevrons för bakåt/framåt utan synlig tidsförklaring.
- Knapparna hoppar fortsatt fem minuter i aktuell station.
- Kortare, sammanhållen volymkontroll.
- Mer balanserad kontrollrad och diskretare Play-glow.


## v5.4
- Egna inline-SVG-pilar för bakåt/framåt, utan emoji eller webbläsarens native mediaikoner.
- Cache-busting för CSS och JavaScript.

## Dela en station

Dela-knappen skapar nu en direktlänk till den valda stationen, till exempel:

```text
https://skivback.github.io/skivback_fm/?station=blue-ark
```

När länken öppnas väljs stationen automatiskt. Uppspelningen startar fortfarande på en slumpmässig plats efter att användaren tryckt på Play.
