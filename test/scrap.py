import requests
import json
import urllib.request
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import os
r = requests.get('https://www.formula1.com/en/teams')
soup=BeautifulSoup(r.content,'html.parser')
s = soup.find('div', class_='flex relative items-center border-l-normal pl-xs border-current')
color=s.find_all('class=""')