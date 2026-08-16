#!/usr/bin/env python3
"""Extract MCQs from markdown files and convert to JavaScript format"""
import re
import json
from pathlib import Path

root = Path('BSEB_Class12_English')
questions = []

# Find all markdown files
md_files = sorted(root.rglob('*.md'))

for md_file in md_files:
    if md_file.name == 'README.md':
        continue
    
    content = md_file.read_text(encoding='utf-8')
    
    # Find MCQ sections
    mcq_pattern = r'(\d+)\.\s+(.+?)\n\s+A\.\s+(.+?)\n\s+B\.\s+(.+?)\n\s+C\.\s+(.+?)\n\s+D\.\s+(.+?)\n\s+Answer:\s+([A-D])'
    
    matches = re.finditer(mcq_pattern, content, re.MULTILINE)
    
    for match in matches:
        q_num, q_text, opt_a, opt_b, opt_c, opt_d, answer = match.groups()
        
        answer_idx = ord(answer) - ord('A')  # Convert A->0, B->1, C->2, D->3
        
        question_obj = {
            'question': q_text.strip(),
            'options': [
                opt_a.strip(),
                opt_b.strip(),
                opt_c.strip(),
                opt_d.strip()
            ],
            'answer': answer_idx,
            'source': md_file.name
        }
        questions.append(question_obj)

# Create JavaScript file
js_code = f"""// Auto-generated MCQ questions from BSEB_Class12_English
// Generated from markdown study materials

const bsebQuestions = {json.dumps(questions, indent=2)};
"""

# Write to file
output_file = Path('bseb_questions.js')
output_file.write_text(js_code, encoding='utf-8')

print(f'Extracted {len(questions)} MCQs from {len(md_files)} files')
print(f'Wrote to: {output_file}')
