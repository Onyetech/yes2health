import os
import re

html_path = r'c:\Users\ikenna.okonkwo\OneDrive - Interswitch Limited\Desktop\JAMLOCK\Quantun product\index.html'
js_path = r'c:\Users\ikenna.okonkwo\OneDrive - Interswitch Limited\Desktop\JAMLOCK\Quantun product\js\main.js'

with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Replace the corrupted characters
html = re.sub(r'data-price="[^\x00-\x7F]+', 'data-price="&#8358;', html)
html = re.sub(r'>[^\x00-\x7F]+5,', '>&#8358;5,', html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

with open(js_path, 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

js = re.sub(r'return\s+\x27[^\x00-\x7F]+\x27', 'return \'\u20A6\'', js)

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js)
