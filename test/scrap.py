import requests
import json
import urllib.request
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import os
import re
import seaborn as sns
import matplotlib.pyplot as plt
req = requests.get('https://www.formula1.com/en/drivers')
soup=BeautifulSoup(req.content,'html.parser')
s2 = soup.find('div', class_=re.compile(r'^flex flex-col tablet:grid tablet:grid-cols-12'))
info=s2.find_all('p')
imgs=s2.find_all('img')
pos=[info[i].text for i in range(0,126,6)]
points=[info[i].text for i in range(1,126,6)]
fname=[info[i].text for i in range(3,126,6)]
lname=[info[i].text for i in range(4,126,6)]
team=[info[i].text for i in range(5,126,6)]
flag_img=[imgs[i]['src'] for i in range(0,63,3)]
no_img=[imgs[i]['src'] for i in range(1,63,3)]
driver_img=[imgs[i]['src'] for i in range(2,63,3)]

path_driver='drivers/'
path_no='driver-no-photos/'
path_flag='flag-photos/'
def save_image(url, directory):
    path = urlparse(url).path.split('/')[-1]
    save_path = os.path.join(directory, path)
    os.makedirs(directory, exist_ok=True)
    urllib.request.urlretrieve(url,save_path)
for url in flag_img:
    save_image(url, path_flag)
for url in no_img:
    save_image(url, path_no)
for url in driver_img:
    save_image(url, path_driver)

res2=s2.find_all('div')
all_classes2 = []
for div in res2:
    class_names = div.get('class')
    if class_names: 
        all_classes2.extend(class_names)

hex_pattern = re.compile(r'^[0-9A-Fa-f]{6}$')
unique_classes2 = all_classes2
codes2=[]
for i in unique_classes2:
  if i.startswith('text'):
    codes2.append(i.split('-')[1])
hex_codes2 = ["#"+code for code in codes2 if hex_pattern.match(code)]

driver_records = []
for i in range(len(pos)):
    driver_record = {
        'Pos': pos[i],
        'Pts': points[i],
        'Fname': fname[i],
        'Lname': lname[i],
        'Team': team[i],
        'Flag-img':[urlparse(flag_img[i]).path.split('/')[-1]],
        'No-img':urlparse(no_img[i]).path.split('/')[-1],
        'Driver-img':urlparse(driver_img[i]).path.split('/')[-1],
        'Color-code':hex_codes[i]
    }
    driver_records.append(driver_record)


# Convert the list of records to a JSON file
with open('driver_records.json', 'w') as json_file:
    json.dump(driver_records, json_file, indent=4)

print("fin")
