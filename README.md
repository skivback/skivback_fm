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
