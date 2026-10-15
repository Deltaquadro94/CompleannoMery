#!/usr/bin/env python3
"""Controlla che il giorno della settimana in config.js coincida con la data.
Uso:  python3 verifica-data.py        (esce con codice 1 se c'è un errore)"""
import datetime, pathlib, re, sys, unicodedata

src = pathlib.Path(__file__).with_name("config.js").read_text(encoding="utf-8")

def val(chiave, num=False):
    m = re.search(r'\b' + chiave + r'\s*:\s*("([^"]*)"|(\d+))', src)
    if not m:
        sys.exit(f"ERRORE: '{chiave}' non trovato in config.js")
    return int(m.group(3)) if num else m.group(2)

norm = lambda s: unicodedata.normalize("NFD", s.lower()).encode("ascii", "ignore").decode().strip()
giorni = ["lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato", "domenica"]
g, m, a = val("giorno", True), val("mese", True), val("anno", True)
try:
    reale = giorni[datetime.date(a, m, g).weekday()]
except ValueError:
    sys.exit(f"ERRORE: la data {g}/{m}/{a} non esiste.")
dichiarato = norm(val("giornoSettimana"))
if dichiarato != reale:
    sys.exit(f"ERRORE: in config.js il {g}/{m}/{a} è indicato come '{dichiarato}' ma è {reale}. NON pubblicare.")
print(f"OK: {reale} {g}/{m}/{a} coincide con config.js")
