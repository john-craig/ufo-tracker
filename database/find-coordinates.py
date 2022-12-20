from geopy.geocoders import Nominatim
import json
import time
geolocator = Nominatim(user_agent="UFO Tracker")

with open('raw_data.json', 'r') as openfile:
    sightings_list = json.load(openfile)['sightings']

    for i in range(0,len(sightings_list)):
        sighting_data = sightings_list[i]

        target = {
            'city': sighting_data['city'],
            'state':  sighting_data['state'],
            'country': sighting_data['country']
        }
        location = geolocator.geocode(target, limit=1)

        if location:
            sighting_data['latitude'] = location.latitude
            sighting_data['longitude'] = location.longitude

            sightings_list[i] = sighting_data
        
        if i % 10 == 0:
            time.sleep(30)
    
    json_object = json.dumps({'sightings': sightings_list}, indent=4)

    with open("processed_data.json", "w") as outfile:
        outfile.write(json_object)

