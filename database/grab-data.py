import urllib3
import json
from bs4 import BeautifulSoup

base_url = "https://nuforc.org/webreports/"
target_url = "https://nuforc.org/webreports/ndxpost.html"
sightings_list = []

http = urllib3.PoolManager()
page = http.request("GET", target_url)
soup = BeautifulSoup(page.data, 'html.parser')

dates_table = soup.find('tbody').find_all('tr')

#for entry in dates_table:
for i in range(0, len(dates_table)):
    entry = dates_table[i]
    link = entry.find('a')
    next_url = link['href']

    # Only the first page for now
    if (i==0):
        next_page = http.request("GET", base_url + next_url)
        next_soup = BeautifulSoup(next_page.data, 'html.parser')

        sightings_table = next_soup.find('tbody').find_all('tr')

        for j in range(0, len(sightings_table)):
            sighting = sightings_table[j]
            sighting_data = {}

            cells = sighting.find_all('td')

            sighting_data['time'] = cells[0].text
            sighting_data['city'] = cells[1].text
            sighting_data['state'] = cells[2].text
            sighting_data['country'] = cells[3].text
            sighting_data['shape'] = cells[4].text
            sighting_data['duration'] = cells[5].text
            sighting_data['summary'] = cells[6].text

            sightings_list.append(sighting_data)

json_object = json.dumps({'sightings': sightings_list}, indent=4)

with open("raw_data.json", "w") as outfile:
    outfile.write(json_object)