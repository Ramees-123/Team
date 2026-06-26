import os
import re

path = 'src/app/components/photo-gallery/photo-gallery.component.ts'
text = open(path, 'r', encoding='utf-8').read()

names = []
for block in text.split('photos: [')[1:]:
    block = block.split(']')[0]
    for item in block.split(','):
        item = item.strip()
        if (item.startswith('"') and item.endswith('"')) or (item.startswith("'") and item.endswith("'")):
            names.append(item[1:-1])

if 'heroPhotos = [' in text:
    block = text.split('heroPhotos = [', 1)[1].split(']')[0]
    for item in block.split(','):
        item = item.strip()
        if (item.startswith('"') and item.endswith('"')) or (item.startswith("'") and item.endswith("'")):
            names.append(item[1:-1])

files = set(os.listdir('src/assets/images'))
missing = sorted({n for n in names if n and n not in files})
print('MISSING', len(missing))
for n in missing:
    print(n)
