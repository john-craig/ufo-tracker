

# Accepts a list of sightings and consolidates it
# into a list of specific locations where sightings
# occurred
def sightings_to_locations(all_sightings):
    locations_dict = {}

    for sighting in all_sightings:
        # May need to make this a compound key
        # with the state and country later
        sighting_key = sighting['city']

        if ('latitude' not in sighting and 'longitude' not in sighting) or sighting_key == "":
            continue

        if sighting_key in locations_dict:
            # If this sighting location is
            # already in the dictionary, increment
            # and update the contents of that item
            location = locations_dict[sighting_key]

            location['sightings_count'] = location['sightings_count'] + 1
            location['sightings_list'].append(sighting)
        else:
            # When this is the first occurrence
            # of a sighting location in the dictionary,
            # create the initial object
            locations_dict[sighting_key] = {
                'sighting_city': sighting['city'],
                'sightings_count' : 1,
                'sightings_list' : [ sighting ],
            }

            # Will need to remove this if we eventually
            # reorganize this method and use it in
            # the database processing
            if 'latitude' in sighting and 'longitude' in sighting:
                locations_dict[sighting_key]['location_coordinates'] = {
                    'latitude': sighting['latitude'],
                    'longitude': sighting['longitude']
                }
                

    
    # Finally convert this dictionary into an array
    locations_array = list(locations_dict.values())
    return locations_array


def assign_location_weights(locations):
    highest = get_highest_count(locations)

    for loc in locations:
        loc['weight'] = loc['sightings_count'] / highest
    
    return locations


def get_highest_count(locations):
    highest = 0

    for loc in locations:
        if loc['sightings_count'] > highest:
            highest = loc['sightings_count']
    
    return highest