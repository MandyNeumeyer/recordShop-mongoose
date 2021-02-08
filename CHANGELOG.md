# Änderungsprotokoll

Das Protokoll ist umgekehrt zeitlich sortiert, das neuste steht oben.

## Phase 0: Grundgerüst

Dieses Start-Repository enthält das Grundgerüst für ziemlich alle Express Server, die du erstellen wirst.
Das Gerüst besteht aus:

- Dateien, die von [`npx express-generator`](https://expressjs.com/en/starter/generator.html), mit den Optionen `--no-view` und `--git` erzeugt werden. Sie sind leicht angepasst

### Änderungen an den `express-generator` Dateien:

- `routes/index.js` und `routes/users.js` verwenden `const`
- `app.js` verwendet ebenfalls `const`. Weiterhin wurden ein paar Kommentare hinzugefügt, um die Datei in kleinere lesbare Einheiten zu unterteilen.
