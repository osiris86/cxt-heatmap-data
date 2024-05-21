# Convention-X-Treme 26: Jäger des verlorenen Internets

Die [Convention-X-Treme](https://convention-x-treme) fand in der 26. Ausgabe in der Altenbürghalle in Karlsdorf Neuthard statt. Die LAN Party begann am 17.05.2024 um 18:00 Uhr und endete am 19.05.2024 um 12:00 Uhr. Leider konnte die Datenerfassung erst ab Samstagnachmittag beginnen.

Insgesamt wurden 15 Sensoren an Gäste verteilt von denen 13 Sensoren in Betrieb waren und Temperaturdaten übermittelt haben.

Die Daten stehen in unterschiedlichen Formaten zur Verfügung:

- [CSV](https://github.com/osiris86/cxt-heatmap-data/blob/CXT26/data.csv)
- [InfluxDB](https://github.com/osiris86/cxt-heatmap-data/blob/CXT26/originalDb.zip)
- [PNGs](https://github.com/osiris86/cxt-heatmap-data/tree/CXT26/temperatureMaps)

## Einige Auswertungen

### Temperaturentwicklung

<p align="center">
<img src="img/animation.gif" alt="Temperaturentwicklung" width="100%" />
</p>

### Temperaturverlauf aller Sitzplätze

<p align="center">
<img src="img/allValues.png" alt="Temperaturentwicklung alle Sitzplätze" width="100%" />
</p>

### Temperaturverlauf der Durchschnittstemperatur aller Plätze

<p align="center">
<img src="img/average.png" alt="Durchschnittliche Temperaturentwicklung aller Sitzplätze" width="100%" />
</p>

### Höchste gemessene Temperatur

36,56°C, gemessen am Samstag um 19:10:31 Uhr auf Platz C14. Es handelt sich um einen krassen Ausreisser. Die Messung davor um 19:05 Uhr lag bei 30,25°C, die um 19:20 Uhr bei 30,88°C.
Fun Fact: Die Körpertemperatur eines gesunden Menschen liegt zwischen 36 und 37°C. Verwendeter Temperatursensor wird fachgerecht entsorgt.

### Niedrigste gemessene Temperatur

18,81°C, gemessen am Sonntag um 08:22:34 Uhr auf Platz B16.

## Lessons Learned

- Die Nummerierung der Sitzplätze beginnt in Richtung der Umkleidekabinen und endet an der Bühne, nicht umgekehrt.
- Es sollte mehr Sensoren, gleichmäßiger verteilt werden. Evtl. vorher über die optimale Verteilung Gedanken machen und konkrete Kandidaten an der LAN ansprechen.
- Mehr Gedanken über die Platzierung der Sensoren machen, um vergleichbarere Messwerte an den unterschiedlichen Plätzen zu erhalten.
- Eine Temperaturskala einbauen.
- Die anfallende Datenmenge ist ziemlich klein. Die Sensoren können ihre Temperatur häufiger übermitteln.
- Bei der Erstellung der Heatmap sollte die Skala etwas grunalarer sein.
- Sensoren beschriften, damit Teilnehmer wissen wo sie zurückzugeben sind.

## Danksagung

Ein Dank geht raus an alle, die an ihrem Platz einen Sensor betrieben haben:

- Bowseer
- Brilliantix
- {UFC}Danomat
- Darkstar
- Der_Chris
- DRuNKeN_MaSTeR
- Kaczoland
- Kenichisonoda
- Pippolo
- [DKF]Prasselback
- Puggingtons

Besonderer Dank an **deto** vom Orga-Team, der mich bei der Umsetzung unterstützt hat und ebenfalls einen Sensor im Orga-Park betrieben hat.

Ein weiterer besonderer Danke an **veggie1996**, der die Gehäuse für die Sensoren gedruckt hat.
