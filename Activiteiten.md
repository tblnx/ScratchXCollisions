# Activiteiten

Om een app te maken in `ScratchX` waarin voorwerpen op een juiste manier kunnen botsen wil ik gebruik maken van `TypeScript` ipv `JavaScript`.

Hiervoor heb je een `TypeScript` project nodig dat naar `JavaScript` wordt vertaald. De resulterende `JavaScript` bestanden moeten voldoen aan de eisen van `ScratchX` om gebruikt te kunnen worden. Zie hiervoor de `ScratchX` documentatie in <https://github.com/LLK/scratchx/wiki>.

Het eenvoudigste is om een `Scratch(X)` project te openen in `ScratchX` en dan lokaal de `JavaScript` extensie in te laden, zoals in het wiki document beschreven. Wanneer je de extensie aanpast in een editor, kan je eenvoudig de extensie herladen. Je kan de extensie op deze wijze niet toevoegen aan het project bestand.

In het volgende hoofdstuk ga ik wat meer in op de details.


## Het ontwikkelen van een applicatie in `ScratchX`

1. Start `ScratchX.
  - Geef in de brwoser : <http://scratchx.org/>
  - Hierna heb je keuze een URL of een bestand te kiezen
  - Kies je als bestand:
    - Een `.sb2` bestand. Dit is een gewoon `Scratch` bestand. Hier kan je een   `JavaScript` bestand inlezen. Dit gaat alleen in `ScratchX`.
    - Een `.sbx` bestand. Dit is een specifiek `ScratchX` bestand. Dit kan een `JavaScript` file bevatten waarin de toegevoegde code staat.
  - Een URL wijst naar een project of een `JavaScript` file
1. Afhankelijk van je keuze kan je nu het project spelen of een `JavaScript` extensie inlezen, via zowel een URL als vanuit een bestand. In het laatste geval ziet `ScratchX` wanneer het bestand is gewijzigd en kan je reloaden. Maken en debuggen doe je dus op die manier.
1. Het maken van een `.sbx` file is een verhaal apart, dat gaat via `GitHub`, waar je van `GitHub Pages` gebruik moet maken, Ja Ja, niet zo handig. Hierover gaat een volgend hoofdstuk.
1. Wanneer je een `.sbx` file inleest waar een extensie aan toegevoegd is, wordt het `JavaScript` bestand van het web gehaald en gebruik je dus niet een lokale variant. Deze verwijderen en vervangen door een lokale versie kan weer wel, maar de web versie wordt dan niet aangepast. Dit kan je controleren door in de ontwikkelmodus van Chrome te kijken naar de bestanden.
1. Wanneer je een `.sbx` start, kan ik niet met een URL de `JavaScript` file halen, wel een lokale file. Als je `JavaScript` file alleen haalt wordt `ScratchX` gestart met alleen de extensie.

## Maken van een `sbx` bestand

Om een `.sbx` file te maken moet je `JavaScript` extensie  in `gh-pages` staan op `GitHub`.

Voorbereidingen:

1. Maak een `GitHub` account en volg 
  <https://guides.github.com/activities/hello-world/>. Hierna heb je een idee
  wat je kan doen. Het branchen en mergen moet ik nog uitgebreid bekijken.
1. Maak daar een repository voor je project. Het kan via de website en via bv de client van `GitHub`, bv `MyRepo`
1. Ik maak altijd al lokaal een `git` project met `git init` of vanuit `VSCode`. Voeg hieraan de remote toe de je net gemaakt hebt met: `git remote add origin https://github.com/tblnx/MyRepo.git` en vervolgens `git push -u origin master`
1. Maah `GitHub pages` vlg <https://pages.github.com/>. Dit maakt o.a een lokale directory waar je de spullen inzet die je op je `gh-pages` kwijt wilt. Als je een project kwijt wilt moet je clonen, wat je daar bereikbaar wilt hebben en pushen. Mijn versie staat op MEGA.

Ik weet nu 2 manieren om een `.sbx` file te maken:

- zet een `JavaScript` extensie voor `ScratchX` in je `gh-pages`. Stel in `Repo` onder de naam `jsext.js`.
- start de volgende RL in je browser, of `Ctrl+click` vanuit hier: <http://scratchx.org/url=https://tblnx.github.io/Repo/jsext.js>. Dit opent `ScratchX` in je browser met de extensie.
- Als je dit project saved, krijg je een sbx file die de extensie bevat.

De Tweede manier is:

- Open een `.sb2` file met een bestaand project in `ScratchX`.
- Click `Load ExpirimentalExtension`
- selecteer de URL en geeft de url van de extensie in de `gh-pages`. Bv: <https://tblnx.github.io/Repo/jsext.js>