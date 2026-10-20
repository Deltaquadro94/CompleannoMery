# Eliminare il sito dopo la festa

Dopo la festa (sabato 24 ottobre 2026), da **domenica 25/10/2026**, il sito e la repo (che contiene il numero WhatsApp per le conferme) vanno rimossi.

1. **Verifica che la festa sia passata** (sabato 24 ottobre 2026) e di aver salvato eventuali conferme/messaggi che ti servono.
2. Apri la repo su GitHub → **Settings**.
3. Scorri fino a **Danger Zone** → **Delete this repository** → conferma digitando il nome della repo.
4. **Verifica il 404:** apri il link del sito (o `curl -I https://deltaquadro94.github.io/compleannomery/`):
   deve rispondere `404`. La cache dei motori di ricerca può restare qualche giorno.
5. Se hai attivato il server: salva ciò che ti serve dal Foglio Google (Distinta, Posti, Classifica), poi in Apps Script → **Distribuisci → Gestisci distribuzioni → Archivia** e, se vuoi, elimina il Foglio. I nomi e i messaggi degli invitati restano lì finché non lo cancelli.

Nota: chi ha aperto il sito potrebbe aver salvato una copia. Per questo nel codice non ci sono dati oltre a quelli dell'invito.
