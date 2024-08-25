import requests
import json
import urllib.request
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import os
import re
import seaborn as sns
import matplotlib.pyplot as plt
r = requests.get('https://www.formula1.com/en/teams')
soup=BeautifulSoup(r.content,'html.parser')
s = soup.find('div', class_='flex flex-col tablet:grid tablet:grid-cols-12 [&>*]:col-span-12 tablet:[&>*]:col-span-6 gap-xl laptop:[&>*]:col-span-6 desktop:[&>*]:col-span-6')
res=s.find_all('div')
all_classes = []
for div in res:
    class_names = div.get('class')
    if class_names: 
        all_classes.extend(class_names)

hex_pattern = re.compile(r'^[0-9A-Fa-f]{6}$')
unique_classes = all_classes
codes=[]
for i in unique_classes:
  if i.startswith('text'):
    codes.append(i.split('-')[1])
hex_codes = [code for code in codes if hex_pattern.match(code)]
for i in hex_codes:
  print('#'+i)

hex_codes = [f'#{code}' for code in hex_codes]
palette = sns.color_palette(hex_codes)
sns.palplot(palette)
plt.title('Hex Color Codes', fontsize=15)
plt.show()