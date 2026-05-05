import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, '.')

from services.reference_extractor import extract_all
count = extract_all()
print('Re-extracted %d references total' % count)
