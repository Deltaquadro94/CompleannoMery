# MERY ARENA – invito interattivo per i 30 anni di Mery

Sito 100% statico (`index.html` + `config.js` + `assets/`). Nessuna build, nessun CDN.

## Come si modifica
Tutto si cambia in **`config.js`** (commenti in italiano):

| Cosa | Dove in `config.js` |
|---|---|
| Data / ora / giorno della settimana | `data` |
| Luogo, indirizzo, link Google Maps | `luogo` |
| Numero WhatsApp conferme | `whatsappNumero` (oppure `whatsappNumeroB64`) |
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

## Numero WhatsApp e repo pubblica
Finché `whatsappNumero` e `whatsappNumeroB64` sono vuoti, il bottone «Conferma su WhatsApp» resta **nascosto**; appare da solo appena inserisci il numero.

Il numero finisce nel codice pubblico (è necessario per il bottone di conferma). Per non averlo in chiaro
puoi usare la versione codificata: `whatsappNumeroB64: "<risultato di btoa('39XXXXXXXXXX')>"`.
Non è segreto (chi apre il sito può ricavarlo), ma evita i bot che cercano numeri nel testo dei repo.

## Debug
`?fase=N` (1-6) salta direttamente a una fase, utile per controllare layout e testi.

## Pubblicazione
GitHub Pages: Settings → Pages → Source «Deploy from a branch» → branch `main`, cartella `/ (root)`.
Dopo la festa vedi `ELIMINA.md`.
