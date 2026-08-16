from pathlib import Path
import re
import textwrap
files = ['dashboard.html', 'study-planner.html', 'performance.html', 'focus.html', 'career-corner.html']
for fn in files:
    path = Path(fn)
    text = path.read_text(encoding='utf-8')
    matches = list(re.finditer(r'<a[^>]*href="#"[^>]*>.*?</a>', text, re.S))
    print(f'--- {fn} --- {len(matches)} matches')
    for m in matches:
        s = m.group(0).replace('\n', ' ')
        print(s)
    print()
