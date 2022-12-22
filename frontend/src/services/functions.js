const API_URL = process.env.REACT_APP_API_URL;

export async function getSightings() {
  const url = API_URL + "/sightings";
  var response;

  try {
    response = await fetch(url);

    response = await response.json();
  } catch (error) {
    console.error(error);
  }

  return response;
}
