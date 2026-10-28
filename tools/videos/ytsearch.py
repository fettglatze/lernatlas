import urllib.request, urllib.parse, json, re, sys
def search(q, n=8):
    url='https://www.youtube.com/results?hl=de&gl=DE&search_query='+urllib.parse.quote(q)
    req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0','Accept-Language':'de-DE'})
    html=urllib.request.urlopen(req,timeout=15).read().decode('utf-8','replace')
    m=re.search(r'var ytInitialData = (\{.*?\});</script>',html)
    data=json.loads(m.group(1)); out=[]
    def walk(o):
        if isinstance(o,dict):
            if 'videoRenderer' in o:
                v=o['videoRenderer']
                try:
                    out.append((v['videoId'],v['title']['runs'][0]['text'],v['ownerText']['runs'][0]['text'],v.get('lengthText',{}).get('simpleText','')))
                except Exception: pass
            for x in o.values(): walk(x)
        elif isinstance(o,list):
            for x in o: walk(x)
    walk(data); return out[:n]
if __name__=='__main__':
    for q in sys.argv[1:]:
        print('##',q)
        for r in search(q): print(' | '.join(r))
