import os
import re

with open('components/header.html', 'r', encoding='utf-8') as f:
    HEADER_TEMPLATE = f.read().strip()
    
with open('components/footer.html', 'r', encoding='utf-8') as f:
    FOOTER_TEMPLATE = f.read().strip()

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
header_pattern = re.compile(r'<!-- ============ NAVBAR ============ -->.*?</header>', re.DOTALL)
footer_pattern = re.compile(r'<!-- ============ FOOTER ============ -->.*?</footer>', re.DOTALL)

for file in html_files:
    if file.startswith('demo-'): continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    
    if '<!-- ============ NAVBAR ============ -->' in content:
        content = header_pattern.sub(HEADER_TEMPLATE, content)
        changed = True
        
    if '<!-- ============ FOOTER ============ -->' in content:
        content = footer_pattern.sub(FOOTER_TEMPLATE, content)
        changed = True
        
    if changed:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Synced components for {file}")

print("Sync complete!")
