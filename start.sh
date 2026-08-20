#!/bin/bash

readonly RESET='\033[0m'
readonly BOLD='\033[1m'
readonly DIM='\033[2m'

readonly PINK='\033[38;5;205m'
readonly HOT_PINK='\033[38;5;198m'
readonly PASTEL_PINK='\033[38;5;217m'
readonly LAVENDER='\033[38;5;183m'
readonly PURPLE='\033[38;5;141m'

readonly GREEN='\033[38;5;120m'
readonly WHITE='\033[1;37m'
readonly GRAY='\033[38;5;245m'
readonly RED='\033[0;31m'

readonly CONNECT_JS="arquivos/connect.js"
readonly VERSION="3.0.0-beta"

show_banner() {
clear

echo ""
echo -e "${PASTEL_PINK}◈─────────────────────────────────◈${RESET}"
echo -e "       ${PINK}✦${RESET} ${BOLD}${WHITE}KIMORI V3${RESET} ${PINK}✦${RESET}"
echo -e "   ${DIM}${GRAY}Sistema de Conexão v${VERSION}${RESET}"
echo -e "${PASTEL_PINK}◈─────────────────────────────────◈${RESET}"
echo ""
}

sparkle() {
echo -e "${PINK}✦${RESET} ${LAVENDER}✦${RESET} ${HOT_PINK}✦${RESET} ${PURPLE}✦${RESET} ${PINK}✦${RESET}"
}

start() {
while true; do
show_banner

echo -e "  ${PINK}✦${RESET} ${BOLD}${WHITE}INICIANDO CONEXÃO${RESET} ${PINK}✦${RESET}"
echo ""
echo -e "  ${GREEN}▶${RESET} ${WHITE}Modo de conexão:${RESET} ${PINK}Código de Pareamento${RESET}"
echo -e "  ${DIM}${GRAY}→ O número será solicitado pelo terminal${RESET}"
echo ""

sparkle
echo ""

sleep 1

node "$CONNECT_JS" --code

status=$?

echo ""

if [ $status -eq 0 ]; then
echo -e "${GREEN}◈───────────────────────────────────────────◈${RESET}"
echo -e "  ${GREEN}✓${RESET} ${WHITE}Processo encerrado.${RESET}"
echo -e "${GREEN}◈───────────────────────────────────────────◈${RESET}"
else
echo -e "${RED}◈───────────────────────────────────────────◈${RESET}"
echo -e "  ${RED}✗${RESET} ${WHITE}Processo encerrado com erro.${RESET}"
echo -e "  ${DIM}${GRAY}Código de saída: ${status}${RESET}"
echo -e "${RED}◈───────────────────────────────────────────◈${RESET}"
fi

echo ""
echo -e "${DIM}${GRAY}Reiniciando em 2 segundos...${RESET}"
sleep 2
done
}

start