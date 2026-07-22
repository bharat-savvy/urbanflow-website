import os
import glob
import re

files = glob.glob('*.html')

count = 0
for filepath in files:
    if filepath in ['services.html', 'course.html']:
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
    
    modified = False
    
    # Navbar
    nav_pattern = r'(<nav id="navbar-links"[^>]*>)\s*<a href="index.html" class="nav-link">Home</a>\s*<a href="about.html" class="nav-link">About</a>\s*<a href="apps.html" class="nav-link">Apps</a>\s*<a href="contact.html" class="nav-link">Contact</a>'
    nav_replacement = r'\1\n                <a href="index.html" class="nav-link">Home</a>\n                <a href="services.html" class="nav-link">Services</a>\n                <a href="apps.html" class="nav-link">Apps</a>\n                <a href="course.html" class="nav-link">Course</a>\n                <a href="about.html" class="nav-link">About</a>\n                <a href="contact.html" class="nav-link">Contact</a>'
    
    new_content = re.sub(nav_pattern, nav_replacement, content)
    if new_content != content:
        content = new_content
        modified = True

    # Footer
    footer_pattern = r'(<div class="footer-links">)\s*<a href="about.html">About</a>\s*<a href="apps.html">Apps</a>\s*<a href="contact.html">Contact</a>'
    footer_replacement = r'\1\n                        <a href="about.html">About</a>\n                        <a href="services.html">Services</a>\n                        <a href="apps.html">Apps</a>\n                        <a href="course.html">Course</a>\n                        <a href="contact.html">Contact</a>'
    
    new_content = re.sub(footer_pattern, footer_replacement, content)
    if new_content != content:
        content = new_content
        modified = True
        
    if modified:
        with open(filepath, 'w') as f:
            f.write(content)
        count += 1
        print(f"Updated {filepath}")

print(f"Total files updated: {count}")
