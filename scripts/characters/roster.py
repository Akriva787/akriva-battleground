# Writes characters-index.js (names, roles, swatches, meta) from the baker's index.json.
import json,sys,re
out,index=sys.argv[1],json.load(open(sys.argv[2]))
NAMES=[('casual3','Weekend','Civilian'),('casual2','Streetwear','Civilian'),('casual','Casual','Civilian'),('chef-hat','Head Chef','Professional'),('chef','Chef','Professional'),
 ('doctor-female-old','Senior Doctor','Professional'),('doctor-male-old','Senior Doctor','Professional'),('doctor','Doctor','Professional'),('oldclassy','Classic','Civilian'),
 ('suit','Executive','Professional'),('worker','Worker','Professional'),('kimono','Kimono','Traditional'),('cowboy-hair','Ranch Hand','Traditional'),('cowboy','Rancher','Traditional'),
 ('ninja-male-hair','Shadow Ninja','Warrior'),('ninja-sand','Desert Ninja','Warrior'),('ninja','Ninja','Warrior'),('knight-golden','Golden Knight','Warrior'),('knight','Knight','Warrior'),
 ('vikinghelmet','Viking Chief','Warrior'),('viking','Viking','Warrior'),('pirate','Pirate','Warrior'),('elf','Elf Ranger','Fantasy'),('goblin','Goblin','Fantasy'),('witch','Witch','Fantasy'),
 ('wizard','Wizard','Fantasy'),('zombie','Zombie','Undead')]
ORDER=['Civilian','Professional','Traditional','Warrior','Fantasy','Undead']
roster=[]
for id,meta in index.items():
    name,group=next((n,c) for p,n,c in NAMES if id.startswith(p))
    sex=' (F)' if 'female' in id or id=='witch' else ' (M)' if 'male' in id or id in('wizard','elf','vikinghelmet','chef-hat','cowboy-hair') else ''
    # Swatch: clothing colours, skipping skin (first entry is the tone), the face plate and the dark features.
    pal=[c for c in meta['palette'][:-1] if c.lower() not in('#fffff8',)]
    sw=(pal[1:]+pal)[:3]
    roster.append({'id':id,'name':name+sex,'role':group,'swatch':sw,'meta':meta})
roster.sort(key=lambda r:(ORDER.index(r['role']),r['name']))
open(out,'w').write('// Operator roster: Quaternius "Ultimate Animated Character Pack" (CC0), baked by scripts/characters/bake.mjs.\n// Each model\'s frames load on demand from characters/<id>.bin.\nconst AKRIVA_ROSTER='+json.dumps(roster,separators=(',',':'))+';\n')
print(len(roster),[r['id']+':'+r['name'] for r in roster][:8])
