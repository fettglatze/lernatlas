import os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
import re, json, io
from collections import Counter
src=io.open(os.path.join(ROOT,'data','catalog.js'),encoding='utf-8').read()
out=[]; subj=None
for line in src.splitlines():
    m=re.match(r"[ ]*[{] id: '([a-z]+)', sym:",line)
    if m: subj=m.group(1); continue
    m=re.match(r"[ ]*[[]'([a-z0-9-]+)', '([^']*)', '([^']*)', '([^']*)', '([^']*)'[]]",line)
    if m and subj: out.append({'id':subj+'--'+m.group(1),'subject':subj,'title':m.group(2),'grade':m.group(3),'kw':m.group(5)})
json.dump(out,io.open('topics.json','w',encoding='utf-8'),ensure_ascii=False,indent=0)
print(len(out), Counter(t['subject'] for t in out))
