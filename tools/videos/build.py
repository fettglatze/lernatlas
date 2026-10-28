import urllib.request, json, io, re, sys, time
ALLOW={'lehrerschmidt':'Lehrerschmidt','daniel jung':'Mathe by Daniel Jung','mathematrick':'MathemaTrick','simpleclub':'simpleclub','musstewissen':'musstewissen','mr v englisch':'Mr V Englisch','duden learnattack':'Duden Learnattack','planet schule':'planet schule','morpheus tutorials':'The Morpheus Tutorials','lesch':'Terra X Lesch & Co','terra x history':'Terra X History','terra x':'Terra X','mrwissen2go geschichte':'MrWissen2go Geschichte','mrwissen2go':'MrWissen2go','bundeszentrale für politische':'bpb'}
cache={}
try: cache=json.load(io.open('oembed_cache.json',encoding='utf-8'))
except Exception: pass
def oembed(v):
    if v in cache: return cache[v]
    u='https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v='+v
    try: d=json.load(urllib.request.urlopen(u,timeout=15)); r=[d['title'],d['author_name']]
    except Exception as e: r=None
    cache[v]=r; time.sleep(0.2); return r
SEP=re.compile(' [|I] | – |: einfach erklärt| - einfach erklärt| - ganz einfach erklärt')
def clean(title, channel):
    parts=[p.strip() for p in re.split(r' [|] | I | – ', title)]
    keep=[p for p in parts if p and not any(k in p.lower() for k in ['lehrerschmidt','musstewissen','simpleclub','daniel jung','mathematrick','learnattack','mr v'])]
    t=' · '.join(keep[:2]) if keep else title
    return t.strip(' -!')
out={}; bad=[]
for f in sys.argv[1:]:
    for line in io.open(f,encoding='utf-8'):
        p=line.split()
        if not p: continue
        tid=p[0]
        for v in p[1:]:
            r=oembed(v)
            if not r: bad.append((tid,v,'nicht gefunden')); continue
            ch=next((ALLOW[k] for k in sorted(ALLOW,key=len,reverse=True) if k in r[1].lower()),None)
            if not ch: bad.append((tid,v,'Kanal '+r[1])); continue
            out.setdefault(tid,[]).append({'yt':v,'title':clean(r[0],ch),'channel':ch})
json.dump(cache,io.open('oembed_cache.json','w',encoding='utf-8'),ensure_ascii=False)
json.dump(out,io.open('videos.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print('Themen',len(out),'Videos',sum(map(len,out.values())),'abgelehnt',bad)
