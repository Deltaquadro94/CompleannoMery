/* =====================================================================
   MERY ARENA – CONFIGURAZIONE
   Qui cambi data, luogo, numero e testi SENZA toccare la logica (index.html).
   Dopo ogni modifica: esegui `python3 verifica-data.py` (controlla che il
   giorno della settimana coincida con la data) e poi pubblica.
   ===================================================================== */
window.CONFIG = {

  /* ---------- FESTEGGIATA ---------- */
  festeggiata: "Mery",
  eta: 30,

  /* ---------- DATA E ORA ----------
     Il "giornoSettimana" DEVE coincidere con la data: se non coincide il sito
     si blocca con un messaggio d'errore (guard-rail) invece di mostrare date sbagliate.
     giorno/mese/anno sono numeri (mese 1-12). Orari in formato "HH:MM" (ora italiana). */
  data: {
    giornoSettimana: "sabato",
    giorno: 24,
    mese: 10,
    anno: 2026,
    oraInizio: "12:00",   // mezzogiorno esatto
    oraFine: "",          // lascia "" se non c'è un orario di fine
    durataIcsOre: 4       // usata solo nel file calendario se oraFine è vuota (12:00 + 4h = 16:00)
  },

  /* ---------- NOTA SUL COMPLEANNO ----------
     Frase mostrata su biglietto, dettagli, gratta-e-vinci, figurina e calendario. */
  notaCompleanno: "Il compleanno di Mery è il 23 ottobre, ma festeggiamo insieme sabato 24 ottobre a mezzogiorno. 🥂",

  /* ---------- LUOGO ---------- */
  luogo: {
    nome: "Villa Giovanna",
    indirizzo: "",                       // es. "Via Roma 1" (se vuoto non viene mostrato)
    citta: "Ottaviano (NA)",
    // Link Google Maps del posto (se vuoto usa una ricerca con nome + città):
    mapsUrl: "https://share.google/Eu2qfhvloV1S3gmZm"
  },

  /* ---------- CONFERME WHATSAPP ----------
     Il repo è pubblico: il numero è salvato SOLO codificato (base64) per evitare che i bot
     lo trovino con una ricerca testuale. Formato internazionale senza + né spazi.
     Per cambiarlo: whatsappNumeroB64 = btoa("39XXXXXXXXXX") (console del browser).
     (whatsappNumero in chiaro funziona ma va lasciato VUOTO nel repo pubblico.)
     Se entrambi sono vuoti i bottoni WhatsApp spariscono. */
  whatsappNumero: "",
  whatsappNumeroB64: "MzkzNjYxNTczMTEx",

  /* ---------- SERVER POSTI / DISTINTA / CLASSIFICA (Google Fogli + Apps Script) ----------
     Serve per: numeri porta-fortuna UNICI (biglietti reali), distinta su Fogli e classifica rigori visibile a tutti.
     Incolla qui l'URL della Web App (istruzioni in README.md, file apps-script/Code.gs).
     "" = disattivato (i numeri NON sono unici e la classifica non appare).
     "demo" = solo per anteprime: dati finti in memoria. */
  scriptUrl: "",

  /* ---------- DETTAGLI FESTA ---------- */
  dressCode: "Festivo & Casual",
  programma: "Calcio, amici e tanto cioccolato",

  /* ---------- +1 (la "riserva") ---------- */
  riserva: {
    titolo: "Porto la mia riserva (+1)",
    sottotitolo: "Un giocatore in più in distinta: a Mery piacciono le rose ampie."
  },

  /* ---------- FIGURINA ---------- */
  figurina: {
    foto: "assets/mery.webp",
    voto: 23,
    ruolo: "PST",
    // Statistiche (0-99). Le etichette sono quelle del gioco di calcio.
    stats: [
      { sigla: "PAC", valore: 3 },
      { sigla: "DRI", valore: 90 },
      { sigla: "SHO", valore: 8 },
      { sigla: "DEF", valore: 15 },
      { sigla: "PAS", valore: 7 },
      { sigla: "PHY", valore: 3 }
    ]
  },

  /* ---------- LA CARRIERA (Fase 4) – DA PERSONALIZZARE ----------
     Aggiungi/togli/modifica elementi: anno, titolo, testo. */
  carriera: [
    { anno: "1996", titolo: "Calcio d'inizio", testo: "Nasce Mery. Il primo urlo è già un cross sbagliato." },
    { anno: "2002", titolo: "Primo pallone", testo: "Il pallone entra in casa e non esce più. Vasi a rischio." },
    { anno: "2010", titolo: "La prima maglia", testo: "Scarpini, parastinchi e un talento che nessuno sa ancora misurare." },
    { anno: "2018", titolo: "Titolare inamovibile", testo: "In campo si fa sentire. Fuori si fa voler bene." },
    { anno: "2026", titolo: "30 anni: fischio d'inizio", testo: "Il tabellino dice 30. La partita più bella è ancora da giocare." }
  ],

  /* ---------- TELECRONACA (ticker in basso) ---------- */
  telecronaca: {
    benvenuto: "Benvenuti a Mery Arena: sabato a mezzogiorno si festeggiano i 30 anni di Mery!",
    inattivo: [
      "Sugli spalti si respira aria di festa grande.",
      "Il pubblico è carico: manca solo la festeggiata al centro del campo.",
      "Dalla regia: cioccolato in abbondanza, previsto in area di rigore.",
      "Clima perfetto per una festa da Champions."
    ],
    gol: ["GOOOL! Che rigore, Mery sarebbe fiera!", "Rete! Il portiere resta a guardare.", "Palla in rete, esplode lo stadio!"],
    parata: ["Parata! Il portiere ci arriva con la punta dei guanti.", "Para tutto: che riflessi!", "Niente da fare, il portiere ha letto il tiro."],
    traversa: ["TRAVERSA! Il legno trema!", "Clang! Un centimetro dal gol."],
    fuori: ["Alle stelle! Il pallone è ancora in orbita.", "Fuori di un soffio, peccato."],
    var: ["Controllo VAR in corso: silenzio in sala.", "L'arbitro va al monitor."],
    varOk: ["VAR: gol confermato!", "Tutto regolare, il gol vale."],
    varKo: ["VAR: gol ANNULLATO!", "Annullato: l'arbitro non transige."],
    coro: ["Il coro sale dalla curva: lo stadio canta per Mery!"]
  }
};
