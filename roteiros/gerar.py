#!/usr/bin/env python3
"""Gera, a partir de roteiros/fonte/*.txt:
   - assets/js/roteiros-t1.js  (roteiros usados pela plataforma)
   - roteiros/temporada-1/*.md (roteiros formatados para leitura e produção)
Formato da fonte:
   @ep, @dur, @logline, @virada, @p Nome | Papel | Aparência | Figurino | Personalidade | Voz | Prompt (EN)
   CENA n | CABEÇALHO        > ação        NOME: fala        NOME (indicação): fala        VOZ: narração
Uso: python3 roteiros/gerar.py
"""
import json, math, re, glob, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'roteiros', 'fonte')
OUT_MD = os.path.join(ROOT, 'roteiros', 'temporada-1')
OUT_JS = os.path.join(ROOT, 'assets', 'js', 'roteiros-t1.js')

# Personagens do arco da temporada (ficha completa na BIBLIA.md)
ARCO = {
    'Jairo Mendes': 'Comerciante aposentado e viúvo, apaixonado por bolero. Voltou a se apaixonar e escondeu isso de todos.',
    'Vinícius Mendes': 'Músico endividado, impulsivo e irônico quando tem medo. O suspeito perfeito.',
    'Marisa Vilela': 'Professora de dança de salão, encantadora em público e calculista em particular. Sempre com um lenço de seda.',
    'Dona Zuleica': 'Vizinha de muro de Seu Jairo há quarenta anos. Sabe tudo o que acontece na rua.',
    'Pedro Rocha': 'Filho de Helena, estudante de Engenharia. Cozinha macarrão medido no grama.',
    'Seu Alcides': 'Dono do Sabor da Praça. Conhece todo mundo pelo nome e dança bolero às quintas.',
    'Dr. Saraiva': 'Promotor correto e econômico nas palavras. Assume o caso Jairo quando Iara se declara suspeita.',
}

def est_min(lines_src):
    lines = 0; voz = 0
    for l in lines_src:
        if not l or l.startswith('@'): continue
        if l.startswith('CENA'): lines += 3
        elif l.startswith('>'): lines += math.ceil(len(l[1:].strip()) / 58) + 1
        elif l.startswith('VOZ:'): voz += len(l[4:].split())
        else:
            m = re.match(r'^([^:]{1,40}):\s*(.*)$', l); t = m.group(2) if m else l
            lines += 1 + (1 if re.match(r'^[^:]*\(', l) else 0) + math.ceil(len(t) / 35) + 1
    return lines / 55 + voz / 140 + 0.5

def parse(path):
    raw = [l.rstrip('\n') for l in open(path, encoding='utf-8')]
    ep = {'chars': [], 'scenes': []}
    cur = None
    for l in raw:
        if not l.strip(): continue
        if l.startswith('@ep '): ep['id'] = l[4:].strip()
        elif l.startswith('@dur '): ep['dur_plan'] = int(l[5:])
        elif l.startswith('@logline '): ep['logline'] = l[9:].strip()
        elif l.startswith('@virada '): ep['twist'] = l[8:].strip()
        elif l.startswith('@p '):
            f = [x.strip() for x in l[3:].split('|')] + [''] * 7
            ep['chars'].append(dict(n=f[0], r=f[1], ap=f[2], fig=f[3], pers=f[4], voz=f[5], prompt=f[6]))
        elif l.startswith('CENA '):
            slug = l.split('|', 1)[1].strip()
            cur = {'s': slug, 'l': []}; ep['scenes'].append(cur)
        elif cur is None: continue
        elif l.startswith('>'): cur['l'].append(['*', l[1:].strip()])
        elif l.startswith('VOZ:'): cur['l'].append(['VOZ', l[4:].strip()])
        else:
            m = re.match(r'^([^:()]{1,40}?)\s*(\([^)]*\))?\s*:\s*(.*)$', l)
            if m:
                who = m.group(1).strip(); par = m.group(2); txt = m.group(3).strip()
                cur['l'].append([who, (par + ' ' if par else '') + txt])
            else:
                cur['l'].append(['*', l.strip()])
    ep['dur'] = max(20, round(est_min(raw)))
    return ep

def guest_short(c):
    if c['ap'].startswith('Ver '):
        return ARCO.get(c['n'], '')
    return c['pers'] or c['ap']

def md(ep, meta):
    o = [f"# T1:E{meta['n']} · Art. {ep['id']} · {meta['crime']}", f"## {meta['title']}", '',
         f"**Duração estimada:** {ep['dur']} min  ", f"**Temporada 1:** Dos Crimes contra a Pessoa", '',
         '### Sinopse', ep['logline'], '', '### A virada jurídica', ep['twist'], '', '### Personagens do episódio', '',
         'Personagens fixos (Helena, Caíque, Iara, Otávio, Marta, Lúcia, Voz do Código) e do arco da temporada: ver `BIBLIA.md`.', '']
    for c in ep['chars']:
        o.append(f"#### {c['n']}")
        o.append(f"- **Papel:** {c['r']}")
        if c['ap'].startswith('Ver '):
            o.append('- **Ficha completa:** ver `BIBLIA.md`.'); o.append(''); continue
        for k, lab in (('ap', 'Aparência'), ('fig', 'Figurino'), ('pers', 'Personalidade'), ('voz', 'Voz')):
            if c[k]: o.append(f"- **{lab}:** {c[k]}")
        if c['prompt']: o.append(f"- **Prompt de imagem (EN):** `{c['prompt']}`")
        o.append('')
    o += ['---', '', '## Roteiro', '']
    for i, sc in enumerate(ep['scenes'], 1):
        o.append(f"### CENA {i} · {sc['s']}"); o.append('')
        for who, t in sc['l']:
            if who == '*': o.append(f"*{t}*")
            elif who == 'VOZ': o.append(f"> **A VOZ DO CÓDIGO:** {t}")
            else: o.append(f"**{who.upper()}:** {t}")
            o.append('')
    return '\n'.join(o)

def main():
    sys.path.insert(0, ROOT)
    files = sorted(glob.glob(os.path.join(SRC, 't1e*.txt')))
    data = {}
    meta_all = json.load(open(os.path.join(ROOT, 'roteiros', 'meta-t1.json'), encoding='utf-8'))
    os.makedirs(OUT_MD, exist_ok=True)
    for f in files:
        ep = parse(f); meta = meta_all[ep['id']]
        data[ep['id']] = {
            'dur': ep['dur'], 'logline': ep['logline'], 'twist': ep['twist'],
            'guests': [{'n': c['n'], 'r': c['r'], 'd': guest_short(c)} for c in ep['chars']
                       if not c['n'].startswith('Benedito e Zilda jovens')],
            'scenes': ep['scenes'],
        }
        name = f"T1E{meta['n']}-art{ep['id']}-{meta['slug']}.md"
        open(os.path.join(OUT_MD, name), 'w', encoding='utf-8').write(md(ep, meta))
        print(f"{ep['id']}: {ep['dur']} min, {len(ep['scenes'])} cenas -> {name}")
    js = ('/* Gerado por roteiros/gerar.py a partir de roteiros/fonte. Não edite à mão. */\n'
          'window.JP_SCRIPTS = Object.assign(window.JP_SCRIPTS || {}, ' + json.dumps(data, ensure_ascii=False) + ');\n')
    open(OUT_JS, 'w', encoding='utf-8').write(js)
    print('JS:', os.path.getsize(OUT_JS) // 1024, 'KB')

if __name__ == '__main__':
    main()
