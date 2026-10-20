/**
 * MERY ARENA – server per posti numerati, distinta e classifica rigori.
 * Gira su Google Apps Script, legato a un Foglio Google (vedi README.md, sezione "Server").
 *
 * Fogli creati in automatico:
 *   Posti        -> un numero (1-99) = una persona (i biglietti reali)
 *   Distinta     -> una riga per invitato: presenza, posto, rigori, riserva (+1), messaggio
 *   Classifica   -> miglior risultato ai rigori di ogni invitato
 */
var INTESTAZIONI = {
  Posti: ['Numero', 'Nome', 'Codice biglietto', 'Data'],
  Distinta: ['Data', 'Nome', 'Presenza', 'Posto n°', 'Rigori (record)', 'Riserva (+1)', 'Nome riserva', 'Messaggio', 'Codice biglietto'],
  Classifica: ['Nome', 'Rigori', 'Data']
};
var MAX_RIGORI = 10;

function foglio_(nome) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(nome);
  if (!sh) { sh = ss.insertSheet(nome); sh.appendRow(INTESTAZIONI[nome]); sh.setFrozenRows(1); }
  return sh;
}
function righe_(nome) {
  var sh = foglio_(nome), n = sh.getLastRow();
  return n > 1 ? sh.getRange(2, 1, n - 1, INTESTAZIONI[nome].length).getValues() : [];
}
function pulisci_(v, max) {
  v = String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max || 60);
  return /^[=+\-@]/.test(v) ? "'" + v : v;   // evita formule iniettate nel foglio
}
function chiave_(v) { return String(v == null ? '' : v).trim().toLowerCase(); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function stato_(nome) {
  var taken = [], mio = null, k = chiave_(nome);
  righe_('Posti').forEach(function (r) {
    var n = Number(r[0]); taken.push(n);
    if (k && chiave_(r[1]) === k) mio = n;
  });
  var cl = righe_('Classifica').map(function (r) { return { nome: String(r[0]), rigori: Number(r[1]) }; });
  cl.sort(function (a, b) { return b.rigori - a.rigori; });   // a parità resta l'ordine di arrivo
  return { ok: true, taken: taken, mio: mio, classifica: cl };
}

/** Prenota (o sposta) il posto di una persona. Ritorna false se è di un altro. */
function prenota_(nome, numero, codice) {
  var sh = foglio_('Posti'), k = chiave_(nome), rows = righe_('Posti'), i;
  for (i = 0; i < rows.length; i++) {
    if (Number(rows[i][0]) === numero && chiave_(rows[i][1]) !== k) return false;
  }
  for (i = rows.length - 1; i >= 0; i--) {            // libera il vecchio numero della stessa persona
    if (chiave_(rows[i][1]) === k) sh.deleteRow(i + 2);
  }
  sh.appendRow([numero, pulisci_(nome, 30), pulisci_(codice, 20), new Date()]);
  return true;
}
function registraRigori_(nome, rigori) {
  var sh = foglio_('Classifica'), k = chiave_(nome), rows = righe_('Classifica');
  for (var i = 0; i < rows.length; i++) {
    if (chiave_(rows[i][0]) === k) {
      if (rigori > Number(rows[i][1])) sh.getRange(i + 2, 2, 1, 2).setValues([[rigori, new Date()]]);
      return;
    }
  }
  sh.appendRow([pulisci_(nome, 30), rigori, new Date()]);
}

function doGet(e) {
  return json_(stato_(e && e.parameter ? e.parameter.nome : ''));
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try { lock.waitLock(15000); } catch (err) { return json_({ ok: false, motivo: 'rete' }); }
  try {
    var d = JSON.parse(e.postData.contents), nome = String(d.nome || '').trim().slice(0, 30);
    if (!nome) return json_({ ok: false, motivo: 'errore' });
    var out;

    if (d.action === 'prenota' || d.action === 'rsvp') {
      var numero = parseInt(d.action === 'rsvp' ? d.posto : d.numero, 10);
      if (!(numero >= 1 && numero <= 99)) return json_({ ok: false, motivo: 'errore' });
      if (!prenota_(nome, numero, d.codice)) {
        out = stato_(nome); out.ok = false; out.motivo = 'occupato'; return json_(out);
      }
    }
    if (d.action === 'rigori' || d.action === 'rsvp') {
      var r = parseInt(d.rigori, 10);
      if (r >= 0 && r <= MAX_RIGORI) registraRigori_(nome, r);
    }
    if (d.action === 'rsvp') {
      var sh = foglio_('Distinta'), k = chiave_(nome), rows = righe_('Distinta'), riga = null;
      var valori = [new Date(), pulisci_(nome, 30), pulisci_(d.presenza, 20), parseInt(d.posto, 10), parseInt(d.rigori, 10) || 0,
                    d.riserva ? 'Sì' : 'No', pulisci_(d.riservaNome, 30), pulisci_(d.messaggio, 300), pulisci_(d.codice, 20)];
      for (var i = 0; i < rows.length; i++) { if (chiave_(rows[i][1]) === k) { riga = i + 2; break; } }
      if (riga) sh.getRange(riga, 1, 1, valori.length).setValues([valori]); else sh.appendRow(valori);
    }
    return json_(stato_(nome));
  } catch (err) {
    return json_({ ok: false, motivo: 'errore' });
  } finally {
    lock.releaseLock();
  }
}
