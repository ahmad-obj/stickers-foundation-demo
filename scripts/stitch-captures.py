"""Join unmodified viewport screenshots at their actual browser scroll offsets."""
import json
import sys
from PIL import Image

data = json.load(open(sys.argv[1]))
page = Image.new('RGB', (data['width'], data['height']))
for shot in data['shots']:
    page.paste(Image.open(shot['path']).convert('RGB'), (0, round(shot['y'])))
page.save(data['output'])
