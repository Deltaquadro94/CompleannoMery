# MERY ARENA – invito interattivo per i 30 anni di Mery

Sito 100% statico (`index.html` + `config.js` + `assets/`). Nessuna build, nessun CDN.

**Evento:** sabato 24 ottobre 2026, ore 12:00 (Villa Giovanna, Ottaviano).

## Come si modifica
Tutto si cambia in **`config.js`** (commenti in italiano):

| Cosa | Dove in `config.js` |
|---|---|
| Data / ora / giorno della settimana | `data` |
| Luogo, indirizzo, link Google Maps | `luogo` |
| Numero WhatsApp conferme | `whatsappNumeroB64` (codificato in base64) |
| Salvataggio su Google Fogli | `scriptUrl` (vuoto = disattivato) |
| Dress code e programma | `dressCode`, `programma` |
| Statistiche e foto della figurina | `figurina` |
| Testi della carriera (Fase 4) | `carriera` |
| Telecronaca (ticker) | `telecronaca` |

**Guard-rail data:** se il giorno della settimana non coincide con la data, il sito si ferma e mostra l'errore.
Prima di pubblicare esegui sempre:

```
python3 verifica-data.py
```

## Link personalizzati
Aggiungi `?nome=` alla fine del link. Il nome compare su biglietto, distinta e riepilogo.

```
https://deltaquadro94.github.io/compleannomery/?nome=Paola
https://deltaquadro94.github.io/compleannomery/?nome=Giulia
https://deltaquadro94.github.io/compleannomery/?nome=Zio%20Peppe
```
Spazi come `%20`; accenti OK (`?nome=Nicolò`). Senza `?nome=` il biglietto chiede il nome.

Con una lista di nomi (uno per riga in `nomi.txt`) li generi così:
```
python3 - <<'PY'
from urllib.parse import quote
base="https://deltaquadro94.github.io/compleannomery/"
for n in open("nomi.txt",encoding="utf-8"):
    n=n.strip()
    if n: print(f"{n}\t{base}?nome={quote(n)}")
PY
```

## Server: posti unici, distinta e classifica (Google Fogli + Apps Script)
Un sito statico non può ricordare chi ha scelto un numero. Per avere **numeri porta-fortuna unici** (i biglietti reali),
la **distinta** in un foglio e la **classifica rigori** visibile a tutti serve questo piccolo server gratuito. 5 minuti:

1. Crea un **Foglio Google** nuovo (es. «Mery Arena»).
2. Menu **Estensioni → Apps Script**. Cancella il contenuto e incolla il file `apps-script/Code.gs`. Salva.
3. **Distribuisci → Nuova distribuzione** → tipo **App web** → *Esegui come:* **Me** → *Chi ha accesso:* **Chiunque**. Autorizza.
4. Copia l'**URL dell'app web** (finisce con `/exec`) e incollalo in `config.js` → `scriptUrl`.
5. Pubblica. Nel Foglio compaiono da soli i tab `Posti`, `Distinta` (con **il numero scelto da ognuno**, riserva +1 e messaggio) e `Classifica`.

Note: chiunque abbia il link del sito può prenotare un numero o inviare un punteggio. È pensato per una festa tra amici, non per un uso pubblico.
Se cambi il codice di `Code.gs` ricordati di fare **Distribuisci → Gestisci distribuzioni → Modifica → Nuova versione**.
Con `scriptUrl: ""` tutto resta locale: i numeri **non** sono unici e la classifica non appare.
`scriptUrl: "demo"` serve solo per le anteprime (dati finti in memoria).

## Numero WhatsApp e repo pubblica
Finché `whatsappNumero` e `whatsappNumeroB64` sono vuoti, il bottone «Conferma su WhatsApp» resta **nascosto**; appare da solo appena inserisci il numero.

Il numero finisce nel codice pubblico (è necessario per il bottone di conferma), quindi è salvato **solo codificato**:
`whatsappNumeroB64: "<risultato di btoa('39XXXXXXXXXX')>"` e `whatsappNumero` resta vuoto.
Non è segreto (chi apre il sito può ricavarlo), ma evita i bot che cercano numeri nel testo dei repo.

## Musica e portiere
- `assets/champions.mp3`: musica di sottofondo (parte dopo il tap su «Entra nello stadio», in loop, si abbassa durante fanfara e coro). Il tasto mute in alto la spegne. Per cambiarla basta sostituire il file.
- `assets/portiere-*.webp`: i frame del portiere (pronto, tuffi, esultanza, «indica i difensori»).

## Debug
`?fase=N` (1-6) salta direttamente a una fase, utile per controllare layout e testi.

## Pubblicazione
GitHub Pages: Settings → Pages → Source «Deploy from a branch» → branch `main`, cartella `/ (root)`.
Dopo la festa vedi `ELIMINA.md`.
