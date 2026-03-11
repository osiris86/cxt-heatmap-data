# Convention-X-Treme 28: Die Rückkehr der LAN Ritter

Die [Convention-X-Treme](https://convention-x-treme.de) fand in der 28. Ausgabe in der Altenbürghalle in Karlsdorf Neuthard statt. Die LAN Party begann am 06.03.2026 um 18:00 Uhr und endete am 08.03.2026 um 12:00 Uhr.

Nachdem beim letzten Einsatz ein Sensor nicht den Weg zu mir zurück gefunden hat, konnten 19 Sensoren an Gäste verteilt werden. Insgesamt 18 Sensoren wurden auch angeschlossen und haben regelmäßig Daten geliefert.

Die Sensoren waren so konfiguriert, dass sie alle 2 Minuten die aktuelle Temperatur gesendet haben. Außerdem wurde eine Netatmo Wetterstation nicht weit entfernt von der Halle per API angezapft, um auch die Außentemperatur zu erfassen.

Die meisten Daten hat der Sensor an Platz F10 geliefert (1.121 Datenpunkte), die wenigsten Daten kamen vom Platz N11 (120 Datenpunkte). Im Durchschnitt hat jeder Sensor 940 Temperaturen übermittelt; der Median lag bei 1.055.

Die Daten stehen in unterschiedlichen Formaten zur Verfügung:

- [CSV](https://github.com/osiris86/cxt-heatmap-data/blob/CXT28/data.csv)
- [InfluxDB](https://github.com/osiris86/cxt-heatmap-data/blob/CXT28/originalDb.zip)
- [PNGs](https://github.com/osiris86/cxt-heatmap-data/tree/CXT28/temperatureMaps)

## Einige Auswertungen

### Temperaturentwicklung

https://osiris86.github.io/cxt-heatmap-data/assets/temperatureDevelopment.mp4

### Temperaturverlauf aller Sitzplätze

<p align="center">
<img src="img/allValues.png" alt="Temperaturentwicklung alle Sitzplätze" width="100%" />
</p>

### Temperaturverlauf der Durchschnittstemperatur aller Plätze

<p align="center">
<img src="img/average.png" alt="Durchschnittliche Temperaturentwicklung aller Sitzplätze" width="100%" />
</p>

### Temperaturverlauf aller Sitzplätze und der Außentemperatur

<p align="center">
<img src="img/allValuesOutside.png" alt="Durchschnittliche Temperaturentwicklung aller Sitzplätze" width="100%" />
</p>

### Höchste gemessene Temperatur

32,5°C, gemessen am Samstag um 14:39:03 Uhr auf Platz Q1.

### Niedrigste gemessene Temperatur

-127°C, gemessen am Samstag um 23:14:55 Uhr auf Platz Q1. Da mir nichts von Toten auf der Veranstaltung bekannt ist und ich mir recht sicher bin, dass ich das mitbekommen hätte, würde ich diese Messung als Messfehler klassifizieren. Keine Ahnung was hier passiert ist ...

Sieht man von dieser Messung ab, war die niedrigste gemessene Temperatur 11,44°C am Sonntag um 08:40:25 auf Platz B11.

## Interpretation

Am Eingang ist es nachts/morgens ganz schön kalt. In der Mitte der Halle ist es tagsüber ganz schön warm. Schockierende Erkenntnisse ...

## Trivia / Lessons Learned

Hier ein paar Sachen, die während der LAN so passiert sind und die ich für erwähnenswert halte:

Nachdem ich das Projekt auf der CXT 27 nicht zum Laufen bekommen habe, weil mir verschiedene Secrets gefehlt hatten und ich auch nicht darauf zugreifen konnte, habe ich dieses Jahr meinen eigenen Server zu Hause vorkonfiguriert und mitgebracht. Das hat für ein wesentlich reibungsloseren Ablauf gesorgt.

Zu Beginn der LAN stellte ich fest, dass sich die Sensoren nicht mit dem WLAN verbinden. Und das obwohl ich zu Hause sogar noch das CXT WLAN simuliert habe, um genau das sicherzustellen. Nachdem ich eine Weile mit debugging verbracht habe, habe ich mich an die Orgas gewandt. Stellte sich raus, dass das CXT WLAN nur auf 5GHz funkt. Meine Sensoren können aber nur 2,4GHz. 3 Minuten später hatte ich meine eigene (vermutlich versteckte) SSID und die Sensoren konnten sich damit verbinden. Ich habe also kurz alle Sensoren neu geflasht und konnte dann mit der Verteilung beginnen.

Manche Gäste wirkten etwas skeptisch als irgendein dahergelaufener LAN Gast sie gefragt hat, ob sie bereit wären einen Sensor per USB an ihrem Rechner zu betreiben. Vermutlich würde es die Skepsis etwas reduzieren, wenn ich mehr Netzteile zur Verfügung hätte, um die Sensoren zu betreiben. Hier gilt es Augen und Ohren offen zu halten.

Zum Teil wirkten die gemessenen Temperaturen doch auch stark von der PC-Abluft beeinflusst. Man beobachte bspw. mal die Temperaturentwicklung an R11 insbesondere in der ersten Nacht. Hier sollte ggf. auf eine (noch) bessere Platzierung der Sensoren geachtet werden.

Am Samstag zwischen 15:38 Uhr und 16:52 Uhr hat sich mein Server verabschiedet. Ich habe keine Ahnung was hier schief lief, aber ggf. sollte ich mir über ein Monitoring Gedanken machen, das mich informiert, wenn der Server nicht mehr da ist.

Vor dem Speichern der von den Sensoren gemeldeten Daten, sollte ggf. eine Plausibilitätsprüfung stattfinden, so dass so krasse Ausreisser wie oben beschrieben gar nicht erst in der Datenbank landen.

Auch dieses Jahr hat es ein Sensor nicht zu mir zurück geschafft. Diesmal wurde er jedoch glücklicherweise von den Orgas beim Abbau gefunden und wird bis nächstes Jahr verwahrt. Einige wenige Sensoren wurden bei der Cateringkasse abgegeben. Hier sollte ich mir ein paar Gedanken machen wie ich die Gäste besser auf meinen Sitzplatz aufmerksam machen kann.

## Danksagung

Ein Dank geht raus an alle, die an ihrem Platz einen Sensor betrieben haben:

- {UFC}Navigator
- [d3s]Lostinspace
- 2DieFor
- Bloodydead
- Bowseer
- Dark Lam0r
- Darkstar
- deto
- Fresch90
- Gammelstulle
- Gorn
- JaneDase
- NoFlo
- Peng23
- PinGu
- quasari
- Tai Kahar
- unknwn

Besonderer Dank an **deto** vom Orga-Team, der mich bei der Umsetzung unterstützt hat und spontan mal ein neues WLAN aufgesetzt hat, um die Sensoren betreiben zu können.
