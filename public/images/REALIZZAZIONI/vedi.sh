#!/bin/bash

# Controlla se è stato fornito un percorso, altrimenti usa la cartella corrente
PERCORSO=${1:-.}

echo "Analisi della struttura in: $PERCORSO"
echo "---------------------------------------"

# Esegue tree cercando pattern di immagini comuni
tree -P '*.jpg|*.jpeg|*.png|*.gif|*.bmp|*.webp' --prune "$PERCORSO"