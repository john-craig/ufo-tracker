from flask import Flask
from flask_cors import CORS
import json

from utilities.utils import sightings_to_locations, assign_location_weights

app = Flask(__name__)
CORS(app)

# @app.route('/')
# def home():
#     return render_template('pages/placeholder.home.html')

@app.route('/sightings')
def get_sightings():
    sightings = []

    with open('./data/sightings.json', 'r') as openfile:
        sightings = json.load(openfile)['sightings']
        locations = sightings_to_locations(sightings)
        locations = assign_location_weights(locations)

    return locations

# Default port:
if __name__ == '__main__':
    app.run()

# Or specify port manually:
'''
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
'''