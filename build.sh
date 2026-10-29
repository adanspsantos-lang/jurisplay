#!/bin/sh
# Monta a pasta dist/ publicada pela Vercel.
# Com o repositório conectado à Vercel, copia os arquivos locais; sem ele, baixa a branch main do GitHub.
set -e
rm -rf dist && mkdir -p dist
if [ -f index.html ]; then
  cp -r index.html favicon.svg assets videos dist/
else
  curl -fsSL https://codeload.github.com/adanspsantos-lang/jurisplay/tar.gz/refs/heads/main | tar xz --strip-components=1 -C dist
fi
ls dist
