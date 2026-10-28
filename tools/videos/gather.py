import json, io, sys, time
from ytsearch import search
ALLOW={'mathe':['lehrerschmidt','daniel jung','mathematrick','simpleclub','musstewissen'],
 'deutsch':['musstewissen','lehrerschmidt','simpleclub','planet schule','duden'],
 'englisch':['mr v','simpleclub','lehrerschmidt','learnattack'],
 'physik':['musstewissen','simpleclub','lehrerschmidt','lesch','planet schule','learnattack'],
 'chemie':['musstewissen','simpleclub','planet schule','learnattack','lehrerschmidt'],
 'biologie':['simpleclub','planet schule','terra x','learnattack','lehrerschmidt'],
 'informatik':['simpleclub','morpheus','learnattack'],
 'geschichte':['mrwissen2go','terra x','simpleclub','planet schule','learnattack','bpb'],
 'politik':['mrwissen2go','bpb','simpleclub','learnattack','planet schule'],
 'erdkunde':['simpleclub','terra x','planet schule','learnattack'],
 'wirtschaft':['simpleclub','ard alpha','learnattack','mrwissen2go','bpb'],
 'franzoesisch':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'spanisch':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'latein':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'religion':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'ethik':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'kunst':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'musik':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'sport':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'ds':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'awt':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'technik':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'hauswirtschaft':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'paedagogik':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb'],
 'psychologie':['simpleclub','learnattack','planet schule','ard alpha','terra x','musstewissen','lehrerschmidt','mrwissen2go','bpb']}
HINT={'mathe':['Lehrerschmidt','Daniel Jung'],'deutsch':['musstewissen Deutsch','Lehrerschmidt'],'englisch':['simpleclub Englisch','Mr V Englisch'],'physik':['musstewissen Physik','simpleclub Physik'],'chemie':['musstewissen Chemie','simpleclub Chemie'],'biologie':['simpleclub Biologie','planet schule Biologie'],'informatik':['simpleclub Informatik','The Morpheus Tutorials'],'geschichte':['MrWissen2go Geschichte','simpleclub Geschichte'],'politik':['MrWissen2go','simpleclub Politik'],'erdkunde':['simpleclub Geographie','planet schule'],'wirtschaft':['simpleclub Wirtschaft','Duden Learnattack Wirtschaft'],'franzoesisch':['Französisch simpleclub', 'Französisch Duden Learnattack'],'spanisch':['Spanisch simpleclub', 'Spanisch Duden Learnattack'],'latein':['Latein simpleclub', 'Latein Duden Learnattack'],'religion':['simpleclub Religion', 'planet schule Religion'],'ethik':['simpleclub Philosophie', 'Ethik planet schule'],'kunst':['simpleclub Kunst', 'Kunst planet schule'],'musik':['simpleclub Musik', 'Musiktheorie Duden Learnattack'],'sport':['simpleclub Sport', 'Sport planet schule'],'ds':['Theater Schule planet schule', 'Darstellendes Spiel simpleclub'],'awt':['Berufsorientierung planet schule', 'simpleclub Wirtschaft'],'technik':['Technik planet schule', 'simpleclub Physik'],'hauswirtschaft':['Ernährung planet schule', 'simpleclub Biologie'],'paedagogik':['Pädagogik simpleclub', 'Erziehungswissenschaft Abitur'],'psychologie':['Psychologie simpleclub', 'Psychologie planet schule']}
subs=sys.argv[1].split(',')
topics=[t for t in json.load(io.open('topics.json',encoding='utf-8')) if t['subject'] in subs]
res={}
for t in topics:
    seen={}; 
    for h in HINT[t['subject']]:
        try: rs=search(t['title']+' '+h, 10)
        except Exception as e: rs=[]; print('ERR',t['id'],e)
        for vid,title,owner,length in rs:
            if vid in seen: continue
            if any(a in owner.lower() for a in ALLOW[t['subject']]):
                seen[vid]=(title,owner,length)
        time.sleep(0.4)
    res[t['id']]={'title':t['title'],'cands':[[k,*v] for k,v in seen.items()][:6]}
json.dump(res,io.open('cands_'+sys.argv[1].replace(',','_')+'.json','w',encoding='utf-8'),ensure_ascii=False,indent=0)
print(len(res), sum(1 for r in res.values() if not r['cands']),'ohne Kandidaten')
