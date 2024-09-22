import requests
import json

# Your Google Places API key
API_KEY = 'AIzaSyCGwQarDq46i9Vcr0kIO1-pR9jRoaQlZT8'

# Define the search parameters
search_query = 'bin stores in nebraska'
place_url = 'https://maps.googleapis.com/maps/api/place/textsearch/json'

# Define a function to get place details
def get_places(query, api_key, next_page_token=None):
    params = {
        'query': query,
        'key': api_key,
    }
    if next_page_token:
        params['pagetoken'] = next_page_token
    
    response = requests.get(place_url, params=params)
    return response.json()

# Initialize variables
results = []
next_page_token = None

# Loop through the API results
while True:
    # Fetch places
    data = get_places(search_query, API_KEY, next_page_token)
    
    # Add results to the list
    results.extend(data['results'])
    
    # Check if there is a next page token
    next_page_token = data.get('next_page_token', None)
    
    if not next_page_token:
        break  # No more pages

# Extract the relevant information
formatted_results = []
for place in results:
    place_details = {
        'name': place.get('name'),
        'address': place.get('formatted_address'),
        'phone': place.get('formatted_phone_number', 'N/A'),
        'email': place.get('user_ratings_total', 'N/A')  # Email is not typically available
    }
    formatted_results.append(place_details)

# Save the results to a JSON file
with open('nebraska.json', 'w') as f:
    json.dump(formatted_results, f, indent=4)

print('Data saved to kids_stores_texas.json')
