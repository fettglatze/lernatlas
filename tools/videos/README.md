# Video-Werkzeuge (Phase 3)

Ablauf, um für eine Fächergruppe Videos zu kuratieren (Arbeitsdateien entstehen in diesem Ordner, nicht committen: *.json):

1. `python topics.py` – liest alle Themen aus `data/catalog.js` nach `topics.json`
2. `python gather.py mathe,deutsch` – sucht je Thema auf YouTube und behält nur Treffer der Kanäle aus ALLOW/HINT (in gather.py pro Fach ergänzen)
3. Kandidaten von Hand sichten und gewählte IDs in eine `picks-*.txt` schreiben (`thema-id ID1 ID2`)
4. `python build.py picks-*.txt` – prüft jede ID über YouTube-oEmbed (existiert, Kanal erlaubt) und schreibt `videos.json`
5. `python emit.py` – erzeugt `data/content/videos.js`

Regel: Niemals Video-IDs von Hand ausdenken – nur IDs übernehmen, die build.py bestätigt hat.
