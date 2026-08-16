from pathlib import Path
import re

mapping = {
    'Dashboard': 'dashboard.html',
    'Study Planner': 'study-planner.html',
    'Performance': 'performance.html',
    'Exam Center': 'exam-center.html',
    'Focus': 'focus.html',
    'Career Corner': 'career-corner.html',
}
files = ['dashboard.html', 'study-planner.html', 'performance.html', 'focus.html', 'career-corner.html']
pattern = re.compile(r'<a([^>]*?)href="#"([^>]*?>)(.*?</a>)', re.S)
for fn in files:
    path = Path(fn)
    text = path.read_text(encoding='utf-8')
    def replace(match):
        block = match.group(0)
        for label, href in mapping.items():
            if label in block:
                return block.replace('href="#"', f'href="{href}"')
        return block
    new_text = pattern.sub(replace, text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        print('Updated', fn)
    else:
        print('No changes for', fn)
