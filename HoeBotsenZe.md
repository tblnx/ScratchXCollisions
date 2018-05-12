# Botsende Ballen
Je kan in `Scratch` eenvoudig botsingen simuleren tussen voorwerpen, alleen gebeurt dat niet volgens de wetten van de natuurkunde. Ik ga proberen of dat wel kan.

## Globale benadering

Ik heb wat zitten spelen, maar heb geen sluitende oplossing gevonden.
Ik denk dat het het beste op de volgende wijze moet:

- Gebruik `Broadcasts` of events als communicatie middel. Je kan wachten op events en op die manier taken synchroniseren.
- Maak kleine taken. Ik raakte al snel het overzicht kwijt door alles achter elkaar te plakken.

## Stappen

- Maak in het veld een taak die start op de groene vlag
  - Initialiseer daar de startsituatie voor elke sprite. Ik ga uit van circelvormige sprites
    - start snelheid
    - start plek
    - start richting
    - grootte
    - massa
- Geef de boodschap: Start. Elke sprite, elke taak binnen een sprite, luistert hiernaar en begint te draaien.
- Ik ga er nu vanuit dat elke sprite gaat bewegen volgens de startwaarden en na elke stap z'n startwaarden in de start variabelen zet
  - Daarna moet iemand kijken of er een botsing is:
    - iedere sprite doet dat voor alle volgende, dan is er maar 1 melding van een botsing
    - of
    - de centrale organisatie bekijkt alle sprites en kijkt of er botsingen zijn
    - zo nee dan niks
    - zo ja dan 
      - beide sprites waarschuwen dat de gegevens gebwijzigd zijn (stil zetten)
      - nieuwe waarden uitrekenen
      - die doorgeven
      - de sprites weer activeren

Op dit moment ga ik ervan uit dat de verwerking van botsingencentraal in TypeScript wordt gecodeerd. Het botsen zelf denk ik ook. Het kan in ScratchX maar dat is bij meer bollen een heel werk om alles af te testen en ook maar 1 test per botsing te krijgen.
