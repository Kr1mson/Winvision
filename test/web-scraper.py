import requests
import json
from bs4 import BeautifulSoup
r = requests.get('https://www.formula1.com/en/teams')
soup=BeautifulSoup(r.content,'html.parser')
s = soup.find('div', class_='flex flex-col tablet:grid tablet:grid-cols-12 [&>*]:col-span-12 tablet:[&>*]:col-span-6 gap-xl laptop:[&>*]:col-span-6 desktop:[&>*]:col-span-6')
drivers=s.find_all('p')
teams=s.find_all('span')
for name in teams:
  print(name.text)
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
        'Drivers': [names[2*i], names[2*i + 1]],  # Pairing two drivers for each team
        'Team': constructors[i]
    }
    records.append(record)

# Convert the list of records to a JSON file
with open('team_records.json', 'w') as json_file:
    json.dump(records, json_file, indent=4)