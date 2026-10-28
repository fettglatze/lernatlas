import os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
import json, io
d=json.load(io.open('videos.json',encoding='utf-8'))
CH=['lehrerschmidt','musstewissen','simpleclub','daniel jung','mathematrick','learnattack','planet schule','morpheus','biologie einfach erklärt','mrwissen2go','musstewissen geschichte','wissen2go','terra x','spickzettel','erklär','ard']
def tidy(t):
    t=' '.join(w for w in t.split() if not w.startswith('#'))
    t=''.join(ch for ch in t if ord(ch)<0x2190 or 0x2010<=ord(ch)<=0x2030).strip()
    parts=[p.strip() for p in t.replace(' · ','|').split('|')]
    parts=[p for p in parts if p and not any(c in p.lower() for c in CH)]
    return ' · '.join(parts[:2]).replace(' - REMAKE','').replace(' REMAKE','').strip(' -!')
js=lambda s: "'"+s.replace("'","’")+"'"
lines=['// Gesichtete Erklärvideos je Thema (Phase 3).','// Jede ID wurde über YouTube-oEmbed geprüft: Video existiert, Kanal gehört zu den','// festgelegten Bildungskanälen, Titel passt zum Thema. Einbettung erst nach Klick (2-Klick).','// Inhaltlich vollständig angesehen sind die Videos nicht – Stichproben durch Lehrkräfte empfohlen.','','export default {']
subj=None
for k,vs in d.items():
    s=k.split('--')[0]
    if s!=subj:
        lines.append(f'  // {s}'); subj=s
    items=', '.join('{ yt: '+js(v['yt'])+', title: '+js(tidy(v['title']))+', channel: '+js(v['channel'])+' }' for v in vs)
    lines.append(f"  '{k}': [{items}],")
lines.append('};')
io.open(os.path.join(ROOT,'data','content','videos.js'),'w',encoding='utf-8',newline='').write('\n'.join(lines)+'\n')
print(len(d))
