# Guida Modifica Contenuti — Passo per Passo

Questa guida ti spiega **come modificare i testi del sito senza toccare il codice**.

Tutti i contenuti sono nei file JSON nella cartella `src/data/`.  
Non devi capire il codice — segui solo i passaggi qui sotto.

---

## Come modificare i file

### Metodo 1 — GitHub (consigliato, nessuna installazione richiesta)

1. Vai su **github.com** e accedi al tuo account
2. Apri il repository del sito
3. Naviga nella cartella `src/data/`
4. Clicca sul file che vuoi modificare
5. Clicca sull'icona **matita** (✏️) in alto a destra
6. Modifica il testo
7. Clicca **Commit changes** → il sito si aggiorna in automatico!

### Metodo 2 — Editor di testo locale

1. Apri la cartella del progetto sul tuo computer
2. Vai in `src/data/`
3. Apri il file con un editor di testo (Blocco Note, TextEdit, o VS Code)
4. Modifica e salva
5. Fai il push su GitHub → il sito si aggiorna

---

## File 1: `site.json` — Dati aziendali

Questo file contiene le informazioni principali dell'azienda.

### Cambiare telefono, email, indirizzo

```json
"company": {
  "name": "Costruzioni Gnatta",
  "email": "info@gnatta.it",        ← Cambia qui la email
  "phone": "+39 0332 000000",       ← Cambia qui il telefono
  "address": "Via Esempio 1, ..."   ← Cambia qui l'indirizzo
}
```

### Cambiare i numeri aziendali (statistiche animate)

```json
"stats": [
  { "value": 25, "label": "Anni di Esperienza", "suffix": "+" },
  { "value": 80, "label": "Progetti Completati", "suffix": "+" },
  ...
]
```

Modifica solo il numero in `"value"`. Non toccare `"label"` o `"suffix"` se non necessario.

### Cambiare il testo della homepage (Hero)

```json
"hero": {
  "headline": "Costruiamo Spazi\nda Vivere",   ← Titolo principale
  "subheadline": "Ville, palazzine..."          ← Testo sotto il titolo
}
```

Il `\n` crea un'interruzione di riga. Lascialo dov'è.

### Cambiare la storia aziendale (pagina Chi Siamo)

```json
"aboutPage": {
  "story": "...",     ← Testo storia azienda
  "mission": "...",   ← Testo mission
  "approach": "...",  ← Testo approccio
  "timeline": [
    { "year": "2000", "event": "Fondazione dell'azienda" },
    ...
  ]
}
```

Per aggiungere un evento alla timeline, copia e incolla una riga:
```json
{ "year": "2025", "event": "Nuovo traguardo" }
```

---

## File 2: `properties.json` — Unità in Vendita

### Aggiungere una nuova unità

Copia questo blocco e incollalo **prima** della `]` finale:

```json
,{
  "id": "nome-progetto",
  "title": "Nome Progetto",
  "location": "Città, Provincia",
  "status": "in-vendita",
  "statusLabel": "In Vendita",
  "type": "Palazzina Residenziale",
  "description": "Breve descrizione per la card.",
  "longDescription": "Descrizione completa nella pagina di dettaglio.",
  "features": [
    "Caratteristica 1",
    "Caratteristica 2"
  ],
  "units": [
    { "type": "Trilocale", "size": "90 mq", "floor": "Piano 1", "available": true }
  ],
  "images": [
    "https://link-immagine.jpg"
  ],
  "coverImage": "https://link-immagine-copertina.jpg"
}
```

⚠️ **Attenzione**: l'`id` deve essere unico e contenere solo lettere minuscole, numeri e trattini (es. `residenza-verde`).

### Cambiare lo stato di una unità

Il campo `status` può essere:
- `"in-vendita"` → badge oro "In Vendita"
- `"prossimamente"` → badge grigio "Prossimamente"
- `"venduto"` → badge scuro "Venduto"

Cambia anche `"statusLabel"` con il testo che vuoi mostrare.

### Aggiungere immagini

Carica le immagini su un servizio come Cloudinary, Imgur, o direttamente su Cloudflare Images, poi incolla il link nel campo `"images"` e `"coverImage"`.

---

## File 3: `realizzazioni.json` — Progetti Completati

### Aggiungere una nuova realizzazione

```json
,{
  "id": "nome-progetto",
  "title": "Nome Progetto",
  "location": "Città, Provincia",
  "year": "2024",
  "type": "Residenziale",
  "description": "Descrizione del progetto completato.",
  "images": [
    "https://link-immagine.jpg"
  ],
  "coverImage": "https://link-immagine-copertina.jpg"
}
```

---

## Regole importanti

✅ Non cancellare le virgole tra gli elementi  
✅ Non cancellare le parentesi graffe `{}` o quadre `[]`  
✅ Mantieni i testi tra virgolette `"testo"`  
✅ I valori numerici (es. statistiche) non hanno virgolette: `"value": 25`  
✅ I valori booleani (vero/falso) sono: `true` o `false` (senza virgolette)  

---

## Verifica prima di pubblicare

Dopo aver modificato un file JSON, incollalo su [jsonlint.com](https://jsonlint.com) per verificare che sia valido. Se mostra errori, controlla le virgole e le virgolette.

---

## Hai bisogno di aiuto?

Contatta il tuo sviluppatore di riferimento per:
- Aggiungere nuove sezioni o pagine
- Cambiare il design
- Integrare il form di contatto con un backend
- Configurare un dominio personalizzato
