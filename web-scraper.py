import requests
import json
import urllib.request
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import os
r = requests.get('https://www.formula1.com/en/teams')
soup=BeautifulSoup(r.content,'html.parser')
s = soup.find('div', class_='flex flex-col tablet:grid tablet:grid-cols-12 [&>*]:col-span-12 tablet:[&>*]:col-span-6 gap-xl laptop:[&>*]:col-span-6 desktop:[&>*]:col-span-6')
drivers=s.find_all('p')
teams=s.find_all('span')
imgs=s.find_all('img')
path_team='team-logos/'
path_drivers='drivers/'
path_cars='cars/'

img_indices=sorted(set(range(1,40,4)) | set(range(2,40,4)))
team_imgs=[imgs[i]['src'] for i in range(0,40,4)]
car_imgs=[imgs[i]['src'] for i in range(3,40,4)]
driver_imgs=[imgs[i]['src'] for i in img_indices]
def save_image(url, directory):
    path = urlparse(url).path.split('/')[-1]
    save_path = os.path.join(directory, path)
    urllib.request.urlretrieve(url, save_path)
for url in team_imgs:
    save_image(url, path_team)
for url in driver_imgs:
    save_image(url, path_drivers)
for url in car_imgs:
    save_image(url, path_cars)

#[urlparse(driver_imgs[2*i]).path.split('/')[-1],urlparse(driver_imgs[2*i+1]).path.split('/')[-1]]
rank=[drivers[i].text for i in range(0,70,7)]
pts=[drivers[i].text for i in range(1,70,7)]
indices = sorted(set(range(3, 70, 7)) | set(range(5, 70, 7)))
names = [drivers[i].text + ' ' + drivers[i+1].text for i in indices]
constructors=[teams[i].text for i in range(10)]

records = []
for i in range(len(constructors)):
    record = {
        'Pos': rank[i],
        'Pts': pts[i],
        'Drivers': [names[2*i], names[2*i + 1]],
        'Team': constructors[i],
        'Driver-img':[urlparse(driver_imgs[2*i]).path.split('/')[-1],urlparse(driver_imgs[2*i+1]).path.split('/')[-1]],
        'Team-img':urlparse(team_imgs[i]).path.split('/')[-1],
        'Car-img':urlparse(car_imgs[i]).path.split('/')[-1]
    }
    records.append(record)

# Convert the list of records to a JSON file
with open('team_records.json', 'w') as json_file:
    json.dump(records, json_file, indent=4)
print("fin")
